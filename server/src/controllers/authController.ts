import { Request, Response } from 'express';

export async function sendEmailVerificationOTP(req: Request, res: Response): Promise<void> {
    console.log('-----------------Send Email Verification OTP----------------------');

    const { email } = req.body as { email: string };

    try {
        console.log(email);
    } catch (error) {
        console.log("Error sending email verification OTP:", error);
    }
}