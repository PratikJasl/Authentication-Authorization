import { useState } from "react";

function Search(){
    const [searchTerm, setSearchTerm] = useState("");
        
    return(
        <section id="search" className="w-fit h-fit p-5 mb-10">
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-200 mt-8">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
                    Search Error Codes
                </h2>

                <div className="mb-6 flex space-x-3">
                    <input
                        type="text"
                        placeholder="Enter Error Code"
                        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
                    >
                        Search
                    </button>
                </div> 
            </div>
        </section>
    )
}

export default Search