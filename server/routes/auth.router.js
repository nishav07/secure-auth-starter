import { Router } from "express";
import { signIn,getMe } from "../controllers/controller.auth.js";
import { verifyUser } from "../middlewares/middleware.auth.js";


const authRouter = Router();

authRouter.post("/signIn",signIn);
authRouter.post("/get-me",verifyUser,getMe);






export default authRouter;