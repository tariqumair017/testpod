import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";

const SelectCountryFlagGameSchema = new mongoose.Schema({
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

SelectCountryFlagGameSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
      await Log.deleteMany({_id: {$in: doc.logs}});
      await Result.deleteMany({_id: {$in: doc.results}});
  }
})

export default mongoose.model("Guess-Country-Game", SelectCountryFlagGameSchema);
