import { Router } from "express";
import { emailDataValidation } from "../middleware/authDataValidation";
import { sendEmailVerificationOTP } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/verify-email', emailDataValidation, sendEmailVerificationOTP);

export { authRouter };