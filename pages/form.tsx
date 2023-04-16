import {
  openSignedZuzaluUUIDPopup,
  useFetchParticipant,
  usePassportPopupMessages,
  useSemaphoreSignatureProof,
} from "@pcd/passport-interface";
import { PASSPORT_SERVER_URL, PASSPORT_URL } from "../utils/constants"; 
import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { Heading } from "../components/Typography";
import { PrimaryButton } from "../components/Button";
import Cookies from "js-cookie";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import build from "next/dist/build";

interface SubmitApplication {
  weeks: number[],
  prefer_same_gender: boolean,
  morning_person: boolean,
  introvert: boolean,
  communities: string[],
  uuid: string,
  gender: string,
  email: string,
  name: string,
}


export default function Page() {
  const [pcdStr, _passportPendingPCDStr] = usePassportPopupMessages();
  const { signatureProof, signatureProofValid } =
    useSemaphoreSignatureProof(pcdStr);

  // Extract UUID, the signed message of the returned PCD
  const [uuid, setUuid] = useState<string | undefined>();
  useEffect(() => {
    if (Cookies.get("uuid")) {
      setUuid(Cookies.get("uuid"));
    }
    else if (signatureProofValid && signatureProof) {
      const userUuid = signatureProof.claim.signedMessage;
      setUuid(userUuid);
    }
  }, [signatureProofValid, signatureProof]);

  // Finally, once we have the UUID, fetch the participant data from Passport.
  const { participant } = useFetchParticipant(PASSPORT_SERVER_URL, uuid);

  useEffect(() => {
    if (signatureProofValid && signatureProof && participant) {
      Cookies.set("uuid", participant.uuid);
    }
  })

  const [submitted, setSubmitted] = useState(false);

  const [application, setApplication] = useState({
    weeks: new Set(),
    same_gender: false,
    introvert: false,
    early_riser: false,
    zk: false,
    longevity: false,
    public_goods: false,
    gender: undefined
  });

  const weeks = Array.from(Array(8).keys());

  const buildCommunities = () => {
    const communities = [];

    if (application.zk) {
      communities.push("ZK");
    }

    if (application.longevity) {
      communities.push("longevity");
    }

    if (application.public_goods) {
      communities.push("public_goods");
    }

    return communities;
  }

  const submitApplication = async () => {
    const app: SubmitApplication = {
      prefer_same_gender: application.same_gender,
      introvert: application.introvert,
      morning_person: application.early_riser,
      weeks: Array.from(application.weeks.values()) as number[],
      communities: buildCommunities(),
      name: participant?.name ?? "",
      email: participant?.email ?? "",
      uuid: participant?.uuid ?? "",
      gender: application.gender ?? ""
    };
    await axios.post("/api/submitApplication", { application: app }).then(() => {
      setSubmitted(true);
    });
  }

  return (
    <Layout>
      <Head>
        <title>Apply to Attend</title>
      </Head>
      <Heading>Apply to Attend</Heading>
      {!participant &&
      <div>
        <p className="my-4 text-xl">
          To apply for Zuzalu, you will need a Zuzalu passport. If you don't have one, head over to <a className="text-zulalu-primary" href="https://zupass.org">ZuPass.org</a> to sign up.
        </p>
        <PrimaryButton
          disabled={signatureProofValid}
          onClick={() =>
            openSignedZuzaluUUIDPopup(
              PASSPORT_URL,
              window.location.origin + "/popup",
              "housing-tetris"
            )
          }
        >
          Sign in with my Zuzalu Passport
        </PrimaryButton>
        </div>
      }
      {participant &&
        <div className="text-lg">
          <p className="my-4">Welcome to Zuzalu, <strong className="font-bold">{participant.name}</strong></p>
          {!submitted &&
          <div>
            <div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">When would you like to attend?</div>
                {weeks.map((week: number) => {
                  const weekNum = week + 1;
                  return (
                    <div>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input type="checkbox"
                            onChange={() => { if (application.weeks.has(week)) {
                              const a = { ...application };
                              application.weeks.delete(week);
                              a.weeks = application.weeks;
                              setApplication(a);
                            } else {
                              const a = { ...application };
                              application.weeks.add(week);
                              a.weeks = application.weeks;
                              setApplication(a);
                  
                            }
                          }}
                        className="                        rounded
                            border-gray-300
                            text-indigo-600
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-offset-0
                            focus:ring-indigo-200
                            focus:ring-opacity-50" checked={application.weeks.has(week)} />
                        <span>Week {weekNum}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="my-4 font-semibold">Other preferences</div>
              <div>
                <label className="inline-flex items-center">
                <span className="mr-2">Gender</span>
                  <select defaultValue={"-"} value={application.gender} onChange={(e) => {
                    const a = { ...application };
                    a.gender = e.target.value;
                    setApplication(a);
                  }}>
                    <option value="-">Unspecified</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
         
        
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input 
                           onChange={() => {
                            const a = { ...application };
                            a.same_gender = !application.same_gender;
                            setApplication(a);
                          }}
                  type="checkbox" className="
                            rounded
                            border-gray-300
                            text-indigo-600
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-offset-0
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                          " checked={application.same_gender} />
                  <span className="ml-2">Prefer to share with same gender</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input 
                           onChange={() => {
                            const a = { ...application };
                            a.introvert = !application.introvert;
                            setApplication(a);
                          }}
                  type="checkbox" className="
                            rounded
                            border-gray-300
                            text-indigo-600
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-offset-0
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                          " checked={application.introvert} />
                  <span className="ml-2">Prefer to share with introvert</span>
                </label>
              </div>

              <div>
                <label className="inline-flex items-center">
                  <input
                    onChange={() => {
                      const a = { ...application };
                      a.early_riser = !application.early_riser;
                      setApplication(a);
                    }}
                  type="checkbox" className="
                            rounded
                            border-gray-300
                            text-indigo-600
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-offset-0
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                          " checked={application.early_riser} />
                  <span className="ml-2">Prefer to share with early riser</span>
                </label>
              </div>

              <div className="my-4 font-semibold">Communities</div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    onChange={() => {
                      const a = { ...application };
                      a.public_goods = !application.public_goods;
                      setApplication(a);
                    }}
                  type="checkbox" className="
                            rounded
                            border-gray-300
                            text-indigo-600
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-offset-0
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                          " checked={application.public_goods} />
                  <span className="ml-2">Public goods</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    onChange={() => {
                      const a = { ...application };
                      a.zk = !application.zk;
                      setApplication(a);
                    }}
                  type="checkbox" className="
                            rounded
                            border-gray-300
                            text-indigo-600
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-offset-0
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                          " checked={application.zk} />
                  <span className="ml-2">ZK</span>
                </label>
              </div>
              <div>
                <label className="inline-flex items-center">
                  <input
                    onChange={() => {
                      const a = { ...application };
                      a.longevity = !application.longevity;
                      setApplication(a);
                    }}
                  type="checkbox" className="
                            rounded
                            border-gray-300
                            text-indigo-600
                            shadow-sm
                            focus:border-indigo-300
                            focus:ring
                            focus:ring-offset-0
                            focus:ring-indigo-200
                            focus:ring-opacity-50
                          " checked={application.longevity} />
                  <span className="ml-2">Longevity</span>
                </label>
              </div>

                <div className="my-4">
              <PrimaryButton onClick={submitApplication}>Submit Application</PrimaryButton>
              </div>
            </div>
          </div>}

          {submitted &&
          <div className="text-lg flex flex-col gap-4">
            <p>Application submitted!</p>
            <p>Please wait for an email to {participant.email} with further instructions.</p>
          </div>
          }
        </div>}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  
  return {
    props: {
    }
  }
}