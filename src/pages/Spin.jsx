import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Spin = () => {
    const [spin, setSpin] = useState([]);

    const getSpinSaved = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/get-spin`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSpin(data);
            }
        } catch (error) {
            console.log(`Error while fetching Admit Card: ${error}`);
        }
    };

    useEffect(() => {
        getSpinSaved();
    }, []);

   
    

    return (
        <div className="flex-1">
            <div className="grid grid-cols-3 gap-4">
                {spin.map((spn) => (
                    <NavLink to={`/job/${spn.job_id.slug}`} key={spn.job_id} className="text-black relative">
                        <marquee behavior="alternate" direction="right" className="flex items-center">
                            {/* Marquee Text with badge */}
                            <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
                                {spn.spin_title}
                            </span>
                            {/* Badge attached to the right of text */}
                            <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                new
                            </span>
                        </marquee>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Spin;
