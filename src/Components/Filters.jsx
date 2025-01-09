import { useState } from "react";

const Filters = ({ onFilter, applyNoFilters, sortByDateAsc, sortByDateDesc, sortByNIAsc, sortByNIDesc, sortByRevAsc, sortByRevDesc}) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [minRevenue, setMinRevenue] = useState("");
    const [maxRevenue, setMaxRevenue] = useState("");
    const [minNetIncome, setMinNetIncome] = useState("");
    const [maxNetIncome, setMaxNetIncome] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(false);
    };

    const applyFilters = () => {
        if (
            (startDate && endDate && parseInt(startDate, 10) > parseInt(endDate, 10)) ||
            (minRevenue && maxRevenue && parseFloat(minRevenue) > parseFloat(maxRevenue)) ||
            (minNetIncome && maxNetIncome && parseFloat(minNetIncome) > parseFloat(maxNetIncome))
        ) {
            setModalVisible(true);
            return;
        }
        else {
            onFilter({ startDate, endDate, minRevenue, maxRevenue, minNetIncome, maxNetIncome });
        }
    };



    return (
        <>
            <div id="popup-modal" className={`${modalVisible ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center`}>
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Start date, min revenue or min net income cannot be greater than min
                            </h3>
                            <button onClick={closeModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white shadow-lg rounded-lg mb-6">

                <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                    {/* Date Range Filter */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="date-range" className="text-sm font-medium text-gray-700">Date Range (YYYY)</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Start Year"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="End Year"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Revenue Range Filter */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="revenue" className="text-sm font-medium text-gray-700">Revenue Range (in USD billion)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min Revenue"
                                value={minRevenue}
                                min={0}
                                onChange={(e) => setMinRevenue(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                                type="number"
                                placeholder="Max Revenue"
                                value={maxRevenue}
                                min={0}
                                onChange={(e) => setMaxRevenue(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Net Income Range Filter */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="net-income" className="text-sm font-medium text-gray-700">Net Income Range (in USD billion)</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="Min Net Income"
                                value={minNetIncome}
                                min={0}
                                onChange={(e) => setMinNetIncome(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="number"
                                placeholder="Max Net Income"
                                value={maxNetIncome}
                                min={0}
                                onChange={(e) => setMaxNetIncome(e.target.value)}
                                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:auto-rows-auto lg:flex lg:space-x-4">
                    <button
                        style={{ backgroundColor: '#1E712A', color: 'white' }}
                        onClick={applyFilters}
                        className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Apply Filters
                    </button>
                    <button
                        style={{ backgroundColor: '#1E712A', color: 'white' }}
                        onClick={applyNoFilters}
                        className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        No Filters
                    </button>
                    <button
                        style={{ backgroundColor: '#1E712A', color: 'white' }}
                        onClick={sortByDateAsc}
                        className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sort By Date ↑
                    </button>
                    <button
                        style={{ backgroundColor: '#1E712A', color: 'white' }}
                        onClick={sortByDateDesc}
                        className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sort By Date ↓
                    </button>
                    <button
                        style={{ backgroundColor: '#1E712A', color: 'white' }}
                        onClick={sortByRevAsc}
                        className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sort By Rev ↑
                    </button>
                    <button
                        style={{ backgroundColor: '#1E712A', color: 'white' }}
                        onClick={sortByRevDesc}
                        className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sort By Rev ↓
                    </button>
                    <button
                        style={{ backgroundColor: '#1E712A', color: 'white' }}
                        onClick={sortByNIAsc}
                        className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sort By NI ↑
                    </button>
                    <button
                        style={{ backgroundColor: '#1E712A', color: 'white' }}
                        onClick={sortByNIDesc}
                        className="flex-grow bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Sort By NI ↓
                    </button>
                </div>


            </div>
        </>

    );
};

export default Filters;
