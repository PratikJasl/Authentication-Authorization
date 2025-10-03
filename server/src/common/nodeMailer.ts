import nodeMailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string),
    auth:{
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

export { transporter };


export function mailOptions(email: string, Otp: string) {
    return {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Account Verification OTP',
        text: 
        `Hi,
        Your Email verification OTP is: ${Otp}

        Best Regards
        Pratik Jussal`
    }
}
