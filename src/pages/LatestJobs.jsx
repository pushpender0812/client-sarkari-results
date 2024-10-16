import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { pathname } = useLocation();

  const getAllJobs = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get-alljobs`, {
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
  };

  useEffect(() => {
    getAllJobs();
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
    </div>
  );
};

export default LatestJobs;
