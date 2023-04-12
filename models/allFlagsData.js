import mongoose from "mongoose";

const AllFlagsDataSchema = new mongoose.Schema({
    country: {
        type: String, 
    },
    flag: {
        type: String, 
    },
    region: {
        type: String, 
    }
});

export default mongoose.model("All-Flags-Data", AllFlagsDataSchema);
