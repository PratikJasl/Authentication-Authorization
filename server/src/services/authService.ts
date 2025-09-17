import { ERROR_MESSAGES } from "../common/messages";
import { checkExistingUser } from "../database/UserDB";

export async function sendOtpToEmailService(email: string): Promise<void> {
    try {
        //@dev: Check if user exists.
        const existingUser = await checkExistingUser(email);

        if (existingUser) {
            console.error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
            throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }

        //@dev: Generate OTP along with its expiry and update it in DB.

        //@dev: Send email verification OTP over the mail.
    } catch (error) {
        console.log("Error sending email verification OTP:", error);
    }
}