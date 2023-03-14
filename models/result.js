import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
  correct: {
    type: Number
    },
  incorrect: {
    type: Number
    },
  attempted: {
    type: Number
    },
  status: {
    type: String
    }
});

export default mongoose.model("Results", ResultSchema);
