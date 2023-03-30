import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


let AdminSchema = new mongoose.Schema({ 
    email: {
        type:String, 
        required:true
    }
});

AdminSchema.plugin(passportLocalMongoose);
export default mongoose.model("Admin", AdminSchema);