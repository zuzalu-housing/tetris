import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import Layout from '../../components/layout/Layout';
import { Heading } from '../../components/Typography';
import tw from "tailwind-styled-components";
import Head from "next/head";

interface Event {
  name: string;
}

interface Props {
  event: Event;
}


const Event = ({ event }: Props) => {
  const router = useRouter();

  const loading = false;
  const { id } = router.query;

  if (loading) {
    return <div>Fetching Event...</div>;
  }

  return (
  <Layout>
    <div className="mb-8">
      <Heading>Register for <strong className="font-bold">{ event.name }</strong></Heading>
    </div>
    <div className="">
     {/* <form>
      <label className="block">
                <span className="text-gray-700">Email address</span>
                <input type="email" className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  " placeholder="john@example.com" />
              </label>
  </form>*/}
    </div>
  </Layout>);
}

const fetchEvent = async (id) => {
  // const user = supabase.auth.user();
   try {
     console.log(`fetching event ${id}`)
     const { data, error } = await supabase
       .from("events")
       .select("*")
       .eq("id", id);

     if (error) throw error;
     console.log(data);
     return data[0];
   } catch (error) {
     console.log(error);
     return null;
   }
 };

export async function getServerSideProps(context) {
  const { id } = context.query;

  const event = await fetchEvent(id);

  return {
    props: {
      event
    }, 
  }
}


export default Event