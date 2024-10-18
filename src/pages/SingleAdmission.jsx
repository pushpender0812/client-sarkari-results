import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SingleAdmission = () => {
  const { id } = useParams();
  const [admission, setAdmission] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  const getSingleAdmission = async () => {
    try {
      const response = await fetch(`https://server-sarkari-exam-result-4.onrender.com/api/single-admission?id=${id}`, {
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
    <div className="job-single-container px-4 md:px-10">
      <div className="job-details mb-10">
        <h1 className="text-lg md:text-xl">
          <strong >Admission :</strong> {admission?.post_name}
        </h1>
        <p className="mt-2">
          <strong >Post Date :</strong> {formatDate(admission?.createdAt)}
        </p>
        <p className="mt-2">
          <strong >Update Date :</strong> {formatDate(admission?.updatedAt)}
        </p>
        <p className="mt-2">
          <strong >Short Description of The Admission :</strong> {admission?.job_description}
        </p>
      </div>

      <div className="m-5 md:m-10 text-stone-950 font-extrabold text-xl md:text-2xl">
            <strong>{admission?.table_title3.split(":")[0]}</strong>
            <span className="text-red-600">
              {admission?.table_title3.split(":")[1]}
            </span>
          </div>

      <div className="important-info-container grid grid-cols-1 md:grid-cols-2 gap-5  rounded-lg">
        <div className="important-info-box bg-orange-200 w-[1200px]">
          <div className="important-info md:ml-48  md:pr-5 lg:border-r border-gray-400">
            <h2 className="text-xl md:text-2xl underline">Important Dates</h2>
            <ul className="mt-4 text-left">
              <li><strong>Application Begin:</strong> {admission?.application_begin}</li>
              <li><strong>Last Date For Apply Online:</strong> {admission?.application_end}</li>
              <li><strong>Last Date Pay Exam Fee:</strong> {admission?.pay_last_date}</li>
              <li><strong>Correction/Modification Date:</strong> {admission?.correction_date}</li>
              <li><strong>Exam Date:</strong> {admission?.exam_date}</li>
            </ul>
          </div>
          <div className="vertical-line"></div>
          <div className="important-info pl-0 md:pl-5">
            <h2 className="text-xl md:text-2xl underline">Application Fee</h2>
            <ul className="mt-4">
              <li><strong>{admission?.exam_fees1.split('.')[0]}</strong> {admission?.exam_fees1.split('.')[1]}</li>
              <li><strong>{admission?.exam_fees2.split('.')[0]}</strong> {admission?.exam_fees2.split('.')[1]}</li>
              <li><strong>{admission?.exam_fees3.split('.')[0]}</strong> {admission?.exam_fees3.split('.')[1]}</li>
              <li><strong>Description:</strong> {admission?.fees_description}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="age-limit-section mt-10">
            <h2 className="font-bold text-lg md:text-2xl">
              <strong className="mr-2">
                {admission?.age_limit_title.split(":")[1]} :
              </strong>
              <span className="text-red-600 text-xl">
                {admission?.age_limit_title.split(":")[0]}
              </span>
            </h2>
            <ul className="mt-4">
              <li className="text-left ml-5 md:ml-20">
                <strong>Minimum Age:</strong>
                <span className="text-lg md:text-2xl text-blue-800">
                  {" "}
                  {admission?.minimum_age}
                </span>
              </li>
              <li className="text-left ml-5 md:ml-20 mt-2">
                <strong>Maximum Age:</strong>
                <span className="text-lg md:text-2xl text-blue-800">
                  {" "}
                  {admission?.maximum_age}
                </span>
              </li>
              <li className="text-left ml-5 md:ml-16 mt-4 text-base md:text-xl text-emerald-600">
                {admission?.age_description.split(".").map((abc, index) => (
                  <li key={index}>{abc}</li>
                ))}
              </li>
            </ul>
          </div>

          <div className="vacancy-details mt-10">
            <h2 className="text-red-600 font-extrabold text-lg md:text-xl mb-5">
              {admission?.table_title2}
            </h2>
            <p className="text-xl md:text-2xl font-bold">
              Vacancy Details (Total):{" "}
              <span className="text-blue-600 text-lg md:text-3xl">
                {admission?.total_vacancy}
              </span>
            </p>
          </div>


          <div className="how-to-fill mt-10">
            <h2 className="text-lg md:text-2xl font-extrabold text-slate-600">
              How to Fill {admission?.table_title2} Form
            </h2>
            <ul className="mt-5 list-none pl-0">
              {admission?.how_to_fill.split(".").map((abc, index) => (
                <li
                  key={index}
                  className="pl-5 relative before:content-['•'] before:absolute before:left-0 before:top-0 text-left"
                >
                  {abc.trim()}.
                </li>
              ))}
            </ul>
          </div>

      <table className="links-table w-full mt-10">
        <thead>
          <tr>
            <th className="text-yellow-950 text-xl md:text-2xl font-extrabold">Some Useful Important Links</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
              <p className="text-lg md:text-2xl font-bold text-pink-700">Apply Online</p>
              <a href={admission?.apply_online_link} className="button hover:bg-red-500 text-lg md:text-xl">Click Here</a>
            </td>
          </tr>
          <tr>
            <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
              <p className="text-lg md:text-2xl font-bold text-pink-700">Download Notification</p>
              <a href={admission?.download_notification_link} className="button hover:bg-red-500 text-lg md:text-xl">Click Here</a>
            </td>
          </tr>
          <tr>
            <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
              <p className="text-lg md:text-2xl font-bold text-pink-700">Official Website</p>
              <a href={admission?.official_website_link} className="button hover:bg-red-500 text-lg md:text-xl">Click Here</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleAdmission;
