// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { withSentry } from "@sentry/nextjs";
import type { NextApiRequest, NextApiResponse } from "next";
import Poll from "../../../models/Poll";
import dbConnect from "../../../util/mongodb";

type Data = {
  success: boolean;
  data?: any;
  error?: any;
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method } = req;

  await dbConnect();
  // a function to send statusCode 500 50% of the time
  if (Math.random() > 0.5) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
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
    case "PATCH":
      try {
        // Takes in id of the option and increments it by 1
        const poll = await Poll.updateOne(
          { "options.id": req.query.id },
          {
            $inc: { "options.$.votes": 1, total_votes: 1 },
          }
        );

        res.status(200).json({ success: true, data: poll });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(400).json({ success: false, error: "Method not allowed" });
      break;
  }
};
export default withSentry(handler);
