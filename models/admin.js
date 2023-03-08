import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


let AdminSchema = new mongoose.Schema({ 
    name: {
        type:String, 
        required:true
    },
    username: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type:String, 
        required:true
    }
});

AdminSchema.plugin(passportLocalMongoose);
export default mongoose.model("Admin", AdminSchema);