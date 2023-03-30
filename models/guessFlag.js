import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";

const guessFlagGameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true
    }, 
  level: {
        type: String,
        required: true
      },
  gameDetail: {
    type: String,
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
    IcorrectImg: {
      type: String,
      required: true
    },
    questionDetail: {
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

guessFlagGameSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
    await Log.deleteMany({_id: {$in: doc.logs}});
    await Result.deleteMany({_id: {$in: doc.results}});
  }
})

export default mongoose.model("GuessFlagGame", guessFlagGameSchema);
