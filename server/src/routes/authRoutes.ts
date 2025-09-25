import { Router } from "express";
import { emailDataValidation, loginDataValidation, otpDataValidation, signUpDataValidation } from "../middleware/authDataValidation";
import { logIn, otpVerification, sendEmailVerificationOTP, signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/verify-email', emailDataValidation, sendEmailVerificationOTP);
authRouter.post('/verify-otp', otpDataValidation, otpVerification);
authRouter.post('/signup', signUpDataValidation, signUp);
authRouter.post('/login', loginDataValidation, logIn);

export { authRouter };