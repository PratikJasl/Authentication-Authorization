import axios from 'axios';
import { type emailVerificationData } from "../../schema/authSchema";

export async function sendEmailVerificationOtp(data: emailVerificationData){
    try {
        let response = await axios.post("http://localhost:3000/api/auth/verify-email",
        data,
        {
            headers: {
            "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        console.log("Response Received is", response);
        return response;
    } catch (error) {
        console.error("Error Logging In", error);
        throw error
    }
}