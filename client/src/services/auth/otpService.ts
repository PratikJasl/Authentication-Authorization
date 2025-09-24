import axios from 'axios';
import { type verifyOtpData } from "../../schema/authSchema";

export async function otpVerification(data: verifyOtpData){
    try {
        let response = await axios.post("http://localhost:3000/api/auth/verify-otp",
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

