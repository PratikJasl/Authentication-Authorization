import { useEffect } from "react";
import { logInStatus } from "../../atom/userAtom";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DashBoard() {
    const isLoggedIn = useRecoilValue(logInStatus);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error("You are not logged in. Please log in to access the dashboard.");
            navigate('/login');
        }
    }, [isLoggedIn]);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default DashBoard;