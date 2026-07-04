import { Router } from "express";
import { signIn } from "../controllers/controller.auth.js";


const authRouter = Router();

authRouter.post("/signIn",signIn);






export default authRouter;