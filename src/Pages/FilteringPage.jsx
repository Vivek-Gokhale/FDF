import { useEffect, useState } from "react";
import DataTable from "../Components/DataTable";
import Filters from "../Components/Filters";
import axios from 'axios';

const FilteringPage = () => {
    const API_URL = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=Eyd7kTXPUOZJHGZnh3weFNPfcR2qEIIw";
    const [data, setData] = useState([]);


    const formatCurrency = (value) => {
        return (value / 1_000_000_000).toFixed(2);
    };


    const fetchAAPLData = async () => {
        try {
            const response = await axios.get(API_URL);
            if (response.status === 200 && response.data) {
                const AAPLData = response.data;

                const formattedData = AAPLData.map(item => ({
                    date: item.date,
                    revenue: item.revenue,
                    netIncome: item.netIncome,
                    grossProfit: item.grossProfit,
                    eps: item.eps,
                    operatingIncome: item.operatingIncome
                }));

                setData(formattedData);
            } else {
                console.error("Error: Failed to fetch data. Check the API response.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchAAPLData();
    }, []);

    const handleOnFilter = ({ startDate, endDate, minRevenue, maxRevenue, minNetIncome, maxNetIncome }) => {

        if (startDate !== "" && endDate !== "") {
            const startYear = parseInt(startDate, 10);
            const endYear = parseInt(endDate, 10);
            const newData = data.filter((obj) => {
                const objYear = parseInt(obj.date.split('-')[0], 10); // Extract year from date
                return objYear >= startYear && objYear <= endYear;
            });

            setData(newData);
        }

        if (minRevenue !== "" && maxRevenue !== "") {

            const newData = data.filter((obj) => {
                const objRevenueFormatted = parseFloat(formatCurrency(obj.revenue));
                return objRevenueFormatted >= minRevenue && objRevenueFormatted <= maxRevenue;
            });

            console.log(newData);
            setData(newData);
        }

        if (minNetIncome !== "" && maxNetIncome !== "") {
            const newData = data.filter((obj) => {
                const objRevenueFormatted = parseFloat(formatCurrency(obj.netIncome));
                return objRevenueFormatted >= minNetIncome && objRevenueFormatted <= maxNetIncome;
            });

            console.log(newData);
            setData(newData);
        }
    };

    const applyNoFilters = async () => {
        fetchAAPLData();
    }

    const sortByDateAsc = () => {
        setData([...data].sort((a, b) => new Date(a.date) - new Date(b.date)));
    };

    const sortByDateDesc = () => {
        setData([...data].sort((a, b) => new Date(b.date) - new Date(a.date)));
    };

    const sortByNIAsc = () => {
        setData([...data].sort((a, b) => a.netIncome - b.netIncome));
    };

    const sortByNIDesc = () => {
        setData([...data].sort((a, b) => b.netIncome - a.netIncome));
    };

    const sortByRevAsc = () => {
        setData([...data].sort((a, b) => a.revenue - b.revenue));
    };

    const sortByRevDesc = () => {
        setData([...data].sort((a, b) => b.revenue - a.revenue));
    };


    return (
        <>



            <h1 className="text-center text-4xl font-bold my-8">
                Financial Data Filtering App
            </h1>

            <Filters onFilter={handleOnFilter} applyNoFilters={applyNoFilters} sortByDateAsc={sortByDateAsc} sortByDateDesc={sortByDateDesc} sortByNIAsc={sortByNIAsc} sortByNIDesc={sortByNIDesc} sortByRevAsc={sortByRevAsc} sortByRevDesc={sortByRevDesc} />
            <DataTable AAPLData={data} />
        </>
    );
};

export default FilteringPage;
