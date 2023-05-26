import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";
import mongoosePaginate from "mongoose-paginate";

const TestSchema = new mongoose.Schema({ 
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
  testImg: {
    type: String,
    required: true
    }, 
  questions: [{
    questionImg: {
      type: String
    },
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
    }
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Logs" 
  },
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Results"
    }
  ]
});

TestSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
      await Log.deleteMany({_id: {$in: doc.logs}});
      await Result.deleteMany({_id: {$in: doc.results}});
  }
})

TestSchema.plugin(mongoosePaginate);

export default mongoose.model("Test", TestSchema);
