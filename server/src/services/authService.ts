import jwt from 'jsonwebtoken';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
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
        const token = jwt.sign({email, Otp, otpExpiry}, process.env.JWT_SECRET as string, { expiresIn: '10m' });

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

export async function verifyOtpService(otp: string, otpToken: string): Promise<ApiResponse<string>> {
    try {
        const decoded = jwt.verify(otpToken, process.env.JWT_SECRET as string) as { email: string, Otp: string, otpExpiry: Date };
        console.log("Decoded OTP Token:", decoded);

        if (!decoded || decoded.Otp !== otp) {
            console.error(ERROR_MESSAGES.INVALID_OTP);
            return {
                success: false,
                message: ERROR_MESSAGES.INVALID_OTP,
            }
        }

        if (decoded.otpExpiry < new Date()) {
            console.error(ERROR_MESSAGES.OTP_EXPIRED);
            return {
                success: false,
                message: ERROR_MESSAGES.OTP_EXPIRED,
            }
        }

        const verifiedToken = jwt.sign({ email: decoded.email, email_verified: true }, process.env.JWT_SECRET as string, { expiresIn: '15m' });

        return {
            success: true,
            message: SUCCESS_MESSAGES.OTP_VERIFIED,
            data: verifiedToken
        }
    } catch (error) {
        console.log(ERROR_MESSAGES.ERROR_VERIFYING_OTP, error);
        throw error;
    }
}