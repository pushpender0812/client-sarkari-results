import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Spin = () => {
    const [spin, setSpin] = useState([]);
    const [loading, setLoading] = useState(true); // Step 1: Add loading state

    const getSpinSaved = async () => {
        try {
            const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/get-spin`, {
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
        } finally {
            setLoading(false); // Step 3: Update loading state
        }
    };

    useEffect(() => {
        getSpinSaved();
    }, []);

    return (
        <div className="flex-1">
            {loading ? ( // Step 2: Display loader while loading
                <div className="flex justify-center items-center h-full">
                    <div className="loader"></div> {/* You can customize this loader */}
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default Spin;
