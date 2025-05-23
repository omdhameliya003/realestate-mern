import React from 'react'
import "./Sidebar.css"
import { FaCamera } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <>
    <div className="sidebar">
            <div className="sidebar-top">
               <div className="profile-container">
                     <img id="adminProfile" src="../images/pic-3.png" alt=""/>
                     <label htmlFor="fileInput" className="camera-icon">
                    <FaCamera className='icon' />
                      </label>
                 <input type="file" id="fileInput" accept="image/*"/>
              </div>
                       <h2>Welcome, Admin</h2>
            </div>
            <ul>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                <li><Link to="/admin/manageuser">Manage Users</Link></li>
                <li><Link to="/admin/messages">Messages</Link></li>
                <li><Link to="/admin/manageproperty">View Properties</Link></li>
                <li><Link to="/logout">Logout</Link></li>
            </ul>
 </div>
    </>
  )
}

export default Sidebar