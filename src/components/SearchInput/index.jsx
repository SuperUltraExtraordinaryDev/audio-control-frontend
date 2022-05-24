import { useRef } from "react";

const SearchInput = ({ setItemValue }) => {
    const inputRef = useRef();

    return (
        <>
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-500 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                </div>
                <input
                    ref={inputRef}
                    type="search"
                    id="search"
                    className="block p-2.5 pl-10 w-96 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search"
                    required
                />
                <button
                    type="submit"
                    className="text-white absolute right-2.5 bottom-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                    onClick={() => setItemValue(inputRef.current.value)}
                >
                    Search
                </button>
            </div>
        </>
    );
};

export default SearchInput;
