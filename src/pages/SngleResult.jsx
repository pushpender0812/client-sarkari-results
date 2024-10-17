import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const SngleResult = () => {


    const {id} = useParams()

    const [result,setResult] = useState({})

    const getSingleresult = async () => {
        try {
            const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/single-result?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setResult(data);
            }
        } catch (error) {
            console.log(`Error while fetching Admit Card: ${error}`);
        }
    };


    useEffect(() => {
        getSingleresult();
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
        <h1 className="highlighted-title"><strong style={{color:'red'}}>Name of Post:</strong> {result.resultData?.result?.post_name}</h1>
        <p><strong style={{color:'red'}}>Post Date :</strong> {formatDate(result.resultData?.result?.createdAt)}</p>
        <p><strong style={{color:'red'}}>Update Date :</strong> {formatDate(result.resultData?.result?.updatedAt)}</p>
        <p><strong style={{color:'red'}}>Short Description of The Job :</strong> {result.resultData?.result?.job_description}</p>
    </div>

    <div className="table-grid-single-column">
        <div style={{ color: '#f39c12' }}>{result.resultData?.result?.table_title1}</div>
        <div style={{ color: '#e74c3c' }}>{result.resultData?.result?.table_title2}</div>
        <div style={{ color: '#2ecc71' }}>{result.resultData?.result?.table_title3}</div>
    </div>

    <div className="important-info-container">
        <div className="important-info-box">
            <div className="important-info">
                <h2>Important Dates</h2>
                <ul>
                    <li><strong>Application Begin:</strong> {result.resultData?.result?.application_begin}</li>
                    <li><strong>Last Date For Apply Online:</strong> {result.resultData?.result?.application_end}</li>
                    <li><strong>Last Date Pay Exam Fee:</strong> {result.resultData?.result?.pay_last_date}</li>
                    <li><strong>Correction/Modification Date:</strong> {result.resultData?.result?.correction_date}</li>
                    <li><strong>Exam Date:</strong> {result.resultData?.result?.exam_date}</li>
                    <li><strong>Admit card Available:</strong> {result.admitcardDta?.admit_card_date || 'Before Exam'}</li>
                    <li><strong>Result Available:</strong> {result.resultData?.result_date}</li>
                </ul>
            </div>
            <div className="vertical-line"></div>
            <div className="important-info">
                <h2>Application Fee</h2>
                <ul>
                    <li><strong>Fee 1:</strong> {result.resultData?.result?.exam_fees1}</li>
                    <li><strong>Fee 2:</strong> {result.resultData?.result?.exam_fees2}</li>
                    <li><strong>Fee 3:</strong> {result.resultData?.result?.exam_fees3}</li>
                    <li><strong>Description:</strong> {result.resultData?.result?.fees_description}</li>
                </ul>
            </div>
        </div>
    </div>

    <div className="age-limit-section">
        <h2>{result.resultData?.result?.age_limit_title}</h2>
        <ul>
            <li><strong>Minimum Age:</strong> {result.resultData?.result?.minimum_age}</li>
            <li><strong>Maximum Age:</strong> {result.resultData?.result?.maximum_age}</li>
            <li>{result.resultData?.result?.age_description}</li>
        </ul>
    </div>

    <div className="vacancy-details">
        <h2>{result.resultData?.result?.table_title3} : Vacancy Details (Total): {result.resultData?.result?.total_vacancy}</h2>
    </div>

    <div className="how-to-fill">
        <h2 className="how-to-fill-title">How to Fill {result.resultData?.result?.table_title2} Apply Online</h2>
        <ul>
            {splitContentToList(result.resultData?.result?.how_to_fill)}
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
                    <p>Download Result</p>
                    <a href={result.resultData?.result_link} className="button">Click Here</a>
                </td>
            </tr>
        <tr>
                <td>
                    <p>Download Admit Card</p>
                    <a href={result.admitcardDta?.admit_card_link} className="button">Click Here</a>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Apply Online</p>
                    <a href={result.resultData?.result?.apply_online_link} className="button">Click Here</a>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Download Notification</p>
                    <a href={result.resultData?.result?.download_notification_link} className="button">Click Here</a>
                </td>
            </tr>
            <tr>
                <td>
                    <p>Official Website</p>
                    <a href={result.resultData?.result?.official_website_link} className="button">Click Here</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>
  )
}

export default SngleResult
