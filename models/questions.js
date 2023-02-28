import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  optionA: {
    type: String,
    required: true
  },
  optionB: {
    type: String,
    required: true
  },
  optionC: {
    type: String,
    required: true
  },
  optionD: {
    type: String,
    required: true
  },
  correct: {
    type: String,
    required: true
  },
  hint: {
    type: String,
    required: true
  },
  img: String,
});

export default mongoose.model("Questions", QuestionSchema);
