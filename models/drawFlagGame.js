import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";

const drawFlagGameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true
    }, 
  gameDetail: {
    type: String,
    required: true
    },
  countryImg: {
    type: String,
    required: true
  },
  questions: [{
    country: {
      type: String,
      required: true
      }, 
    flagUrl: {
      type: String,
      required: true
      },
    flagDetails: {
      type: String,
      required: true
    },
    shapeImg: {
      type: String,
      required: true
    },
    correctColors: [],
    arrangement: {
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

drawFlagGameSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
    await Log.deleteMany({_id: {$in: doc.logs}});
    await Result.deleteMany({_id: {$in: doc.results}});
  }
})

export default mongoose.model("Draw-Flag-Game", drawFlagGameSchema);
