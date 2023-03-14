import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";

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
  stateImg: {
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
    },
    questionImg: String
  }], 
  category: {
    type: String,
    required: true
    },
  quizDetail: {
    type: String,
    required: true
    },
  logs: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Log"
    }
  },
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Result"
    }
  ]
});

QuestionSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
      await Log.deleteMany({_id: {$in: doc.logs}});
      await Result.deleteMany({_id: {$in: doc.results}});
  }
})

export default mongoose.model("Questions", QuestionSchema);
