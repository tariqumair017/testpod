import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";


let UserSchema = new mongoose.Schema({ 
    admin: {
        type: Boolean,
        default: false
    },
    name: {
        type:String,
        required:true
    },
    dob: {
        type:String
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
    },
    learningGoal: {
        type:String, 
    },
    location: {
        type:String, 
    },
    aboutMe: {
        type:String, 
        maxLength: 150
    }
});

UserSchema.plugin(passportLocalMongoose);
export default mongoose.model("User", UserSchema);