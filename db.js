import mongoose from "mongoose";

const connectdb = async () => {
    try {
      await mongoose.connect(process.env.Mongo_Url, { useNewUrlParser: true , useUnifiedTopology: true, dbName: 'testpod'});
      console.log(`Mongodb is connected ${mongoose.connection.host}`);
    } catch (error) {
      console.log(`this is error ${error}`);
    }
  };

export default connectdb;  