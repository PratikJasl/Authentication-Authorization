import { Request, Response } from 'express';
import { sendOtpToEmailService } from '../services/authService';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../common/messages';

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
            })
            res.status(200).json({ message: SUCCESS_MESSAGES.OTP_SENT_SUCCESSFULLY })
            return;
        }else{
            res.status(400).json({ message: result.message })
            return;
        }
        
    } catch (error) {
        console.error(ERROR_MESSAGES.EMAIL_NOT_SENT, error);
        res.status(500).json({message: error instanceof Error ? error.message : ERROR_MESSAGES.EMAIL_NOT_SENT});
    }
}