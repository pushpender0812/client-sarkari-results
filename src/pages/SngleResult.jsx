import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SngleResult = () => {
    const { id } = useParams();
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(true); // Loading state

    const getSingleresult = async () => {
        setLoading(true); // Set loading to true when fetching starts
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
        } finally {
            setLoading(false); // Set loading to false when fetching ends
        }
    };

    useEffect(() => {
        getSingleresult();
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

    if (loading) {
        return (
            <div className="loader">
                {/* You can customize the loader style or use a spinner component */}
                {/* <h2>Loading...</h2> */}
            </div>
        );
    }

    return (
        <div className="job-single-container px-4 md:px-10">
            <div className="job-details mb-10">
                <h1 className="text-lg md:text-xl"><strong >Name of Post:</strong> <span className="text-2xl md:text-3xl font-bold text-slate-500">{result.resultData?.result?.post_name}</span></h1>
                <p className="mt-2"><strong >Post Date :</strong> {formatDate(result.resultData?.result?.createdAt)}</p>
                <p className="mt-2"><strong >Update Date :</strong> {formatDate(result.resultData?.result?.updatedAt)}</p>
                <p className="mt-2"><strong >Short Description of The Job :</strong> {result.resultData?.result?.job_description}</p>
            </div>

            <div className="m-5 md:m-10 text-stone-950 font-extrabold text-xl md:text-2xl">
            <strong>{result.resultData?.result?.table_title3.split(":")[0]}</strong>
            <span className="text-red-600">
              {result.resultData?.result?.table_title3.split(":")[1]}
            </span>
          </div>

          <div className="important-info-container grid grid-cols-1 md:grid-cols-2 gap-5  rounded-lg p-5">
    <div className="important-info-box flex flex-col md:ml-24 bg-orange-200 md:flex-row w-[800px]">
        {/* Important Dates Section */}
        <div className="important-info md:pr-5 border-b md:border-b-0 md:border-r border-gray-400 md:w-1/2">
            <h2 className="text-xl md:text-2xl underline mb-4 text-center md:text-left">Important Dates</h2>
            <ul className="space-y-3">
                <li><strong>Application Begin:</strong> {result.resultData?.result?.application_begin}</li>
                <li><strong>Last Date For Apply Online:</strong> {result.resultData?.result?.application_end}</li>
                <li><strong>Last Date Pay Exam Fee:</strong> {result.resultData?.result?.pay_last_date}</li>
                <li><strong>Correction/Modification Date:</strong> {result.resultData?.result?.correction_date}</li>
                <li><strong>Exam Date:</strong> {result.resultData?.result?.exam_date}</li>
                <li><strong>Admit card Available:</strong> {result.admitcardDta?.admit_card_date || 'Before Exam'}</li>
                <li><strong>Result Available:</strong> {result.resultData?.result_date}</li>
            </ul>
        </div>

        {/* Application Fee Section */}
        <div className="important-info pl-0 md:pl-5 mt-5 md:mt-0 md:w-1/2">
            <h2 className="text-xl md:text-2xl underline mb-4 text-center md:text-left">Application Fee</h2>
            <ul className="space-y-3">
                <li><strong>{result.resultData?.result?.exam_fees1?.split('.')[0]}</strong> {result.resultData?.result?.exam_fees1?.split('.')[1]}</li>
                <li><strong>{result.resultData?.result?.exam_fees2?.split('.')[0]}</strong> {result.resultData?.result?.exam_fees2?.split('.')[1]}</li>
                <li><strong>{result.resultData?.result?.exam_fees3?.split('.')[0]}</strong> {result.resultData?.result?.exam_fees3?.split('.')[1]}</li>
                <li><strong>Description:</strong> {result.resultData?.result?.fees_description}</li>
            </ul>
        </div>
    </div>
</div>

<div className="age-limit-section mt-10">
            <h2 className="font-bold text-lg md:text-2xl">
              <strong className="mr-2">
                {result.resultData?.result?.age_limit_title.split(":")[1]} :
              </strong>
              <span className="text-red-600 text-xl">
                {result.resultData?.result?.age_limit_title.split(":")[0]}
              </span>
            </h2>
            <ul className="mt-4">
              <li className="text-left ml-5 md:ml-20">
                <strong>Minimum Age:</strong>
                <span className="text-lg md:text-2xl text-blue-800">
                  {" "}
                  {result.resultData?.result?.minimum_age}
                </span>
              </li>
              <li className="text-left ml-5 md:ml-20 mt-2">
                <strong>Maximum Age:</strong>
                <span className="text-lg md:text-2xl text-blue-800">
                  {" "}
                  {result.resultData?.result?.maximum_age}
                </span>
              </li>
              <li className="text-left ml-5 md:ml-16 mt-4 text-base md:text-xl text-emerald-600">
                {result.resultData?.result?.age_description.split(".").map((abc, index) => (
                  <li key={index}>{abc}</li>
                ))}
              </li>
            </ul>
          </div>

          <div className="vacancy-details mt-10">
            <h2 className="text-red-600 font-extrabold text-lg md:text-xl mb-5">
              {result.resultData?.result?.table_title2}
            </h2>
            <p className="text-xl md:text-2xl font-bold">
              Vacancy Details (Total):{" "}
              <span className="text-blue-600 text-lg md:text-3xl">
                {result.resultData?.result?.total_vacancy}
              </span>
            </p>
          </div>

          <div className="how-to-fill mt-10">
            <h2 className="text-lg md:text-2xl font-extrabold text-slate-600">
              How to Fill {result.resultData?.result?.table_title2} Form
            </h2>
            <ul className="mt-5 list-none pl-0">
              {result.resultData?.result?.how_to_fill.split(".").map((abc, index) => (
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
                    <tr >
                        <th className="text-yellow-950 text-xl md:text-2xl font-extrabold">Some Useful Important Links</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
                            <p className="text-lg md:text-2xl font-bold text-pink-700">Download Result</p>
                            <a href={result.resultData?.result_link} className="button hover:bg-red-500 text-lg md:text-xl">Click Here</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
                            <p className="text-lg md:text-2xl font-bold text-pink-700">Download Admit Card</p>
                            <a href={result.admitcardDta?.admit_card_link} className="button hover:bg-red-500 text-lg md:text-xl">Click Here</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
                            <p className="text-lg md:text-2xl font-bold text-pink-700">Apply Online</p>
                            <a href={result.resultData?.result?.apply_online_link} className="button hover:bg-red-500 text-lg md:text-xl">Click Here</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
                            <p className="text-lg md:text-2xl font-bold text-pink-700">Download Notification</p>
                            <a href={result.resultData?.result?.download_notification_link} className="button hover:bg-red-500 text-lg md:text-xl">Click Here</a>
                        </td>
                    </tr>
                    <tr>
                        <td className="flex flex-col md:flex-row gap-5 justify-between items-center md:gap-[345px] md:ml-48">
                            <p className="text-lg md:text-2xl font-bold text-pink-700">Official Website</p>
                            <a href={result.resultData?.result?.official_website_link} className="button hover:bg-red-500 text-lg md:text-xl">Click Here</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SngleResult;
