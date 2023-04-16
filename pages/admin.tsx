import Head from "next/head";
import { Heading } from "../components/Typography";
import Layout from "../components/layout/Layout";
import { supabase } from "../utils/supabase";
import tw from "tailwind-styled-components";

interface Application {

}

interface Props {
  applications: any[]
}

const TH = tw.th`text-left`

export default function Page({ applications }: Props) {
return (
  <Layout>
    <Head>
      <title>Administer Applications</title>
    </Head>
    <Heading>Pending Applications</Heading>
    <table className="table-auto w-full">
      <thead>
        <tr>
        <TH>Name</TH><TH>Email</TH><TH>Gender</TH><TH>Actions</TH>
        </tr>
      </thead>
      <tbody>
      {applications && applications.map(application => {
      return (
        <tr>
          <td>{application.name}</td>
          <td>{application.email}</td>
          <td>{application.gender}</td>
          <td>Approve Decline</td>
        </tr>);
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
      .eq("approved", false);

    if (error) throw error;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      applications: await fetchApplications()
    }
  }
}