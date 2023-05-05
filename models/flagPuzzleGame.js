import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";

const FlagPuzzleGameSchema = new mongoose.Schema({
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
    flag: {
      type: String,
      required: true
    },
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

FlagPuzzleGameSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
    await Log.deleteMany({_id: {$in: doc.logs}});
    await Result.deleteMany({_id: {$in: doc.results}});
  }
})

export default mongoose.model("Flag-Puzzle-Game", FlagPuzzleGameSchema);
