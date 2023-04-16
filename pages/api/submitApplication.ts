import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

type Data = {
  id: any;
}

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


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { application }: { application: SubmitApplication } = req.body;

  const x = await supabase
    .from("residents")
    .upsert({
      zupass_id: application.uuid,
      gender: application.gender,
      email: application.email,
      name: application.name,
      prefer_same_gender: application.prefer_same_gender,
      morning_person: application.morning_person,
      introvert: application.introvert,
      communities: application.communities
    },
    { onConflict: "email"} ).select();

    console.log(x);

    const id = x.data[0].id;

  console.log(await supabase
    .from("applications")
    .insert({
      resident_id: id,
      weeks: application.weeks,
    }));

/*  console.log(await supabase
    .from("applications")
    .insert( {"approved": approval})
    .eq("id", id));*/

  res.status(200).json({ id: "foo" })
}
