import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Syllabus = () => {
    const [syllabus, setSyllabus] = useState([]);
    const [loading, setLoading] = useState(true); // Step 1: Add loading state

    const getAllSyllabus = async () => {
        try {
            const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/syllabus`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSyllabus(data);
            }
        } catch (error) {
            console.log(`Error while fetching syllabus: ${error}`);
        } finally {
            setLoading(false); // Step 3: Update loading state
        }
    };

    useEffect(() => {
        getAllSyllabus();
    }, []);

    return (
        <div className="flex justify-center items-center h-auto min-h-[50vh] py-10">
            <div className="w-full md:w-[550px] text-center px-4">
                {loading ? ( // Step 2: Display loader while loading
                    <div className="flex justify-center items-center h-full">
                        <div className="loader"></div> {/* You can customize this loader */}
                    </div>
                ) : (
                    <table
                        border="1"
                        cellPadding="10"
                        style={{ width: '100%', borderCollapse: 'collapse' }}
                        className="break-words"
                    >
                        <thead>
                            <tr>
                                <th className="bg-orange-500 text-stone-800 text-xl md:text-3xl text-center p-3">
                                    Syllabus
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="grid">
                                {syllabus.map((syll) => (
                                    <NavLink to={`/syllabus/${syll.slug}`} key={syll._id}>
                                        <td className="hover:text-red-700 text-blue-700 border-lime-700 w-full flex flex-col md:flex-row justify-between items-start md:items-center p-3 hover:bg-slate-200 text-sm">
                                            <span className="font-medium">{syll.job_id.title}</span>
                                        </td>
                                    </NavLink>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Syllabus;
