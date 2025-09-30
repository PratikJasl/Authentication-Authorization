import axios from "axios";

export async function logOutService() {
    try {
        let response = await axios.post("http://localhost:3000/api/auth/logout",
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