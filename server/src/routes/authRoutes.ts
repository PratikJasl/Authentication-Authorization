import { Router } from "express";
import { sendEmailVerificationOTP } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/verify-email', sendEmailVerificationOTP);

export { authRouter };