import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleAdmit = () => {
  const { id } = useParams();
  const [admitcard, setAdmitcard] = useState({});
  const [loading, setLoading] = useState(true); // New loading state

  const getSingleAdmmitCard = async () => {
    try {
      const response = await fetch(
        `https://server-sarkari-exam-result-4.onrender.com/api/single-admitcard?id=${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setAdmitcard(data);
        setLoading(false); // Stop loading when data is fetched
      }
    } catch (error) {
      console.log(`Error while fetching Admit Card: ${error}`);
      setLoading(false); // Stop loading in case of error
    }
  };

  useEffect(() => {
    getSingleAdmmitCard();
  }, [id]);

  
  const formatDate = (dateString) => {
    if (!dateString) return ""; // if the date is not available
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
        <div className="loader-container">
          <div className="loader"></div>
          <p>Loading admit card details...</p>
        </div>
      ) : (
        <>
          <div className="job-details mb-10">
            <h1 className="text-lg md:text-xl">
              <strong>Name of Post:</strong>
              <span className="text-2xl md:text-3xl font-bold text-slate-500">
                {" "}
                {admitcard.job_id?.post_name}
              </span>
            </h1>
            <p className="mt-2">
              <strong>Post Date :</strong>{" "}
              {formatDate(admitcard.job_id?.createdAt)}
            </p>
            <p className="mt-2">
              <strong>Update Date :</strong>{" "}
              {formatDate(admitcard.job_id?.updatedAt)}
            </p>
            <p className="mt-2">
              <strong>Short Description of The Job :</strong>{" "}
              {admitcard.job_id?.job_description}
            </p>
          </div>

          <div className="m-5 md:m-10 text-stone-950 font-extrabold text-xl md:text-2xl">
            <strong>{admitcard.job_id?.table_title3.split(":")[0]}</strong>
            <span className="text-red-600">
              {admitcard.job_id?.table_title3.split(":")[1]}
            </span>
          </div>

          <div className="important-info-container grid-cols-1 md:grid-cols-2 gap-5 bg-orange-200 rounded-lg">
            <div className="important-info-box  md:pr-5 lg:border-r  bg-orange-200">
              <div className="important-info">
                <h2 className="text-xl md:text-2xl underline">
                  Important Dates
                </h2>
                <ul className="mt-4 text-left">
                  <li>
                    <strong>Application Begin:</strong>{" "}
                    {admitcard?.job_id?.application_begin}
                  </li>
                  <li>
                    <strong>Last Date For Apply Online:</strong>{" "}
                    {admitcard?.job_id?.application_end}
                  </li>
                  <li>
                    <strong>Last Date Pay Exam Fee:</strong>{" "}
                    {admitcard?.job_id?.pay_last_date}
                  </li>
                  <li>
                    <strong>Correction/Modification Date:</strong>{" "}
                    {admitcard?.job_id?.correction_date}
                  </li>
                  <li>
                    <strong>Exam Date:</strong> {admitcard?.job_id?.exam_date}
                  </li>
                  <li>
                    <strong>Admit card Available:</strong>{" "}
                    {admitcard?.admit_card_date}
                  </li>
                </ul>
              </div>
              <div className="vertical-line"></div>
              <div className="important-info pl-0 md:pl-5">
                <h2 className="text-xl md:text-2xl underline">
                  Application Fee
                </h2>
                <ul className="mt-4">
                  <li>
                    <strong>
                      {" "}
                      {admitcard?.job_id?.exam_fees1.split(".")[0]}
                    </strong>{" "}
                    {admitcard?.job_id?.exam_fees1.split(".")[1]}
                  </li>
                  <li>
                    <strong>
                      {admitcard?.job_id?.exam_fees2.split(".")[0]}
                    </strong>{" "}
                    {admitcard?.job_id?.exam_fees2.split(".")[1]}
                  </li>
                  <li>
                    <strong>
                      {admitcard?.job_id?.exam_fees3.split(".")[0]}
                    </strong>{" "}
                    {admitcard?.job_id?.exam_fees3.split(".")[1]}
                  </li>
                  <li>
                    <strong>Description:</strong>{" "}
                    {admitcard?.job_id?.fees_description}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="age-limit-section mt-10">
            <h2 className="font-bold text-lg md:text-2xl">
              <strong className="mr-2">
                {admitcard?.job_id?.age_limit_title.split(".")[1]}
              </strong>
              <span className="text-red-600 text-xl">
                {admitcard?.job_id?.age_limit_title.split(".")[0]}
              </span>
            </h2>
            <ul className="mt-4">
              <li className="text-left ml-5 md:ml-20">
                <strong>Minimum Age:</strong>
                <span className="text-lg md:text-2xl text-blue-800">
                  {admitcard?.job_id?.minimum_age}
                </span>{" "}
              </li>
              <li className="text-left ml-5 md:ml-20 mt-2">
                <strong>Maximum Age:</strong>{" "}
                <span className="text-lg md:text-2xl text-blue-800">
                  {" "}
                  {admitcard?.job_id?.maximum_age}
                </span>
              </li>

              <li className="text-left ml-5 md:ml-16 mt-4 text-base md:text-xl text-emerald-600">
                {admitcard?.job_id?.age_description
                  .split(".")
                  .map((abc, index) => (
                    <li key={index}>{abc}</li>
                  ))}
              </li>
            </ul>   
          </div>

          <div className="vacancy-details mt-10">
            <h2 className="text-red-600 font-extrabold text-lg md:text-xl mb-5">
              { admitcard?.job_id?.table_title2}
            </h2>
            <p className="text-xl md:text-2xl font-bold">
              Vacancy Details (Total):{" "}
              <span className="text-blue-600 text-lg md:text-3xl">
                { admitcard?.job_id?.total_vacancy}
              </span>
            </p>
          </div>     

          <div className="how-to-fill mt-10">
            <h2 className="text-lg md:text-2xl font-extrabold text-slate-600">
              How to Fill {admitcard?.job_id?.table_title2} Form
            </h2>
            <ul className="mt-5 list-none pl-0">
              {admitcard?.job_id?.how_to_fill.split(".").map((abc, index) => (
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
                  <p className="text-lg md:text-2xl font-bold text-pink-700">Download Admit Card</p>
                  <a href={admitcard?.admit_card_link} className="button hover:bg-red-500 text-lg md:text-xl">
                    Click Here
                  </a>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[245px] md:ml-48 mt-4">
                  <p className="text-lg md:text-2xl font-bold text-pink-700">Apply Online</p>
                  <a
                    href={admitcard?.job_id?.apply_online_link}
                    className="button hover:bg-red-500 text-lg md:text-xl"
                  >
                    Click Here
                  </a>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[245px] md:ml-48 mt-4">
                  <p className="text-lg md:text-2xl font-bold text-pink-700">Download Notification</p>
                  <a
                    href={admitcard?.job_id?.download_notification_link}
                    className="button hover:bg-red-500 text-lg md:text-xl"
                  >
                    Click Here
                  </a>
                </td>
              </tr>
              <tr>
                <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[245px] md:ml-48 mt-4">
                  <p className="text-lg md:text-2xl font-bold text-pink-700">Official Website</p>
                  <a
                    href={admitcard?.job_id?.official_website_link}
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

export default SingleAdmit;
