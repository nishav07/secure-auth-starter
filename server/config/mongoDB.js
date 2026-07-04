import mongoose from "mongoose";

async function connectDB() {
  try {
    if(!process.env.MONGO_URL){
        throw new Error("Mongo URL is not defined in env ");
        
    }
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

export default connectDB;