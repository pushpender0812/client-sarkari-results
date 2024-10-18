import React from 'react';
import { NavLink } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="grid justify-between items-center p-4 text-white shadow-xl rounded-2xl">
      <div className="flex items-center gap-4   bg-slate-500 rounded-3xl">
        <img src='../assets/logo.jpg' alt="Logo" className="w-16 h-16 rounded-3xl " />
        <h2 className="text-2xl font-bold">Sarkari Exam Result</h2>
      </div>
      <div className='bg-white h-2 md:w-[1180px] '></div>
      <div className="flex md:gap-5 gap-2 md:ml-56 mt-4 bg-white">
        <NavLink to="/" className="text-black md:text-xl text-sm font-bold transition-colors duration-300 hover:text-red-600 md:hover:text-white md:hover:bg-black hover:rounded-2xl" activeClassName="text-yellow-400">Home</NavLink>
        <NavLink to="/latestjob" className="text-black md:text-xl text-sm font-bold transition-colors duration-300 hover:text-red-600 md:hover:text-white md:hover:bg-black hover:rounded-2xl" activeClassName="text-yellow-400">Latest Jobs</NavLink>
        <NavLink to="/results" className="text-black md:text-xl text-sm font-bold transition-colors duration-300 hover:text-red-600 md:hover:text-white md:hover:bg-black hover:rounded-2xl" activeClassName="text-yellow-400">Results</NavLink>
        <NavLink to="/admitcard" className="text-black md:text-xl text-sm font-bold transition-colors duration-300 hover:text-red-600 md:hover:text-white md:hover:bg-black hover:rounded-2xl" activeClassName="text-yellow-400">Admit Card</NavLink>
        <NavLink to="/answer-key" className="text-black md:text-xl text-sm font-bold transition-colors duration-300 hover:text-red-600 md:hover:text-white md:hover:bg-black hover:rounded-2xl" activeClassName="text-yellow-400">Answer Key</NavLink>
        <NavLink to="/syllabus" className="text-black md:text-xl text-sm font-bold transition-colors duration-300 hover:text-red-600 md:hover:text-white md:hover:bg-black hover:rounded-2xl" activeClassName="text-yellow-400">Syllabus</NavLink>
        <NavLink to="/contact" className="text-black md:text-xl text-sm font-bold transition-colors duration-300 hover:text-red-600 md:hover:text-white md:hover:bg-black hover:rounded-2xl">Contact Us</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
