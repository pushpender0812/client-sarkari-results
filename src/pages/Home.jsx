import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Results from './Results';
import AdmitCard from './AdmitCard';
import LatestJobs from './LatestJobs';
import AnswerKey from './AnswerKey';
import Syllabus from './Syllabus';
import Admission from './Admission';
import Spin from './Spin';

const Home = () => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true); // Step 1: Add loading state

  // Check if the pathname is "/"
  const isHomePage = pathname === "/";

  useEffect(() => {
    // Assuming all data fetching takes a certain time
    // Simulate a loading state and set timeout to mimic API call
    const timer = setTimeout(() => {
      setLoading(false); // Step 3: Stop loading after fetching data
    }, 2000); // Adjust the time based on actual loading time

    return () => clearTimeout(timer); // Cleanup
  }, []);

  return (
    <div className="min-h-screen py-10 flex flex-col items-center justify-center">
      {loading ? ( // Step 2: Conditional rendering based on loading state
        <div className="flex justify-center items-center h-full">
          <div className="loader"></div> {/* Loader */}
        </div>
      ) : (
        <>
          <Spin />
          {/* First row: Results, AdmitCard, LatestJobs */}
          <div className="w-full max-w-[1200px] flex flex-wrap justify-center gap-4 mt-[200px]">
            <div className="flex-grow flex-basis-[33%] min-w-[300px]">
              <Results className="text-base md:text-lg p-2" />
            </div>
            <div className="flex-grow flex-basis-[33%] min-w-[300px]">
              <AdmitCard className="text-base md:text-lg p-2" />
            </div>
            <div className="flex-grow flex-basis-[33%] min-w-[300px]">
              <LatestJobs className="text-base md:text-lg p-2" />
            </div>
          </div>

          {/* Second row: AnswerKey, Syllabus, Admission */}
          <div
            className={`w-full max-w-[1200px] flex ${
              isHomePage ? "flex-nowrap" : "flex-wrap"
            } justify-center gap-4 mt-4`}
          >
            <div className="flex-grow flex-basis-[33%] min-w-[300px]">
              <AnswerKey className="text-base md:text-lg p-2" />
            </div>
            <div className="flex-grow flex-basis-[33%] min-w-[300px]">
              <Syllabus className="text-base md:text-lg p-2" />
            </div>
            <div className="flex-grow flex-basis-[33%] min-w-[300px]">
              <Admission className="text-base md:text-lg p-2" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
