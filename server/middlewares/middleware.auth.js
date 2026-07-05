
import jwt from 'jsonwebtoken';

export function verifyUser(req,res,next){
    try {
        console.log("middleware hit")
        
        const token = req.headers.authorization?.split(" ")[1];

    if (!token) {

  return res.status(401).json({ msg: "Token not found" });
}

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
        req.user = decoded;

        next();

    } catch (error) {
           console.log(error.message);
         return res.status(401).json({msg:"invalid token or expired token"})
    }
   
}