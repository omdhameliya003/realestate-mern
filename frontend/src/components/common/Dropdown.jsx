import React from 'react'
import { Link } from 'react-router-dom'
import "./Dropdown.css"
import { LiaAngleDownSolid } from "react-icons/lia";

function Dropdown({data}) {
  return (
    <div className="dropdown">
            <button className="btnmy_listings">
              {data.lable}<LiaAngleDownSolid  className='icon-nav'/>
            </button>
            <div className="dropdown-content">
            {
                data.submenu.map((subitem,index)=>{
                   return <React.Fragment key={index} >
                    <Link to={subitem.link} key={index}>{subitem.lable}</Link>
                    </React.Fragment>
                })
            }
            </div>
       </div>
           
        
  )
}

export default Dropdown