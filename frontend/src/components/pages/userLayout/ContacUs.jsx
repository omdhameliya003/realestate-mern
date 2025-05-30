import React, { useState } from 'react'
import  "./ContactUs.css"
import Navbar from '../../common/Navbar'
import Footer from '../../common/Footer'
import { FaPhone } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useAlert } from '../../common/AlertProvider';
function ContacUs() {

  const {showAlert}=useAlert();

  const user_id= JSON.parse(localStorage.getItem("user_id"));

  const initialstate={
    user_id:user_id,
    name:"",
    email:"",
    message:"",
  }

 const [messagedata, setmessageData]= useState(initialstate)
 
 const  handleChange=(e)=>{
  const {name,value}= e.target;

  setmessageData((prev)=>( {
    ...prev,[name]:value
  }))
 }
  
 const handleSubmit= async(e)=>{
 e.preventDefault();
  try {
    const token= JSON.parse(localStorage.getItem("token")||"");
    const res= await fetch(`https://wonder-property-backend.onrender.com/message`,{
      method:"POST",
      headers:{
        "content-type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify(messagedata)
    });
    const result = await res.json();
  
    if(result.success){
     showAlert('success',result.message)
      setmessageData({...initialstate})
    }else{
      showAlert('error',result.message)
    }
  } catch (error) {
    showAlert('error',"Something went wrong, server error")
  }
 }

  return (
    <>
    <Navbar/>
    <div className="contact-container">
    <h2>Contact Us</h2>

   
    <div className="contact-info">
      <div className="info-box">
      <FaPhone  className='contects-icon'/>
        <p><strong>Phone:</strong></p>
        <p>+91 999 98 98 111</p>
      </div>
      <div className="info-box">
      <FaEnvelope  className='contects-icon'/>
        <p><strong>Email:</strong></p>
        <p>support@wonderproperties.com</p>
      </div>
      <div className="info-box">
          <FaMapMarkerAlt className='contects-icon'/> 
        <p><strong>Address:</strong></p>
        <p>A-121 High-Street Vesu Surat-395010</p>
      </div>
    </div>

    <div className="contact-form" >
      <form action="" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={messagedata.name} required  onChange={handleChange}/>
        <input type="email" name="email" placeholder="Your Email" value={messagedata.email} required  onChange={handleChange}/>
        <textarea name="message" placeholder="Your Message" required  value={messagedata.message} onChange={handleChange}></textarea>
        <input type="submit" value="Send Message" className="btn" />
      </form>
    </div>
  </div>
  <Footer/>
    </>
  )
}

export default ContacUs