import mongoose from "mongoose";
import Log from "./logs.js";
import Result from "./result.js";

const PodAdventureGameSchema = new mongoose.Schema({
  unit: {
    type: String,
    required: true
    }, 
  modules: {
    type: Array,
    required: true
    }, 
  guessCountry: [{
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
  guessFlag: [{
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
    hint: {
      type: String,
      required: true
    }
  }],
  flagDetective: [{
    country: {
      type: String,
      required: true
      }, 
      flagUrl: {
        type: String,
        required: true
      },
    hint: {
      type: String,
      required: true
      }
  }],
  flagPuzzle: [{
    country: {
      type: String,
      required: true
      }, 
    flag: {
      type: String,
      required: true
    },
  }],
  flagQuest: [{
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
  results: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Results"
    }]
});

PodAdventureGameSchema.post("findOneAndDelete", async function(doc){
  if(doc)
  {
      await Log.deleteMany({_id: {$in: doc.logs}});
      await Result.deleteMany({_id: {$in: doc.results}});
  }
})

export default mongoose.model("Pod-Adventure-Game", PodAdventureGameSchema);
