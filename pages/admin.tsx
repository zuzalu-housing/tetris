import Head from "next/head";
import { Heading } from "../components/Typography";
import Layout from "../components/layout/Layout";
import { supabase } from "../utils/supabase";
import tw from "tailwind-styled-components";
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import axios from "axios";

import { PrimaryButton, SecondaryButton } from "../components/Button";


interface Application {

}

interface Props {
  applications: any[]
}

const TH = tw.th`text-left`

function booleanPref(value: boolean) {
  switch (value) {
    case true: return "True";
    case false: return "False";
    default: return "Unspecified";
  }
}

function InfoDialog({ application, onClose, isOpen }: { application: any, onClose: any, isOpen: boolean}) {
  return (
    <Dialog
      open={isOpen ?? false}
      onClose={onClose ?? (() => {})}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-2xl rounded p-6 shadow-xl align-middle text-left bg-white">
          <Dialog.Title className="text-3xl font-semibold" as="h3">Application Details</Dialog.Title>
          <div className="mt-8">
            {application &&
              <div className="flex flex-col gap-3">
                <div className="flex">
                  <div className="w-48 font-semibold">Name</div>
                  <div>{application.name}</div>
                </div>

                <div className="flex">
                  <div className="w-48 font-semibold">Email</div>
                  <div>{application.email}</div>
                </div>

                <div className="flex">
                  <div className="w-48 font-semibold">Gender</div>
                  <div>{application.gender}</div>
                </div>

                <div className="flex">
                  <div className="w-48 font-semibold">Same-gender accommodation</div>
                  <div>{booleanPref(application.prefer_same_gender)}</div>
                </div>

                <div className="flex">
                  <div className="w-48 font-semibold">Prefers early-rising</div>
                  <div>{booleanPref(application.morning_person)}</div>
                </div>

                <div className="flex">
                  <div className="w-48 font-semibold">Prefers introvert</div>
                  <div>{booleanPref(application.introvert)}</div>
                </div>

                <div className="flex">
                  <div className="w-48 font-semibold">Communities</div>
                  <div>
                    {application.communities && application.communities.map((community: string) => {
                      return <div className="capitalize">{community}</div>
                    })}
                  </div>
                </div>

                <div className="flex">
                  <div className="w-48 font-semibold">Weeks attending</div>
                  <div>
                    {application.weeks.sort().map((num: number) => { return num+1 }).join(", ")}
                  </div>
                </div>
              </div>}
          </div>
          {/* ... */}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

function Row({ application }: { application: any}) {
  const [moreInfo, setMoreInfo] = useState(false);

  const approve = async () => {
    console.log("approving")
    await axios.post("/api/setApproval", { id: application.id, approval: true }).then(() => {
      window.location.reload();
    });
  };

  return (
    <>

      <tr>
        <td>{application.name}</td>
        <td>{application.email}</td>
        <td>{application.gender}</td>
        <td className="flex gap-2 text-sm items-center">
          <PrimaryButton onClick={approve}>Approve</PrimaryButton>
          <PrimaryButton>Decline</PrimaryButton>
          <InfoDialog application={application} onClose={() => { setMoreInfo(false) }} isOpen={moreInfo} />
          <div className="px-4 text-base font-semibold cursor-pointer text-zulalu-primary" onClick={() => { setMoreInfo(true) }}>More info</div>
        </td>
      </tr>
    </>); 
}

export default function Page({ applications }: Props) {
return (
  <Layout>
    <Head>
      <title>Administer Applications</title>
    </Head>
    <Heading>Pending Applications</Heading>
    <table className="table-auto w-full text-lg mt-6 border-spacing-2 border-separate">
      <thead>
        <tr className="">
        <TH>Name</TH><TH>Email</TH><TH>Gender</TH><TH>Actions</TH>
        </tr>
      </thead>
      <tbody>
        {applications && applications.map(application => {
          return (
            <Row key={application.id} application={application} />
       );
    })}
      </tbody>
    </table>

  </Layout>
);
}

async function fetchApplications() {
  try {
    const { data, error } = await supabase
      .from("applications_view")
      .select("*")
      .is("approved", null);

    if (error) throw error;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      applications: await fetchApplications()
    }
  }
}