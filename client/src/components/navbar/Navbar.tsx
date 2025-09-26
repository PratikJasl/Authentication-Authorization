import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    
    function handleClick(){
        setIsOpen(!isOpen);
    }

    return(
        <div className="fixed top-0 left-0 h-full flex flex-col bg-white shadow-md z-50">
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
                <div className="flex flex-col space-y-2 p-5">
                    <Link
                        to="/upload"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                        onClick={() => setIsOpen(false)}
                    >
                        Upload
                    </Link>
                    <Link
                        to="/search"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                        onClick={() => setIsOpen(false)}
                    >
                        Search
                    </Link>
                    <Link
                        to="/dashboard"
                        className="text-gray-700 hover:text-blue-600 font-medium"
                        onClick={() => setIsOpen(false)}
                    >
                        Dashboard
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Navbar;