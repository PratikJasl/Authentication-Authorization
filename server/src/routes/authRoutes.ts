import { Router } from "express";
import { emailDataValidation, otpDataValidation, signUpDataValidation } from "../middleware/authDataValidation";
import { otpVerification, sendEmailVerificationOTP, signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/verify-email', emailDataValidation, sendEmailVerificationOTP);
authRouter.post('/verify-otp', otpDataValidation, otpVerification);
authRouter.post('/signup', signUpDataValidation, signUp);

export { authRouter };