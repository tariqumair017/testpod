import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  question: String,
  optionA: String,
  optionB: String,
  optionC: String,
  optionD: String,
  correct: String,
  hint: String,
  img: String,
});

export default mongoose.model("Questions", QuestionSchema);
