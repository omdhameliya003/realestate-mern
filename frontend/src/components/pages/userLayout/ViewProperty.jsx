import React, { useEffect, useState, useMemo, useCallback } from "react";
import "./ViewProperty.css";
import { useLocation } from "react-router-dom";
import { FaCheck } from "react-icons/fa6";
import { PiCurrencyInrBold } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaTag } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { useAlert } from "../../common/AlertProvider";

function ViewProperty() {
  const [property, setProperty] = useState({});
  const [slidenum, setslidenum] = useState(0);
  const { state } = useLocation();

  const {showAlert}= useAlert();

//  const images= useMemo(()=>{
//    return [
//       { src: "images/house/house-1.jpeg" },
//       { src: "images/house/house-2.jpeg" },
//       { src: "images/house/house-3.jpeg" },
//       { src: "images/house/house-4.jpg" },
//       { src: "images/house/house-5.jpeg" },
//     ];
//   },[])

  useEffect(() => {
    const getproperty = async () => {
      const token = JSON.parse(localStorage.getItem("token") || "");
      const res = await fetch(
        `http://localhost:5000/property/${state.property_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      if (result.success) {
        setProperty(result.property);
      }
    };
    getproperty();
  }, [state.property_id]);

  const postedDate = useMemo(() => {
    const objdate = new Date(property.posted_at);
    return objdate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, [property.posted_at]);

  const controller = (num) => {
     let slides = property?.images || [];
    setslidenum((prev) => {
      let newIndex = prev + num;

    if (newIndex >= slides.length) return 0;     
    if (newIndex < 0) return slides.length - 1;      
    return newIndex;
    });
  };
  
  const slideshow = useCallback((num)=>{
    
  },[]);

  useEffect(()=>{
    slideshow(slidenum);
  },[slidenum,slideshow])

  const onRequiest= async(property_id,owner_id)=>{
    console.log("property_id:-",property_id);
    console.log("owner_id:-",owner_id)
    const token= JSON.parse(localStorage.getItem("token")||"");
    const user_id= JSON.parse(localStorage.getItem("user_id")||"");
    console.log("user_id:-",user_id);
    const res= await fetch(`http://localhost:5000/requiest`,{
      method:"POST",
      headers:{
        "content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({property_id,owner_id,user_id})
    });

    const result= await res.json();

    if(result.success){
    showAlert('success', result.message);
    }else{
      showAlert('warning', result.message);
    }
  }

  return (
    <>
        <section className="view-property">
    { 
      state.admin && state.admin === true?<div>
        <button
              class="btn-goback-admin"
              onClick={() => window.history.back()}
              >
              ← Go Back
            </button>
      </div>:""
    }
        <h1 className="heading">Property Details</h1>
        <div className="details">
          <div className="slide-container">
           {
            property?.images?.length>0 && (
               <div className="slide" >
                  <img src={slidenum!==-1 ? property?.images[slidenum]:property?.images[property?.images.length-1]} alt={`image-`} />
            </div>
            )
           }
           
            {property?.images?.length > 1 ? (
              <>
                <span className="arrow prev" onClick={() => controller(-1)}>
                  &#10094;
                </span>
                <span className="arrow next" onClick={() => controller(1)}>
                  &#10095;
                </span>
              </>
            ) : null}
          </div>

          <h3 className="name">{property.property_name}</h3>
          <p className="location">
          <FaMapMarkerAlt className="viewPropertyIcon"/>
            <span>
              {property.address +
                " , " +
                property.city +
                " , " +
                property.state}
            </span>
          </p>
          <div className="info">
            <div>
              <p>
                <PiCurrencyInrBold className="viewPropertyIcon" />
                <span>{property.price}</span>
              </p>
              <p>
                <FaUser className="viewPropertyIcon" />
                <span>{property && property?.user?.fname}</span>
              </p>
              <p>
                <FaPhoneAlt className="viewPropertyIcon" />
                <span>{property && property?.user?.mobile}</span>
              </p>
            </div>
            <div>
              <p>
                {property.type === "house" || property.type === "flat" ? (
                  <FaHouse className="viewPropertyIcon" />
                ) : property.type === "office" ? (
                  <FaBuilding className="viewPropertyIcon" />
                ) : (
                  <FaStore className="viewPropertyIcon" />
                )}
                <span>{property.type}</span>
              </p>
              <p>
                <FaTag className="viewPropertyIcon" />{" "}
                <span>{property.offer}</span>
              </p>
              <p>
                <FaCalendarDays className="viewPropertyIcon" />
                <span>{postedDate}</span>
              </p>
            </div>
          </div>

          <h3 className="title">Details</h3>
          <div className="flex">
            <div className="box">
              <p>
                State : <span>{property.state}</span>
              </p>
              <p>
                City : <span>{property.city}</span>
              </p>
              <p>
                Deposit Amount : <span>{property.deposite}</span>
              </p>
              <p>
                Status : <span>{property.status}</span>
              </p>
              <p>
                Carpet Area : <span>{property.carpet}</span>
              </p>

              <p>
                Rooms : <span>{property.bhk}BHK</span>
              </p>
              <p>
                Bedroom : <span>{property.bedroom}</span>
              </p>
            </div>

            <div className="box">
              <p>
                Bathroom : <span>{property.bathroom}</span>
              </p>
              <p>
                Room Floor : <span>{property.room_floor}</span>
              </p>

              <p>
                Total Floors : <span>{property.total_floor}</span>
              </p>
              <p>
                Age : <span>{property.age} years</span>
              </p>
              <p>
                Balcony : <span>{property.balcony}</span>
              </p>
              <p>
                Furnished : <span>{property.furnished}</span>
              </p>
              <p>
                Loan : <span>{property.loan}</span>
              </p>
            </div>
          </div>
          <h3 className="title">Amenities</h3>
          <div className="flex">
            <div className="box">
              <p>
                {property?.amities?.lift === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}
                <span>Lift</span>
              </p>

              <p>
                {property?.amities?.security_guard === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Security Guard</span>
              </p>
              <p>
                {property?.amities?.play_ground === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Play Ground</span>
              </p>
              <p>
                {property?.amities?.garden === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Garden</span>
              </p>
              <p>
                {property?.amities?.water_supply === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Water Supplay</span>
              </p>
              <p>
                {property?.amities?.power_backup === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Power Backup</span>
              </p>
              <p>
                {property?.amities?.fire_security === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Fire Security</span>
              </p>
            </div>
            <div className="box">
              <p>
                {property?.amities?.parking_area === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Parking Area</span>
              </p>
              <p>
                {property?.amities?.gym === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Gym</span>
              </p>
              <p>
                {property?.amities?.cctv_cameras === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>CCTV Cameras</span>
              </p>
              <p>
                {property?.amities?.shopping_mall === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Shopping Mall</span>
              </p>
              <p>
                {property?.amities?.hospital === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Hospital</span>
              </p>
              <p>
                {property?.amities?.school === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>School</span>
              </p>
              <p>
                {property?.amities?.market_area === "yes" ? (
                  <FaCheck className="viewPropertyIcon" />
                ) : (
                  <FaTimes className="viewPropertyIcon" />
                )}{" "}
                <span>Market Area</span>
              </p>
            </div>
          </div>

          <h3 className="title">Description</h3>
          <p className="description">this house is really beautifull.</p>

          {
            state.admin && state.admin===true? ""
            :<div className="view-property-buttons">
            <button
              className="btn-goback"
              onClick={() => window.history.back()}
              >
              ← Go Back
            </button>
            <button className="btnsendenquery" onClick={()=>onRequiest(property._id, property.user._id)}>
               Send Enquiry
            </button>
          </div>
            }
        </div>
      </section>
    </>
  );
}

export default ViewProperty;
