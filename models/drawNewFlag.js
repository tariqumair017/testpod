import mongoose from "mongoose"; 

const drawNewFlagSchema = new mongoose.Schema({
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
});


export default mongoose.model("DrawNewFlag", drawNewFlagSchema);
