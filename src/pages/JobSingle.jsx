import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobSingle.css';

const JobSingle = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state

    const getSinglePost = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/single-job?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setJob(data);
            }
        } catch (error) {
            console.log(`Error while fetching job: ${error}`);
        }
        setLoading(false); // End loading
    };

    useEffect(() => {
        getSinglePost();
    }, [id]);

    // Function to split content by newlines or periods
    const splitContentToList = (content) => {
        if (content) {
            return content.split('.').filter(item => item.trim() !== '').map((line, index) => (
                <li key={index}>{line.trim()}.</li>
            ));
        }
        return [];
    };

    const formatDate = (dateString) => {
        if (!dateString) return ''; // if the date is not available
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="job-single-container">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    {/* Spinner for loading */}
                    <div className="loader-container">
                        <svg
                            className="animate-spin h-10 w-10 text-orange-500"
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
                        <p className="text-xl mt-3">Loading...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="job-details">
                        <h1 className="highlighted-title"><strong style={{color:'red'}}>Name of Post:</strong> {job?.post_name}</h1>
                        <p><strong style={{color:'red'}}>Post Date :</strong> {formatDate(job?.createdAt)}</p>
                        <p><strong style={{color:'red'}}>Update Date :</strong> {formatDate(job?.updatedAt)}</p>
                        <p><strong style={{color:'red'}}>Short Description of The Job :</strong> {job?.job_description}</p>
                    </div>

                    <div className="table-grid-single-column">
                        <div style={{ color: '#f39c12' }}>{job?.table_title1}</div>
                        <div style={{ color: '#e74c3c' }}>{job?.table_title2}</div>
                        <div style={{ color: '#2ecc71' }}>{job?.table_title3}</div>
                    </div>

                    <div className="important-info-container">
                        <div className="important-info-box">
                            <div className="important-info">
                                <h2>Important Dates</h2>
                                <ul>
                                    <li><strong>Application Begin:</strong> {job?.application_begin}</li>
                                    <li><strong>Last Date For Apply Online:</strong> {job?.application_end}</li>
                                    <li><strong>Last Date Pay Exam Fee:</strong> {job?.pay_last_date}</li>
                                    <li><strong>Correction/Modification Date:</strong> {job?.correction_date}</li>
                                    <li><strong>Exam Date:</strong> {job?.exam_date}</li>
                                </ul>
                            </div>
                            <div className="vertical-line"></div>
                            <div className="important-info">
                                <h2>Application Fee</h2>
                                <ul>
                                    <li><strong>Fee 1:</strong> {job?.exam_fees1}</li>
                                    <li><strong>Fee 2:</strong> {job?.exam_fees2}</li>
                                    <li><strong>Fee 3:</strong> {job?.exam_fees3}</li>
                                    <li><strong>Description:</strong> {job?.fees_description}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="age-limit-section">
                        <h2>{job?.age_limit_title}</h2>
                        <ul>
                            <li><strong>Minimum Age:</strong> {job?.minimum_age}</li>
                            <li><strong>Maximum Age:</strong> {job?.maximum_age}</li>
                            <li>{job?.age_description}</li>
                        </ul>
                    </div>

                    <div className="vacancy-details">
                        <h2>{job?.table_title3} : Vacancy Details (Total): {job?.total_vacancy}</h2>
                    </div>

                    <div className="how-to-fill">
                        <h2 className="how-to-fill-title">How to Fill {job?.table_title2} Apply Online</h2>
                        <ul>
                            {splitContentToList(job?.how_to_fill)}
                        </ul>
                    </div>

                    <table className="links-table">
                        <thead>
                            <tr>
                                <th>Some Useful Important Links</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p>Apply Online</p>
                                    <a href={job?.apply_online_link} className="button">Click Here</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Download Notification</p>
                                    <a href={job?.download_notification_link} className="button">Click Here</a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>Official Website</p>
                                    <a href={job?.official_website_link} className="button">Click Here</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default JobSingle;
