import { Router } from "express";
import { emailDataValidation, loginDataValidation, otpDataValidation, requestValidation, signUpDataValidation } from "../middleware/authDataValidation";
import { logIn, logOut, otpVerification, sendEmailVerificationOTP, signUp, verifyUser } from "../controllers/authController";

const authRouter = Router();

authRouter.post('/verify-email', emailDataValidation, sendEmailVerificationOTP);
authRouter.post('/verify-otp', otpDataValidation, otpVerification);
authRouter.post('/signup', signUpDataValidation, signUp);
authRouter.post('/login', loginDataValidation, logIn);
authRouter.post('/logout', requestValidation, logOut);
authRouter.get('/verify', requestValidation, verifyUser);

export { authRouter };