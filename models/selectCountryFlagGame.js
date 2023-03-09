import mongoose from "mongoose";

const SelectCountryFlagGameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true
    }, 
  gameDetail: {
    type: String,
    required: true
    },
  questions: [{
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
  }]
});

export default mongoose.model("SelectFlagQuestions", SelectCountryFlagGameSchema);
