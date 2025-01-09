const DataTable = ({ AAPLData }) => {
    const formatCurrency = (value) => {
        return (value / 1_000_000_000).toFixed(2) + " B USD";
      };
    return (
      <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Revenue</th>
                <th scope="col" className="px-6 py-3">Net Income</th>
                <th scope="col" className="px-6 py-3">Gross Profit</th>
                <th scope="col" className="px-6 py-3">EPS</th>
                <th scope="col" className="px-6 py-3">Operating Income</th>
              </tr>
            </thead>
            <tbody>
              {AAPLData.map((data, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4">{data.date}</td>
                  <td className="px-6 py-4">{data.revenue}({formatCurrency(data.revenue)})</td>
                  <td className="px-6 py-4">{data.netIncome}({formatCurrency(data.netIncome)})</td>
                  <td className="px-6 py-4">{data.grossProfit}({formatCurrency(data.grossProfit)})</td>
                  <td className="px-6 py-4">{data.eps}</td>
                  <td className="px-6 py-4">{data.operatingIncome}({formatCurrency(data.operatingIncome)})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };
  
  export default DataTable;
  