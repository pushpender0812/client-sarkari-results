import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Results = () => {
  const [results, setResults] = useState([]);
  const { pathname } = useLocation();

  const getAllResults = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get-allresults`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      }
    } catch (error) {
      console.log(`Error while fetching results ${error}`);
    }
  };

  useEffect(() => {
    getAllResults();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table
        border="1"
        cellPadding="10"
        style={{ width: '100%', borderCollapse: 'collapse' }}
        className="break-words text-sm md:text-lg"
      >
        <thead>
          <tr>
            <th className={`bg-orange-500 text-stone-800 ${pathname === '/' ? 'text-base md:text-lg' : 'text-xl md:text-3xl'} text-center p-3`}>
              Results
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((res) => (
            <tr key={res._id}>
              <NavLink to={`/result/${res.slug}`}>
                <td className={`hover:text-red-700 text-blue-700 border-lime-700 w-full flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-slate-200 ${pathname === '/' ? 'text-xs md:text-sm' : ''}`}>
                  <span className="font-medium">{res.result.title}</span>
                  {pathname === '/results' && (
                    <p className="text-gray-800 ml-0 md:ml-4 text-xs flex-grow">
                      Declared On: {res.formatted_result_date}
                    </p>
                  )}
                </td>
              </NavLink>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
