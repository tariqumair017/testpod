import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


let UserSchema = new mongoose.Schema({ 
    name: {
        type:String,
        required:true
    },
    dob: {
        type:String,
        required:true
    },
    phoneNum: {
        type:Number,
        required:true
    },
    country: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    learningGoal: {
        type:String,
        required:true
    },
    location: {
        type:String,
        required:true
    },
    aboutMe: {
        type:String,
        required:true,
        maxLength: 150
    }
});

UserSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", UserSchema);