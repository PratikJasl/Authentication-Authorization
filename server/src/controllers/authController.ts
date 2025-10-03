import { Request, Response } from 'express';
import { sendOtpToEmailService, verifyOtpService, signUpService, logInService, verifyUserService } from '../services/authService';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../common/messages';
import { errorResponse, successResponse } from '../common/response';
import { checkExistingUser } from '../database/UserDB';


export async function sendEmailVerificationOTP(req: Request, res: Response): Promise<void> {
    console.log('-----------------Send Email Verification OTP----------------------');
    const { email } = req.body as { email: string };

    try {
        const result = await sendOtpToEmailService(email);

        if(result.success) {
            res.cookie('otpToken', result.data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
            });
            res.status(200).json(successResponse(SUCCESS_MESSAGES.OTP_SENT_SUCCESSFULLY));
            return;
        }else{
            let statusCode = 400;
            if (result.message === ERROR_MESSAGES.EMAIL_ALREADY_EXISTS) {
                statusCode = 409; // Use 409 Conflict for resource conflicts
            } else if (result.message === ERROR_MESSAGES.EMAIL_NOT_SENT) {
                statusCode = 500; // Treat mailer failure as an internal server error
            }
            res.status(statusCode).json(errorResponse(result.message));
        }
        
    } catch (error) {
        console.error(ERROR_MESSAGES.EMAIL_NOT_SENT, error);
        res.status(500).json(errorResponse(error instanceof Error ? error.message : ERROR_MESSAGES.EMAIL_NOT_SENT));
    }
}

export async function otpVerification(req: Request, res: Response): Promise<void> {
    console.log('-----------------OTP Verification----------------------');
    const { otp } = req.body as { otp: string };
    const otpToken = req.cookies.otpToken;

    console.log("OTP Verification:", otp, otpToken);

    try {
        const result = await verifyOtpService(otp, otpToken);

        if(result.success) {
            console.log("OTP Verified successfully");
            res.cookie('otpToken', result.data, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
            });
            res.status(200).json(successResponse(result.message));
            return;
        }else{
            //@dev: Clear cookie on failure to prevent stale tokens
            //res.cookie('otpToken', '', { maxAge: 0, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(400).json(errorResponse(result.message));
            return;
        }
        
    } catch (error) {
        //@dev: Clear cookie on failure to prevent stale tokens
        console.error(ERROR_MESSAGES.EMAIL_NOT_SENT, error);
        //res.cookie('otpToken', '', { maxAge: 0, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(500).json(errorResponse(error instanceof Error ? error.message : ERROR_MESSAGES.EMAIL_NOT_SENT));
    }
}

export async function signUp(req: Request, res: Response): Promise<void> {
    console.log('-----------------User Sign Up----------------------');
    const { email, password, role } = req.body as { email: string, password: string, role: string };
    const otpToken = req.cookies.otpToken;

    console.log("User Sign Up:", email, role, otpToken);

    try {
        const result = await signUpService(email, password, role, otpToken);
        if (result.success) {
            //@dev: Clear cookie on failure to prevent stale tokens
            res.cookie('otpToken', '', { maxAge: 0, httpOnly: true, secure: process.env.NODE_ENV === 'production' });
            res.status(201).json(successResponse(result.message));
            return;
        } else {
            console.log("User Sign Up failed:", result.message);
            res.status(400).json(errorResponse(result.message));
            return;
        }
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
    }
}

export async function logIn(req: Request, res: Response): Promise<void> {
    console.log('-----------------User Log In----------------------');
    const { email, password } = req.body as { email: string, password: string };

    console.log("User Log In:", email);

    try {
        const result = await logInService(email, password);
        if (result.success) {
            res.status(200).cookie('token', result.data?.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
            }).json(successResponse(result.message, result.data?.user));
            return;
        } else {
            console.log("User Log In failed:", result.message);
            res.status(400).json(errorResponse(result.message));
            return;
        }
    } catch (error) {
        res.json(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return
    }
}

export async function logOut(req: Request, res: Response): Promise<void> {
    console.log('-----------------User Log Out----------------------');
    //@dev: Clear the clients cookies.
    try {
        res.status(200).clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        }).json(successResponse(SUCCESS_MESSAGES.USER_LOGOUT));
        return;
    } catch (error) {
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
        return;
    }
}

export async function verifyUser(req: Request, res: Response): Promise<void> {
    console.log('-----------------Verify User----------------------');
    try {
        const userEmail = req.user?.email;
        const userRole = req.user?.role;
        console.log("User Email:", userEmail);

        if (!userEmail || !userRole) {
            res.status(401).json(errorResponse(ERROR_MESSAGES.UNAUTHORIZED));
            return;
        }

        const userCheck = await verifyUserService(userEmail, userRole);
        if (!userCheck.success) {
            res.status(401).json(errorResponse(userCheck.message));
            return;
        }

        res.status(200).json(successResponse(SUCCESS_MESSAGES.USER_VERIFIED, {email: userCheck.data?.email, role: userCheck.data?.role}));
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
    }
}