import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleAnswer = () => {
    const { id } = useParams();
    const [answer, setAnswer] = useState({});
    const [loading, setLoading] = useState(true); // Step 1: Loading state

    const getSingleAnswerKey = async () => {
        try {
            const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/single-answerkey?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setAnswer(data);
            }
        } catch (error) {
            console.log(`Error while fetching Answer Key: ${error}`);
        } finally {
            setLoading(false); // Step 3: Update loading state
        }
    };

    useEffect(() => {
        getSingleAnswerKey();
    }, [id]);

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

    console.log(answer, 'hfjhjh');

    // Step 2: Conditional rendering for loading state
    if (loading) {
        return (
            <div className="loader">Loading...</div> // You can replace this with a spinner or any other loader
        );
    }

    return (
        <>
            <div className="job-single-container">
                <div className="job-details">
                    <h1 className="highlighted-title"><strong style={{ color: 'red' }}>Name of Post:</strong> {answer.answerData?.job_id?.post_name}</h1>
                    <p><strong style={{ color: 'red' }}>Post Date :</strong> {formatDate(answer.answerData?.job_id?.createdAt)}</p>
                    <p><strong style={{ color: 'red' }}>Update Date :</strong> {formatDate(answer.answerData?.job_id?.updatedAt)}</p>
                    <p><strong style={{ color: 'red' }}>Short Description of The Job :</strong> {answer.answerData?.job_id?.job_description}</p>
                </div>

                <div className="table-grid-single-column">
                    <div style={{ color: '#f39c12' }}>{answer.answerData?.job_id?.table_title1}</div>
                    <div style={{ color: '#e74c3c' }}>{answer.answerData?.job_id?.table_title2}</div>
                    <div style={{ color: '#2ecc71' }}>{answer.answerData?.job_id?.table_title3}</div>
                </div>

                <div className="important-info-container">
                    <div className="important-info-box">
                        <div className="important-info">
                            <h2>Important Dates</h2>
                            <ul>
                                <li><strong>Application Begin:</strong> {answer.answerData?.job_id?.application_begin}</li>
                                <li><strong>Last Date For Apply Online:</strong> {answer.answerData?.job_id?.application_end}</li>
                                <li><strong>Last Date Pay Exam Fee:</strong> {answer.answerData?.job_id?.pay_last_date}</li>
                                <li><strong>Correction/Modification Date:</strong> {answer.answerData?.job_id?.correction_date}</li>
                                <li><strong>Exam Date:</strong> {answer.answerData?.job_id?.exam_date}</li>
                                <li><strong>Admit card Available:</strong> {answer.admitcardDta?.admit_card_date || 'Before Exam'}</li>
                                <li><strong>Answer Key Available:</strong> {answer.answerData?.answer_key_date}</li>
                            </ul>
                        </div>
                        <div className="vertical-line"></div>
                        <div className="important-info">
                            <h2>Application Fee</h2>
                            <ul>
                                <li><strong>Fee 1:</strong> {answer.answerData?.job_id?.exam_fees1}</li>
                                <li><strong>Fee 2:</strong> {answer.answerData?.job_id?.exam_fees2}</li>
                                <li><strong>Fee 3:</strong> {answer.answerData?.job_id?.exam_fees3}</li>
                                <li><strong>Description:</strong> {answer.answerData?.job_id?.fees_description}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="age-limit-section">
                    <h2>{answer.answerData?.job_id?.age_limit_title}</h2>
                    <ul>
                        <li><strong>Minimum Age:</strong> {answer.answerData?.job_id?.minimum_age}</li>
                        <li><strong>Maximum Age:</strong> {answer.answerData?.job_id?.maximum_age}</li>
                        <li>{answer.answerData?.job_id?.age_description}</li>
                    </ul>
                </div>

                <div className="vacancy-details">
                    <h2>{answer.answerData?.job_id?.table_title3} : Vacancy Details (Total): {answer.answerData?.job_id?.total_vacancy}</h2>
                </div>

                <div className="how-to-fill">
                    <h2 className="how-to-fill-title">How to Fill {answer.answerData?.job_id?.table_title2} Apply Online</h2>
                    <ul>
                        {splitContentToList(answer.answerData?.job_id?.how_to_fill)}
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
                                <p>Download Answer Key</p>
                                <a href={answer.answerData?.answer_key_link} className="button">Click Here</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Download Admit Card</p>
                                <a href={answer.admitcardDta?.admit_card_link} className="button">Click Here</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Apply Online</p>
                                <a href={answer.answerData?.job_id?.apply_online_link} className="button">Click Here</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Download Notification</p>
                                <a href={answer.answerData?.job_id?.download_notification_link} className="button">Click Here</a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Official Website</p>
                                <a href={answer.answerData?.job_id?.official_website_link} className="button">Click Here</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SingleAnswer;
