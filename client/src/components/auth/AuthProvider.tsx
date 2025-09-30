import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { logInStatus } from "../../atom/userAtom";
import axios from "axios";
import { verifyUserSession } from "../../services/auth/sessionService";

axios.defaults.withCredentials = true;

function AuthProvider({ children }: { children: React.ReactNode }) {
    const setLoginStatus = useSetRecoilState(logInStatus);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await verifyUserSession();

                if (response.data && response.data.success) {
                    setLoginStatus({
                        isLoggedIn: true,
                        email: response.data.data.email,
                        role: response.data.data.role,
                    });
                }
            } catch (error) {
                console.log('User not authenticated:', error);
                setLoginStatus({
                    isLoggedIn: false,
                    email: null,
                    role: null,
                });
            }
        };
        verifyUser();
    }, [setLoginStatus]);

    return <>{children}</>;
};

export default AuthProvider;