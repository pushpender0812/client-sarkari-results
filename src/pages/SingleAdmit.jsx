import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SingleAdmit = () => {



    const {id} = useParams()

    const [admitcard,setAdmitcard] = useState({})

    const getSingleAdmmitCard = async () => {
        try {
            const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/single-admitcard?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setAdmitcard(data);
            }
        } catch (error) {
            console.log(`Error while fetching Admit Card: ${error}`);
        }
    };


    useEffect(() => {
        getSingleAdmmitCard();
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



  return (
    <div className="job-single-container">
            <div className="job-details">
                <h1 className="highlighted-title"><strong style={{color:'red'}}>Name of Post:</strong> {admitcard.job_id?.post_name}</h1>
                <p><strong style={{color:'red'}}>Post Date :</strong> {formatDate(admitcard.job_id?.createdAt)}</p>
                <p><strong style={{color:'red'}}>Update Date :</strong> {formatDate(admitcard.job_id?.updatedAt)}</p>
                <p><strong style={{color:'red'}}>Short Description of The Job :</strong> {admitcard.job_id?.job_description}</p>
            </div>

            <div className="table-grid-single-column">
                <div style={{ color: '#f39c12' }}>{admitcard.job_id?.table_title1}</div>
                <div style={{ color: '#e74c3c' }}>{admitcard.job_id?.table_title2}</div>
                <div style={{ color: '#2ecc71' }}>{admitcard.job_id?.table_title3}</div>
            </div>

            <div className="important-info-container">
                <div className="important-info-box">
                    <div className="important-info">
                        <h2>Important Dates</h2>
                        <ul>
                            <li><strong>Application Begin:</strong> {admitcard?.job_id?.application_begin}</li>
                            <li><strong>Last Date For Apply Online:</strong> {admitcard?.job_id?.application_end}</li>
                            <li><strong>Last Date Pay Exam Fee:</strong> {admitcard?.job_id?.pay_last_date}</li>
                            <li><strong>Correction/Modification Date:</strong> {admitcard?.job_id?.correction_date}</li>
                            <li><strong>Exam Date:</strong> {admitcard?.job_id?.exam_date}</li>
                            <li><strong>Admit card Available:</strong> {admitcard?.admit_card_date}</li>
                        </ul>
                    </div>
                    <div className="vertical-line"></div>
                    <div className="important-info">
                        <h2>Application Fee</h2>
                        <ul>
                            <li><strong>Fee 1:</strong> {admitcard?.job_id?.exam_fees1}</li>
                            <li><strong>Fee 2:</strong> {admitcard?.job_id?.exam_fees2}</li>
                            <li><strong>Fee 3:</strong> {admitcard?.job_id?.exam_fees3}</li>
                            <li><strong>Description:</strong> {admitcard?.job_id?.fees_description}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="age-limit-section">
                <h2>{admitcard?.job_id?.age_limit_title}</h2>
                <ul>
                    <li><strong>Minimum Age:</strong> {admitcard?.job_id?.minimum_age}</li>
                    <li><strong>Maximum Age:</strong> {admitcard?.job_id?.maximum_age}</li>
                    <li>{admitcard?.job_id?.age_description}</li>
                </ul>
            </div>

            <div className="vacancy-details">
                <h2>{admitcard?.job_id?.table_title3} : Vacancy Details (Total): {admitcard?.job_id?.total_vacancy}</h2>
            </div>

            <div className="how-to-fill">
                <h2 className="how-to-fill-title">How to Fill {admitcard?.job_id?.table_title2} Apply Online</h2>
                <ul>
                    {splitContentToList(admitcard?.job_id?.how_to_fill)}
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
                            <p>Download Admit Card</p>
                            <a href={admitcard?.admit_card_link} className="button">Click Here</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Apply Online</p>
                            <a href={admitcard?.job_id?.apply_online_link} className="button">Click Here</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Download Notification</p>
                            <a href={admitcard?.job_id?.download_notification_link} className="button">Click Here</a>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <p>Official Website</p>
                            <a href={admitcard?.job_id?.official_website_link} className="button">Click Here</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
  )
}

export default SingleAdmit
