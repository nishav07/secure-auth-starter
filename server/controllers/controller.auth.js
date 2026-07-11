import UserDB from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";

import crypto from 'crypto';

export async function signIn(req,res){
    const {userName,email,password} = req.body;

    const isUserAlreadySigned = await UserDB.findOne({
        email: req.body.email
    });

    if(isUserAlreadySigned){
        return res.status(409).json({msg:'User already exist with this data'});
    }

     if(!process.env.JWT_SECRET){
        throw new Error("Mongo URL is not defined in env");
        
    }
    

    const hashedPass = crypto.createHash('sha256').update(password).digest('hex');
    let user = await UserDB.create({
        userName,
        email,
        password:hashedPass
    })


    const accessToken = jwt.sign({
        id:user._id 
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'15m'
    }
)


 const refreshToken = jwt.sign({
        id:user._id 
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'7d'
    }
)


res.cookies("refreshToken",refreshToken, {
    httpOnly:true,
    secure:true,
    sameSite:"strict",
    maxAge: 7 * 24 * 60 * 60 *1000 //7days
})

res.status(201).json({msg:"user registered",user:{userName,email},accessToken})
}


export async function getMe(req,res) {
    console.log("routee hitttt")
    try {
        const id = req.user.id;
        console.log("id",id)

    const user = await UserDB.findById(id);

    res.status(200).json({user})

    } catch (error) {
        console.log(error.message)
         res.status(404).json({message:"user not found"})
    }
    
}

export async function refreshToken(req,res) {
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        res.status(401).json({message:"Token not found"})
    }

    let decoded = jwt.verify(refreshToken,process.env.JWT_SECRET);

     const accessToken = jwt.sign({
        id:decoded.id
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'15m'
    })

    res.status(200).json({message:"Access Token genarted succefully",accessToken})
    
}