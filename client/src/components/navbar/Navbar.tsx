import { Link, useNavigate } from "react-router-dom";
import { ArrowRightOnRectangleIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { logInStatus } from "../../atom/userAtom";
import { logOutService } from "../../services/auth/logOutService";
import { toast } from "react-toastify";

function Navbar(){
    const navigate = useNavigate(); 
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn, email, role } = useRecoilValue(logInStatus);
    const setLoginStatus = useSetRecoilState(logInStatus);
    
    function handleClick(){
        setIsOpen(!isOpen);
    }

    const handleLogout = async () => {
        try {
            let response = await logOutService();
            if(response.status === 200) {
                setLoginStatus({
                    isLoggedIn: false,
                    email: null,
                    role: null
                });
                toast.success("Logged out successfully");
                navigate('/login');
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }

    return (
        <div className="fixed top-0 left-0 h-full flex flex-col bg-white shadow-lg z-50 transition-all duration-300 ease-in-out" style={{ width: isOpen ? '250px' : '60px' }}>
        <button
            onClick={handleClick}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="m-2 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {isOpen ? (
            <XMarkIcon className="h-6 w-6 text-gray-600" />
            ) : (
            <Bars3Icon className="h-6 w-6 text-gray-600" />
            )}
        </button>

        {isOpen && (
            <div className="flex flex-col justify-between flex-grow p-5">
            <div className="flex flex-col space-y-4">
                {/* Display user email if logged in */}
                {isLoggedIn && (
                    <div className="mb-4 p-2 bg-gray-100 rounded-md text-center">
                        <p className="text-sm font-semibold text-gray-800 break-all">{email}</p>
                        <p className="text-xs text-gray-500 capitalize">{role} Role</p>
                    </div>
                )}

                <Link to="/search" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>
                Search
                </Link>

                {/* --- Conditional Links Based on Auth State --- */}
                {isLoggedIn ? (
                <>
                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>
                    Dashboard
                    </Link>
                    {/* Role-based UI change */}
                    {role === 'Admin' && (
                        <Link to="/upload" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>
                            Upload
                        </Link>
                    )}
                </>
                ) : (
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setIsOpen(false)}>
                    Login
                </Link>
                )}
            </div>

            {isLoggedIn && (
                <button onClick={handleLogout} className="mt-auto flex items-center justify-center w-full p-2 text-red-600 hover:bg-red-100 rounded-md font-medium">
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                    Logout
                </button>
            )}
            </div>
        )}
        </div>
    );
}

export default Navbar;