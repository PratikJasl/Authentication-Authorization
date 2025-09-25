import axios from 'axios';
import { type loginFormData,  } from '../../schema/authSchema';

export async function loginService(data: loginFormData) {
    try {
        let response = await axios.post("http://localhost:3000/api/auth/login",
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

