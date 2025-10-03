import axios from 'axios';

axios.defaults.withCredentials = true;

export const verifyUserSession = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/auth/verify");
        console.log("User session verified:", response);
        return response;
    } catch (error) {
        console.error("Error verifying user session:", error);
        throw error;
    }
};
