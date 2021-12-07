import mongoose from "mongoose";
import { OptionSchema } from "./Option";
const PollSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [OptionSchema],
    required: true,
  },
  total_votes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Poll || mongoose.model("Poll", PollSchema);
