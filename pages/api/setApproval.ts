import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

type Data = {
  approval: boolean;
  id: any;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { approval, id } = req.body;
  console.log(req.body);
  console.log(await supabase
    .from("applications")
    .update( {"approved": approval})
    .eq("id", id));

  res.status(200).json({ id, approval })
}
