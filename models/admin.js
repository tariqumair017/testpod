import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


let AdminSchema = new mongoose.Schema({ 
    username: {
        type:String,
        unique:true
    },
    password: String
});

AdminSchema.plugin(passportLocalMongoose);
export default mongoose.model("Admin", AdminSchema);