import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";

const flagDetectiveGameSchema = new mongoose.Schema({
  continent: {
    type: String,
    required: true
    }, 
  level: {
    type: Number,
    required: true
    },
  gameDetail: {
    type: String,
    required: true
   },
  regionImg: {
    type: String,
    required: true
    },
  questions: [{
    flagName: {
      type: String,
      required: true
      }, 
    hint: {
      type: String,
      required: true
      },
    flagImg: {
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

flagDetectiveGameSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
    await Log.deleteMany({_id: {$in: doc.logs}});
    await Result.deleteMany({_id: {$in: doc.results}});
  }
})

export default mongoose.model("Flag-Detective-Game", flagDetectiveGameSchema);
