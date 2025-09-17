import { ERROR_MESSAGES } from "../common/messages";
import { ApiResponse } from "../common/response";
import { checkExistingUser } from "../database/UserDB";

export async function sendOtpToEmailService(email: string): Promise<ApiResponse<string>> {
    try {
        //@dev: Check if user exists.
        const existingUser = await checkExistingUser(email);

        if (existingUser) {
            console.error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
            return {
                success: false,
                message: ERROR_MESSAGES.USER_ALREADY_EXISTS,
            }
        }

        //@dev: Generate OTP along with its expiry and update it in DB.

        //@dev: Send email verification OTP over the mail.

        return{
            success: true,
            message: "OTP sent successfully",
        }
    } catch (error) {
        console.log("Error sending email verification OTP:", error);
        return {
            success: false,
            message: ERROR_MESSAGES.SERVER_ERROR || "Failed to send OTP",
        };
    }
}