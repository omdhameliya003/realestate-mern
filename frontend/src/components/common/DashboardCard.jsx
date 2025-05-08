import React from 'react'
import "./DashboardCard.css"
import { Link } from 'react-router-dom'



function DashboardCard({cardData}) {
  return (
    <>
   
    <div className="dashbord-card">
          <div>
            <h3>{cardData?.title}</h3>
          </div>
          <div className="deshbord-desc">
            <p>{cardData?.desc}</p>
          </div>
          <div>
            <button className="btndashbord"><Link to={cardData?.link} >{cardData?.btntext}</Link></button>
          </div>
        </div>
       
    </>
  )
}

export default DashboardCard