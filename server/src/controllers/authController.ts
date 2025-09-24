import { Request, Response } from 'express';
import { sendOtpToEmailService, verifyOtpService, signUpService } from '../services/authService';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../common/messages';
import { errorResponse, successResponse } from '../common/response';

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
            res.status(400).json(errorResponse(result.message));
            return;
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
            res.status(201).json(successResponse(SUCCESS_MESSAGES.USER_CREATED));
            return;
        } else {
            res.status(400).json(errorResponse(result.message));
            return;
        }
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        res.status(500).json(errorResponse(ERROR_MESSAGES.SERVER_ERROR));
    }
}