import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Admission = () => {
  const [admission, setAdmission] = useState([]);

  const getAllAdmission = async () => {
    try {
      const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/admission`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdmission(data);
      }
    } catch (error) {
      console.log(`Error While fetching jobs ${error}`);
    }
  };

  useEffect(() => {
    getAllAdmission();
  }, []);

  return (
    <div className="flex justify-center items-center h-auto min-h-[50vh] py-10">
      <div className="w-full md:w-[550px] text-center px-4">
        <table
          border="1"
          cellPadding="10"
          style={{ width: '100%', borderCollapse: 'collapse' }}
          className="break-words"
        >
          <thead>
            <tr>
              <th className="bg-orange-500 text-stone-800 text-xl md:text-3xl text-center p-3">
                Admissions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="grid">
              {admission.map((admis) => (
                <NavLink to={`/admission/${admis.slug}`} key={admis._id}>
                  <td className="hover:text-red-700 text-blue-700 border-lime-700 w-full flex flex-col md:flex-row justify-between items-start md:items-center p-3 hover:bg-slate-200 text-sm">
                    <span className="font-medium">{admis.title}</span>
                  </td>
                </NavLink>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admission;
