import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
  quizName: {
    type: String,
    required: true
    },
  country: {
    type: String,
    required: true
    },
  stateName: {
    type: String,
    required: true
    }, 
  questions: [{
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
  }], 
  category: {
    type: String,
    required: true
    },
  quizDetail: {
    type: String,
    required: true
    }
});

export default mongoose.model("Questions", QuestionSchema);
