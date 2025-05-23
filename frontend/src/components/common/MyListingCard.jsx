import React from 'react'
import "./MyListingCard.css";
import { PiCurrencyInrBold } from "react-icons/pi";
import { FaMapMarkerAlt } from "react-icons/fa";

const MyListingCard = React.memo(({propertiesdata,onDelete,viewProperty ,onUpdate})=> {

  return (
    <>
        <div className="list_item">
          <div className="my_listing_img">
            <img src={propertiesdata.images[0]} alt=""/>
          </div>
          <div className="listing-data">
            <div>
              <p>
                <PiCurrencyInrBold/><span>{propertiesdata.price}</span>
              </p>
            </div>
            <div>
              <h3>{propertiesdata.property_name}</h3>
            </div>
            <div>
              <p>
                <FaMapMarkerAlt/>
                <span>
                  {propertiesdata.address+","+propertiesdata.city}
                 </span>
                 </p>
            </div>
            <div className="my_listing_buttons">
               <div className="my_list_btn_flex">
                 <button className="btnupdate" onClick={onUpdate}>
                    update
                 </button>
                 <button className="btndelete" onClick={onDelete}>
                     Delete
                 </button>
               </div>
               <div>
                <button className="btnview_property" onClick={viewProperty}> view property</button>
               </div>
            </div>
            </div>
            </div>
    </>
  )
})

export default MyListingCard