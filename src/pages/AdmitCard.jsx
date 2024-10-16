import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const AdmitCard = () => {
  const [admitcards, setAdmitcards] = useState([]);
  const { pathname } = useLocation();

  const getAllAdmitCards = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/get-admitcards`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdmitcards(data);
      }
    } catch (error) {
      console.log(`Error while fetching admit cards ${error}`);
    }
  };

  useEffect(() => {
    getAllAdmitCards();
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
              Admit Cards
            </th>
          </tr>
        </thead>
        <tbody>
          {admitcards.map((admit) => (
            <tr key={admit._id}>
              <NavLink to={`/admit-card/${admit.slug}`}>
                <td className={`hover:text-red-700 text-blue-700 border-lime-700 w-full flex flex-col md:flex-row justify-between items-start md:items-center p-2 hover:bg-slate-200 ${pathname === '/' ? 'text-xs md:text-sm' : ''}`}>
                  <span className="font-medium">{admit.job_id.title}</span>
                  {/* Add any other information like dates, if available */}
                </td>
              </NavLink>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdmitCard;
