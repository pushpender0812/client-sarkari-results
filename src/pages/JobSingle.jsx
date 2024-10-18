import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./JobSingle.css";

const JobSingle = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);

  const getSinglePost = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://server-sarkari-exam-result-4.onrender.com/api/single-job?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setJob(data);
      }
    } catch (error) {
      console.log(`Error while fetching job: ${error}`);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSinglePost();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="job-single-container px-4 md:px-10">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
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
          <div className="job-details mb-10">
            <h1 className="text-lg md:text-xl">
              <strong>Name of Post:</strong>{" "}
              <span className="text-2xl md:text-3xl font-bold text-slate-500">
                {job?.post_name}
              </span>
            </h1>
            <p className="mt-2">
              <strong>Post Date:</strong> {formatDate(job?.createdAt)}
            </p>
            <p className="mt-2">
              <strong>Update Date:</strong> {formatDate(job?.updatedAt)}
            </p>
            <p className="mt-2">    
              <strong>Short Description of The Job:</strong>{" "}
              {job?.job_description}
            </p>
          </div>

          <div className="m-5 md:m-10 text-stone-950 font-extrabold text-xl md:text-2xl">
            <strong>{job?.table_title3.split(":")[0]}</strong>
            <span className="text-red-600">
              {job?.table_title3.split(":")[1]}
            </span>
          </div>

          {/* Responsive grid with line for larger screens */}
          <div className="important-info-container grid grid-cols-1 md:grid-cols-2 gap-5 bg-orange-200 rounded-lg">
            <div className="important-info md:ml-48  md:pr-5 lg:border-r border-gray-400">
              <h2 className="text-xl md:text-2xl underline">Important Dates</h2>
              <ul className="mt-4 text-left">
                <li>
                  <strong>Application Begin:</strong> {job?.application_begin}
                </li>
                <li>
                  <strong>Last Date For Apply Online:</strong>{" "}
                  {job?.application_end}
                </li>
                <li>
                  <strong>Last Date Pay Exam Fee:</strong> {job?.pay_last_date}
                </li>
                <li>
                  <strong>Correction/Modification Date:</strong>{" "}
                  {job?.correction_date}
                </li>
                <li>
                  <strong>Exam Date:</strong> {job?.exam_date}
                </li>
              </ul>
            </div>
            <div className="important-info pl-0 md:pl-5">
              <h2 className="text-xl md:text-2xl underline">Application Fee</h2>
              <ul className="mt-4">
                <li>    
                  <strong>{job?.exam_fees1?.split(":")[0]}:</strong>{" "}
                  {job?.exam_fees1?.split(":")[1]}
                </li>
                <li>
                  <strong>{job?.exam_fees2?.split(":")[0]}:</strong>{" "}
                  {job?.exam_fees2?.split(":")[1]}
                </li>
                <li>
                  <strong>{job?.exam_fees3?.split(":")[0]}:</strong>{" "}
                  {job?.exam_fees3?.split(":")[1]}
                </li>
                <li>
                  <strong>Description:</strong> {job?.fees_description}
                </li>
              </ul>
            </div>
          </div>

          <div className="age-limit-section mt-10">
            <h2 className="font-bold text-lg md:text-2xl">
              <strong className="mr-2">
                {job?.age_limit_title.split(":")[1]} :
              </strong>
              <span className="text-red-600 text-xl">
                {job?.age_limit_title.split(":")[0]}
              </span>
            </h2>
            <ul className="mt-4">
              <li className="text-left ml-5 md:ml-20">
                <strong>Minimum Age:</strong>
                <span className="text-lg md:text-2xl text-blue-800">
                  {" "}
                  {job?.minimum_age}
                </span>
              </li>
              <li className="text-left ml-5 md:ml-20 mt-2">
                <strong>Maximum Age:</strong>
                <span className="text-lg md:text-2xl text-blue-800">
                  {" "}
                  {job?.maximum_age}
                </span>
              </li>
              <li className="text-left ml-5 md:ml-16 mt-4 text-base md:text-xl text-emerald-600">
                {job?.age_description.split(".").map((abc, index) => (
                  <li key={index}>{abc}</li>
                ))}
              </li>
            </ul>
          </div>

          <div className="vacancy-details mt-10">
            <h2 className="text-red-600 font-extrabold text-lg md:text-xl mb-5">
              {job?.table_title2}
            </h2>
            <p className="text-xl md:text-2xl font-bold">
              Vacancy Details (Total):{" "}
              <span className="text-blue-600 text-lg md:text-3xl">
                {job?.total_vacancy}
              </span>
            </p>
          </div>

          <div className="how-to-fill mt-10">
            <h2 className="text-lg md:text-2xl font-extrabold text-slate-600">
              How to Fill {job?.table_title2} Form
            </h2>
            <ul className="mt-5 list-none pl-0">
              {job?.how_to_fill.split(".").map((abc, index) => (
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
                <th className="text-yellow-950 text-xl md:text-2xl font-extrabold">
                  Some Useful Important Links
                </th>   
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
                  <p className="text-lg md:text-2xl font-bold text-pink-700">
                    Apply Online
                  </p>
                  <a
                    href={job?.apply_online_link}
                    className="button hover:bg-red-500 text-lg md:text-xl"
                  >
                    Click Here
                  </a>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[245px] md:ml-48 mt-4">
                  <p className="text-lg md:text-2xl font-bold text-pink-700">
                    Download Notification
                  </p>
                  <a
                    href={job?.download_notification_link}
                    className="button hover:bg-red-500 text-lg md:text-xl"
                  >
                    Click Here
                  </a>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[245px] md:ml-48 mt-4">
                  <p className="text-lg md:text-2xl font-bold text-pink-700">
                    Official Website
                  </p>
                  <a
                    href={job?.official_website_link}
                    className="button hover:bg-red-500 text-lg md:text-xl"
                  >
                    Click Here
                  </a>
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
