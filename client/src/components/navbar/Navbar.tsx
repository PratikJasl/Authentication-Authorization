import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="flex flex-row justify-between fixed top-0 left-0 right-0 bg-white shadow-md p-2">
            <div>
                <h1>TATA Electronics</h1>
            </div>

            <div className="flex flex-row gap-5">
                <Link to="/upload">Upload</Link>
                <Link to="/search">Search</Link>
                <Link to="/dashboard">Dashboard</Link>
            </div>
        </div>
    )
}

export default Navbar;