export async function sendEmailVerificationOtpService(email: string): Promise<void> {
    try {
        //@dev: Check if user exists.

        //@dev: Generate OTP along with its expiry and update it in DB.

        //@dev: Send email verification OTP over the mail.
    } catch (error) {
        console.log("Error sending email verification OTP:", error);
    }
}