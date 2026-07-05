import { Router } from "express";
import { signIn,login } from "../controllers/controller.auth.js";
import { verifyUser } from "../middlewares/middleware.auth.js";


const authRouter = Router();

authRouter.post("/signIn",signIn);
authRouter.post("/login",verifyUser,login);






export default authRouter;