import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES } from "../common/messages";
import { ApiResponse } from "../common/response";
import { transporter, mailOptions } from "../common/nodeMailer";
import { checkExistingUser } from "../database/UserDB";

export async function sendOtpToEmailService(email: string): Promise<ApiResponse<string>> {
    try {
        //@dev: Check if user exists.
        const existingUser = await checkExistingUser(email);

        if (existingUser) {
            console.error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
            return {
                success: false,
                message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
            }
        }

        //@dev: Generate 6 digit OTP along with its expiry.
        const Otp = String(Math.floor(100000 + Math.random() * 900000));
        const otpExpiry = new Date(Date.now() + 10 * 60 * 60 * 1000);

        //@dev: Generate JWT with OTP and expiry
        const token = jwt.sign({email, Otp, otpExpiry}, process.env.JWT_SECRET as string, { expiresIn: '15m' });

        //@dev: Send email verification OTP over the mail.
        const mail = mailOptions(email, Otp);
        const mailSent = await transporter.sendMail(mail);

        if (!mailSent) {
            console.error(ERROR_MESSAGES.EMAIL_NOT_SENT);
            return {
                success: false,
                message: ERROR_MESSAGES.EMAIL_NOT_SENT,
            }
        }
        return {
            success: true,
            message: "OTP sent successfully",
            data: token
        }
    } catch (error) {
        console.log("Error sending email verification OTP:", error);
        throw error;
    }
}