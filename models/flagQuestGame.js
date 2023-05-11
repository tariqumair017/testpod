import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";

const flagQuestGameSchema = new mongoose.Schema({
  region: {
    type: String,
    required: true
    }, 
  level: {
        type: Number,
        required: true
      }, 
  questions: [{
    country: {
      type: String,
      required: true
      }, 
    Icountry: {
      type: String,
      required: true
      },
    correctImg: {
      type: String,
      required: true
    },
    IcorrectImg1: {
      type: String,
      required: true
    },
    IcorrectImg2: {
        type: String,
        required: true
    },
    IcorrectImg3: {
        type: String,
        required: true
    },
    hint: {
      type: String,
      required: true
    }
  }],
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

flagQuestGameSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
    await Log.deleteMany({_id: {$in: doc.logs}});
    await Result.deleteMany({_id: {$in: doc.results}});
  }
})

export default mongoose.model("Flag-Quest-Game", flagQuestGameSchema);
