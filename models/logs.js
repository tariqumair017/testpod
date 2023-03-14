import mongoose from "mongoose";

const LogsSchema = new mongoose.Schema({
  views: {
    type: Number
    },
  started: {
    type: Number
    },
  completed: {
    type: Number
    },
  leftAt: {
    type: String
    }
});

export default mongoose.model("Logs", LogsSchema);
