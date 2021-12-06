import mongoose from "mongoose";

export const OptionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  votes: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Option || mongoose.model("Option", OptionSchema);
