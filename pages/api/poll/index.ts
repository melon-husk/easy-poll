// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Poll from "../../../models/Poll";
import dbConnect from "../../../util/mongodb";

type Data = {
  success: boolean;
  data?: any;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  await dbConnect();
  console.log(req.body, req.query);

  switch (method) {
    case "GET":
      try {
        const poll = await Poll.findOne({ id: req.query.id });
        res.status(200).json({ success: true, data: poll });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case "POST":
      try {
        const poll = await Poll.create(req.body);
        res.status(201).json({ success: true, data: poll });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Method not allowed" });
      break;
  }
}
