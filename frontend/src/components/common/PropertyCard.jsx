import React from 'react'
import "./PropertyCard.css"
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from 'react-icons/fa';
import { FaComments } from "react-icons/fa";
import { PiCurrencyInrBold } from "react-icons/pi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { FaExpandArrowsAlt } from "react-icons/fa";
import { useSave } from "../common/SaveContext";
import { Link } from 'react-router-dom';

const PropertyCard=React.memo(({propertydata,viewProperty,onSave,onRequiest})=> {

   const { savedProperties} = useSave();
  const isSaved = savedProperties.includes(propertydata._id);

  const dateObj = new Date(propertydata.posted_at);
const formattedDate = dateObj.toLocaleString('en-GB', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false, 
});

const formattedDateString = formattedDate.replace(/\//g, '-').replace(',', '');
  return (
    <>  
      <div className="listing-main">
        <div className="listing-flex">
          <div className="listing-left">
                  <div className="listing-save-btn">
                        <button onClick={onSave}>
                             { isSaved ? <FaHeart color='red' />:<FaRegHeart  />}save

                        </button>

                        <button className="comment-button">
                          <Link to={`/comment/${propertydata._id}`}><FaComments /> Comment </Link>
                        </button>
                </div>
            <div className="listing-img">
              <img src={propertydata.images[0]} alt="" />
            </div>
            <div className="listing-user">
              <div>
                <h3 className="owner-logo">{propertydata.user.fname.charAt(0)}</h3>
              </div>
              <div className="owner-name">
                <p>{propertydata.user.fname}</p>
                <p>{formattedDateString}</p>
              </div>
            </div>
          </div>
          <div className="listing-right">
            <div className="listing-data">
              <div>
                <p className="price">
                <PiCurrencyInrBold  className='post-icon'/><span>{propertydata.price}</span>
                </p>
              </div>
              <div className="name">
                <h3>{propertydata.property_name}</h3>
              </div>
              <div className="address">
                <p>
                <FaMapMarkerAlt className='post-icon'/>
                  <span>{propertydata.address+","+propertydata.city}</span>
                </p>
              </div>

              <div className="listing-data-grid">
                <p>
                { propertydata.type==="house" || propertydata.type=== 'flat'?<FaHouse className='post-icon'/> : propertydata.type==="office" ?<FaBuilding className='post-icon'/>:<FaStore className='post-icon' />} <span>{propertydata.type}</span> </p>

                                <p><FaTag className='post-icon' /> <span>{propertydata.offer}</span></p>
                                <p><FaBed  className='post-icon'/> <span>{propertydata.bhk}BHK</span></p>
                    
                                <p><FaReply  className='post-icon'/> <span>{propertydata.status}</span></p>
                                <p> <FaHouse  className='post-icon'/> <span>{propertydata.furnished}</span></p>
                                <p><FaExpandArrowsAlt className='post-icon' /> <span>{propertydata.carpet}sqft</span></p>
              </div>
              <div className="listing-buttons">
                <button className="btnviewproperty" onClick={viewProperty}> View Property</button>
                <button className="btnsendenquery" onClick={onRequiest}>Send Enquiry</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/* <div className="view_more">
     <button className="btn_view_more"><a href="all_listing.php">View More</a>
     <i className="fa fa-angle-down" aria-hidden="true" style="color:white; padding-left:5px; font-size:24px"></i></button>
    </div> */}
    </>
  )
});

export default PropertyCard