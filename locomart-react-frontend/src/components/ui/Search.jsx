import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/features/search/searchSlice.js'

export default function Search() {
    const dispatch = useDispatch()

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value)) // Dispatch the search query to Redux store
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent form submission (page reload)
    }

    return (
        <div className="w-full">
            <form className="max-w-[500px] mx-auto outline-none" onSubmit={handleSearchSubmit}>
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-slate-100 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-[#fff] dark:border-gray-800 dark:placeholder-gray-400"
                        placeholder="Search your favorite meme coins, etc"
                        required
                        onChange={handleSearchChange}
                        />

                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    )
}

/*import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/features/search/searchSlice.js'

export default function Search() {
    const dispatch = useDispatch()

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value)) // Dispatch the search query to Redux store
    }

    return (
        <div className="w-full">
            <form className="max-w-[500px] mx-auto outline-none ">
                <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-slate-100 sr-only dark:text-white"
                >
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                            className="w-4 h-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-[#fff] dark:border-gray-800 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Search items"
                        required
                        onChange={handleSearchChange} // Handle input change
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Search
                    </button>
                </div>
            </form>
        </div>
    )
}
*/