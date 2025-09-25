import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../common/messages";
import { ApiResponse } from "../common/response";
import { transporter, mailOptions } from "../common/nodeMailer";
import { checkExistingUser, addNewUser } from "../database/UserDB";
import { type LoginResponseData } from "../common/interface";

type Roles = "ADMIN" | "ENGINEER" | "EXPERT";

export async function sendOtpToEmailService(email: string): Promise<ApiResponse<string>> {
    try {
        //@dev: Check if user exists.
        const existingUser = await checkExistingUser(email);

        if (existingUser.status) {
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

export async function signUpService(email: string, password: string, role: string, otpToken: string): Promise<ApiResponse<string>> {
    try {
        //@dev: Verify email verification token.
        const decoded = jwt.verify(otpToken, process.env.JWT_SECRET as string) as { email: string, email_verified: boolean };
        console.log("Decoded OTP Token:", decoded);

        //@dev: Check if email is verified.
        if (!decoded || !decoded.email_verified) {
            console.error(ERROR_MESSAGES.EMAIL_NOT_VERIFIED);
            return {
                success: false,
                message: ERROR_MESSAGES.EMAIL_NOT_VERIFIED,
            }
        }

        //@dev: Check if email matches.
        if(decoded.email !== email) {
            console.error(ERROR_MESSAGES.EMAIL_DOES_NOT_MATCH);
            return {
                success: false,
                message: ERROR_MESSAGES.EMAIL_DOES_NOT_MATCH,
            }
        }

        //@dev: Check for existing user.
        let existingUser = await checkExistingUser(email);
        if (existingUser.status) {
            console.error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
            return {
                success: false,
                message: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
            }
        }

        //@dev: hash password
        let hashedPassword = await bcrypt.hash(password, 10);

        //@dev: Save user to the DB
        let newUser = await addNewUser(email, hashedPassword, role as any);
        if (!newUser) {
            console.error(ERROR_MESSAGES.USER_NOT_CREATED);
            return {
                success: false,
                message: ERROR_MESSAGES.USER_NOT_CREATED,
            }
        }else{
            return {
            success: true,
            message: SUCCESS_MESSAGES.USER_CREATED
            }
        }
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        return {
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
        }
    }
} 

export async function logInService(email: string, password: string): Promise<ApiResponse<LoginResponseData>> {
    try {
        const existingUser = await checkExistingUser(email);
        if (!existingUser.status) {
            return {
                success: false,
                message: ERROR_MESSAGES.USER_NOT_FOUND,
                data: null
            };
        }

        if (!existingUser.data || !existingUser.data.password) {
            return {
                success: false,
                message: ERROR_MESSAGES.USER_NOT_FOUND,
                data: null
            };
        }

        const isMatch = await bcrypt.compare(password, existingUser.data.password);
        if (!isMatch) {
            return {
                success: false,
                message: ERROR_MESSAGES.INCORRECT_PASSWORD,
                data: null
            };
        }

        const token = jwt.sign({ email: existingUser.data.email, role: existingUser.data.role }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        return {
            success: true,
            message: SUCCESS_MESSAGES.USER_LOGGED_IN,
            data: {
                token,
                user: {
                    email: existingUser.data.email,
                    role: existingUser.data.role
                }
            }
        };
    } catch (error) {
        console.error(ERROR_MESSAGES.SERVER_ERROR, error);
        return {
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR,
            data: null
        };
    }
}
