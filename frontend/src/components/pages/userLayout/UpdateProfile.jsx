import React, { useEffect, useState } from 'react'
import "./Form.css"
import { FaRegEye } from "react-icons/fa";
import {useAlert} from '../../common/AlertProvider';
import Footer from '../../common/Footer';
import Navbar from '../../common/Navbar';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
    const Navigate=useNavigate()
    useEffect(()=>{
        const auth= JSON.parse(localStorage.getItem("token"));
        if(!auth || auth===""){
          Navigate("/") 
        }
     },[Navigate])

  const { showAlert } = useAlert();
    const [formData,setFormData]= useState({ 
        fname:"", 
        email:"",
        mobile:"",
        oldpass:"",
        newpass:"",
        conpass:"",
    })
    const [errors,setErrors]=useState({});
    const [showpass,setShowpass]=useState(false);

    useEffect(()=>{
        const getprofile= async()=>{
            const token=JSON.parse(localStorage.getItem("token")) || "";
             const res = await fetch("https://wonder-property-backend.onrender.com/auth/me", {
               method: "GET",
               headers: {
                 "content-Type": "application/json",
                 "Authorization": `Bearer ${token}`
               },
             });
             const result= await res.json()
             const user=result.user;
            setFormData((prev)=>({
                ...prev,
                fname:user.fname,
                mobile:user.mobile,
                email:user.email,
            }))
            }
            getprofile();
        },[]);

    const handleChange=(e)=>{

      const {name,value}= e.target;
        setFormData((prev)=>({
            ...prev,
           [name]:value
        }))
    }

    const handleSubmit= async(e)=>{

        e.preventDefault();

        // if(!validation()){
        //   return
        // }   

      try{
          const token=JSON.parse(localStorage.getItem("token")||"");
          const user_id=JSON.parse(localStorage.getItem("user_id")||"");
          const res= await fetch(`https://wonder-property-backend.onrender.com/auth/update-profile/${user_id}`,{
              method:"PUT",
              headers:{
                 "content-Type":"application/json",
                  "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify(formData)
            })
            const result= await res.json()
            if(result.success){
              setFormData({
                oldpass:"",
                newpass:"",
                conpass:""
              })  
              showAlert('success',result.message);
            //   showAlert('success', 'your profile updated successful.');
            }else {
                showAlert('error', result.message   );
              }
        }catch(error){
           console.log(error)
           showAlert('error', "Something went wrong.");
        }

    }

  return (
    <>
    <Navbar/>
     <div className="form-container update-form">
      <div className="my-form">
        <form  onSubmit={handleSubmit} action="" method="post">
          <h2>Update your Account!</h2>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            placeholder={formData.fname}
            onChange={ handleChange}
          />
         {errors.fname && <span className="error">{errors.fname}</span>}

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder={formData.email}
            onChange={ handleChange}
          />

          {errors.email && <span className="error">{errors.email}</span>}

          <input
            type="number"
            name="mobile"
            value={formData.mobile}
            placeholder={formData.mobile}
            onChange={ handleChange}
          />
           {errors.mobile && <span className="error">{errors.mobile}</span>}

          <div className="field-password">
          <input
            type={showpass? "text":"password"}
            name="oldpass"
            value={formData.oldpass}
            placeholder="enter your old password"
            onChange={ handleChange}
          />
        <FaRegEye  className='field-icon' onClick={()=>setShowpass(!showpass)}/>
        </div>
        {errors.oldpass && <span className="error">{errors.oldpass}</span>}
         
  
            <input
              type="password"
              name="newpass"
              value={formData.newpass}
              placeholder="enter your new password"
              onChange={ handleChange}
            />
            {errors.newpass && <span className="error">{errors.newpass}</span>}
          
          <input
            type="password"
            name="conpass"
            value={formData.conpass}
            placeholder="confirm password"
            onChange={ handleChange}
          />
           {errors.conpass && <span className="error">{errors.conpass}</span>}
          <input type="submit" value="Update Now" name="submit" className="btn" />
          {/* <span className="success-msg" id="success-msg" style="color:green;"></span> */}
        </form>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default UpdateProfile