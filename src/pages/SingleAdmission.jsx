import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleAdmission = () => {
  const { id } = useParams();
  const [admission, setAdmission] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  const getSingleAdmission = async () => {
    try {
      const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/single-admission?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAdmission(data);
        setLoading(false); // Set loading to false after data is fetched
      }
    } catch (error) {
      console.log(`Error while fetching job: ${error}`);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    getSingleAdmission();
  }, [id]);

  const splitContentToList = (content) => {
    if (content) {
      return content
        .split('.')
        .filter((item) => item.trim() !== '')
        .map((line, index) => <li key={index}>{line.trim()}.</li>);
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

  // Render a loader while data is fetching
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div> {/* Loader animation */}
        <p>Loading admission details...</p>
      </div>
    );
  }

  return (
    <div className="job-single-container">
      <div className="job-details">
        <h1 className="highlighted-title">
          <strong style={{ color: 'red' }}>Admission :</strong> {admission?.post_name}
        </h1>
        <p>
          <strong style={{ color: 'red' }}>Post Date :</strong> {formatDate(admission?.createdAt)}
        </p>
        <p>
          <strong style={{ color: 'red' }}>Update Date :</strong> {formatDate(admission?.updatedAt)}
        </p>
        <p>
          <strong style={{ color: 'red' }}>Short Description of The Admission :</strong> {admission?.job_description}
        </p>
      </div>

      <div className="table-grid-single-column">
        <div style={{ color: '#f39c12' }}>{admission?.table_title1}</div>
        <div style={{ color: '#e74c3c' }}>{admission?.table_title2}</div>
        <div style={{ color: '#2ecc71' }}>{admission?.table_title3}</div>
      </div>

      <div className="important-info-container">
        <div className="important-info-box">
          <div className="important-info">
            <h2>Important Dates</h2>
            <ul>
              <li><strong>Application Begin:</strong> {admission?.application_begin}</li>
              <li><strong>Last Date For Apply Online:</strong> {admission?.application_end}</li>
              <li><strong>Last Date Pay Exam Fee:</strong> {admission?.pay_last_date}</li>
              <li><strong>Correction/Modification Date:</strong> {admission?.correction_date}</li>
              <li><strong>Exam Date:</strong> {admission?.exam_date}</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="important-info">
            <h2>Application Fee</h2>
            <ul>
              <li><strong>Fee 1:</strong> {admission?.exam_fees1}</li>
              <li><strong>Fee 2:</strong> {admission?.exam_fees2}</li>
              <li><strong>Fee 3:</strong> {admission?.exam_fees3}</li>
              <li><strong>Description:</strong> {admission?.fees_description}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="age-limit-section">
        <h2>{admission?.age_limit_title}</h2>
        <ul>
          <li><strong>Minimum Age:</strong> {admission?.minimum_age}</li>
          <li><strong>Maximum Age:</strong> {admission?.maximum_age}</li>
          <li>{admission?.age_description}</li>
        </ul>
      </div>

      <div className="vacancy-details">
        <h2>{admission?.table_title3} : Vacancy Details (Total): {admission?.total_vacancy}</h2>
      </div>

      <div className="how-to-fill">
        <h2 className="how-to-fill-title">How to Fill {admission?.table_title2} Apply Online</h2>
        <ul>{splitContentToList(admission?.how_to_fill)}</ul>
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
              <a href={admission?.apply_online_link} className="button">Click Here</a>
            </td>
          </tr>
          <tr>
            <td>
              <p>Download Notification</p>
              <a href={admission?.download_notification_link} className="button">Click Here</a>
            </td>
          </tr>
          <tr>
            <td>
              <p>Official Website</p>
              <a href={admission?.official_website_link} className="button">Click Here</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleAdmission;
