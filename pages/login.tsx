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


/*        {signatureProof != null && (
          <>
            <h3>Got Semaphore Signature Proof from Passport</h3>
            <p>{`Message signed: ${signatureProof.claim.signedMessage}`}</p>
            {signatureProofValid === undefined && <p>❓ Proof verifying</p>}
            {signatureProofValid === false && <p>❌ Proof is invalid</p>}
            {signatureProofValid === true && <p>✅ Proof is valid</p>}
            <pre>
              {JSON.stringify(signatureProof, null, 2)}</pre>
          </>
        )}
        {participant && (
          <>
            {participant.commitment ===
            signatureProof?.claim.identityCommitment ? (
              <p>✅ Commitment matches</p>
            ) : (
              <p>❌ Commitment does not match</p>
            )}
            <pre>{JSON.stringify(participant, null, 2)}</pre>
          </>
        )}*/

export default function Page({ details }) {
  const [pcdStr, _passportPendingPCDStr] = usePassportPopupMessages();
  const { signatureProof, signatureProofValid } =
    useSemaphoreSignatureProof(pcdStr);

  // Extract UUID, the signed message of the returned PCD
  const [uuid, setUuid] = useState<string | undefined>();
  useEffect(() => {
    if (signatureProofValid && signatureProof) {
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

  return (
    <Layout>
      <Heading>Log in</Heading>
      <div>
        <p className="my-4">
          To log in, you will need a Zuzalu passport. If you don't have one, head over to <a href="https://zupass.org">ZuPass.org</a> to sign up.
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

        {participant &&
        <div>
          <p className="my-4">Welcome to Zuzalu, <strong className="font-bold">{participant.name}</strong></p>
          <p><Link className="font-medium text-blue-600" href="/events">View upcoming events</Link></p>
        </div>}
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  
  return {
    props: {
    }
  }
}