import React, { useEffect } from 'react'
import "./Card.css"
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
function RequistCard({requiestData,OnDelete}) {

     const dateObj= new Date(requiestData.createdAt)
     const formattedDate = dateObj.toLocaleString('en-GB', {
       day: '2-digit',
       month: 'long',
       year: 'numeric',
     })

     const formattedTime=dateObj.toLocaleString('en-GB', {
       hour:'2-digit',
       minute: '2-digit',
       hour12: true, 
     });
  return (
    <>
    <div className="requiest-card">
                    <p><FaUser className='cardIcon' />Name: <span>{requiestData?.user_id?.fname}</span></p>
                        <p><FaPhone className='cardIcon'/>Number: <span>{requiestData?.user_id?.mobile}</span></p>
                        <p><FaEnvelope className='cardIcon'/>Email: <span>{requiestData?.user_id?.email}</span></p>
                        <p><FaBuilding className='cardIcon'/>Enquiry for: <span>{requiestData?.property_id?.property_name}</span></p>
                        <p><FaCalendarAlt className='cardIcon'/> Enquiry Date: 
                               <span> {formattedDate}</span>
                        </p>
                         <p><FaClock className='cardIcon'/> Enquiry Time: 
                                <span> {formattedTime}</span>
                        </p>
                        <button className="btndelete" onClick={OnDelete}>Delete Request</button>
                        <button className="btnview_property">View Property</button>
                    </div>
    </>
  )
}

export default RequistCard
