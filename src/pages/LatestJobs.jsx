import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const { pathname } = useLocation();

  const getAllJobs = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/get-alljobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.log(`Error while fetching jobs ${error}`);
    }
    setLoading(false); // End loading
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <div className="flex justify-center items-center p-5">
          {/* Spinner icon */}
          <svg
            className="animate-spin h-8 w-8 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z"
            ></path>
          </svg>
          <p className="text-xl ml-3">Loading...</p>
        </div>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{ width: '100%', borderCollapse: 'collapse' }}
          className="break-words text-sm md:text-lg"
        >
          <thead>
            <tr>
              <th className={`bg-orange-500 text-stone-800 ${pathname === '/' ? 'text-base md:text-lg' : 'text-xl md:text-3xl'} text-center p-3`}>
                Latest Jobs
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <NavLink to={`/job/${job.slug}`}>
                  <td className={`hover:text-red-700 text-blue-700 border-lime-700 w-full flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-slate-200 ${pathname === '/' ? 'text-xs md:text-sm' : ''}`}>
                    <span className="font-medium">{job.title}</span>
                    {pathname === '/latestjob' && (
                      <p className="text-gray-800 md:ml-0 ml-0 md:mr-0 text-xs">
                        Last Date: {job.formatted_last_date}
                      </p>
                    )}
                  </td>
                </NavLink>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LatestJobs;
