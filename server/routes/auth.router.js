import { Router } from "express";
import { signIn,getMe,refreshToken } from "../controllers/controller.auth.js";
import { verifyUser } from "../middlewares/middleware.auth.js";


const authRouter = Router();

authRouter.post("/signIn",signIn);
authRouter.post("/get-me",verifyUser,getMe);
authRouter.get("/refresh-token",refreshToken)






export default authRouter;