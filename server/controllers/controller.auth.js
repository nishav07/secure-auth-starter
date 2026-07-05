import UserDB from "../models/user.model.js";
import jwt from 'jsonwebtoken'

import crypto from 'crypto';

export async function signIn(req,res){
    const {userName,email,password} = req.body;

    const isUserAlreadySigned = await UserDB.findOne({});

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


    const token = jwt.sign({
        id:user._id 
    },
    process.env.JWT_SECRET,
    {
        expiresIn:'1d'
    }
)

res.status(201).json({msg:"user registered",user:{userName,email},token})
}
