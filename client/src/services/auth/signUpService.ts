import axios from 'axios';
import { type signUpFormData } from '../../schema/authSchema';

export async function signUpService(data: signUpFormData) {
    try {
        let response = await axios.post("http://localhost:3000/api/auth/signup",
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
        throw error;
    }
}

