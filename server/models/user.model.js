import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username required"],
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        required:[true,"email id is reuqired"],
        unique:[true,"username must be unique"]
    },
    password:{
        type:String,
        required:true
    },
})

const UserDB = mongoose.model("User",userSchema);


export default UserDB;