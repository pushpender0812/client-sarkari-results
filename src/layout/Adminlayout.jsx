import React, { useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import "./Adminlayout.css";
// import { useAuth } from '../../store/Auth';

const Adminlayout = () => {

    // const {user,isLoading} = useAuth()
    // console.log("User data in admin page",user);

  

return (
    <>
   
    <div className="dashboard">
    <nav className="sidebar">
        <div className="sidebar-logo">
        <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-links">
        <li><NavLink exact  activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/admin/users" activeClassName="active">Add Latest Jobs</NavLink></li>
        <li><NavLink to="/admin/users" activeClassName="active">Add Results</NavLink></li>
        <li><NavLink to="/admin/users" activeClassName="active">Add Admit Card</NavLink></li>
        <li><NavLink to="/admin/users" activeClassName="active">Add Answer Keys</NavLink></li>
        <li><NavLink to="/admin/contact" activeClassName="active">Add Syllabus</NavLink></li>
        <li><NavLink to="/admin/contact" activeClassName="active">Contacted Messages</NavLink></li>
        {/* <li><NavLink to="/admin/service" activeClassName="active">Services</NavLink></li> */}
        </ul>
    </nav>
    <div className="main-content">
        <Outlet />
    </div>
    
    </div>
   
    </>
);
}

export default Adminlayout;
