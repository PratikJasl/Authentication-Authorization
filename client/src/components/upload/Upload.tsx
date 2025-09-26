import { InboxArrowDownIcon } from "@heroicons/react/24/outline";
import { DocumentIcon } from "@heroicons/react/24/outline";

function Upload(){

    return(
        <section 
            id="upload" 
            className="h-fit w-fit p-5 m-5 bg-white rounded-xl shadow-2xl"
        >
            <h1 className="text-2xl 2xl:text-4xl font-bold text-blue-500 text-center mb-5">Excel Data Uploader</h1>

            <form className="flex flex-col items-center gap-3 2xl:gap-5 p-3 lg:p-5 2xl:p-10 border border-gray-100 rounded-xl shadow-lg bg-white">
                <label
                    htmlFor="file-upload"
                    className="block text-md font-semibold text-gray-800 self-start"
                >
                    Select Excel File (.xls, .xlsx)
                </label>
                <input
                    id="file-upload"
                    type="file"
                    accept=".xls,.xlsx"
                    className="block w-full border border-gray-300 rounded-xl cursor-pointer bg-gray-50 file:mr-4 file:py-3 file:px-6 file:rounded-lg file:border-0 file:text-base file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700 hover:cursor-pointer"
                />

                <button
                    type="submit"
                    className="mt-2 bg-blue-600 text-white font-bold text-lg py-2 rounded-xl shadow-md hover:bg-blue-700 hover:cursor-pointer transition-colors duration-200 w-full disabled:bg-gray-400"
                >
                    Process and Upload Data
                </button>
            </form>

            
            <div className="mt-5 text-gray-700 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex flex-row items-center justify-between mb-4">
                    <h3 className="flex flex-row gap-1 font-bold text-xl text-blue-700 items-center">
                        <DocumentIcon className="h-6 w-6 text-gray-500" /> Expected Excel Schema:
                    </h3>

                    <a href="../../../public/sample.xlsx" className="flex flex-row gap-1 font-semibold text-blue-700 hover:underline underline-offset-2">
                        <InboxArrowDownIcon className="h-6 w-6 text-green-500" />
                        Download Sample
                    </a>
                </div>
                
                <p className="mb-4 text-sm sm:text-base">
                    Your file must contain the following columns with the specified data types for a successful upload:
                </p>
                
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    {[
                        { col: 'Error Code', type: 'String' },
                        { col: 'Step Code', type: 'String' },
                        { col: 'Step Description', type: 'String' },
                        { col: 'Components', type: 'String' },
                        { col: 'Net Signal', type: 'String' },
                        { col: 'Suggested Actions', type: 'String' },
                    ].map((item, index) => (
                        <li key={index} className="flex justify-between items-center text-sm md:text-base p-2 bg-white rounded-lg shadow-sm">
                            <span className="font-mono text-gray-900 font-medium">{item.col}</span>
                            <span className="text-purple-600 font-semibold text-xs py-0.5 px-2 bg-purple-100 rounded-full">{item.type}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Upload;