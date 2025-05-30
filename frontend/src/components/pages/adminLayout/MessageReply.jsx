import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/adminComponent/Sidebar'
import "./MessageReply.css"
import { useLocation } from 'react-router-dom'
import { useAlert } from '../../common/AlertProvider'

function MessageReply() {
    const {state}=useLocation();
    const [usermessage,setuserMessage]=useState({});

    const [formdata,setFormData]=useState({
        user_email:"",
        message:"",
        replymessage:""
    })

     const showAlert=useAlert();
    useEffect(()=>{
        async function getmessage(){
            try {
                 const token= JSON.parse(localStorage.getItem("token"))
            const res= await fetch(`https://wonder-property-backend.onrender.com/message/${state.message_id}`,{
                method:"GET",
                headers:{
                     authorization:`Bearer ${token}`
                }
            });
            const result= await res.json();
             setuserMessage(result.message[0])
            } catch (error) {
                console.log(error)
            }}
            getmessage();
    },[])

    useEffect(()=>{
        if(usermessage){
            setFormData((prev)=>({
               ...prev,
               user_email:usermessage?.email,
               message:usermessage?.message
            }))
        }
    },[usermessage])

    const handleChange=(e)=>{
        const {name,value}=e.target;
        setFormData((prev)=>({
            ...prev,[name]:value
        }))

    }
    const handleSubmit= async(e)=>{
         e.prevntDefault();

         try {
            const token= JSON.parse(localStorage.getItem("token"));

            const res= await fetch("https://wonder-property-backend.onrender.com/send-message-reply-mail",{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                    authorization:`Bearer ${token}`
                },
                body:JSON.stringify(formdata)
            });
            const result= await res.json();

            if(result.success){
             showAlert("success", result.message)
            }else{
             showAlert("success",result.message)
            }
         } catch (error) {
           showAlert("error","Something went wong, try angain later")    
         }
    }

  return (
    <div className="admin-container">
       <Sidebar/>
        <div className="content">
            <div className="email-form">
            <h2>Reply to User Message</h2>
            <form method="post" onSubmit={(e)=>handleSubmit(e)}>
                <label>User Email:</label>
                <input type="email" name="user_email" value={usermessage?.email} readOnly/>

                <label>User Message:</label>
                <textarea readOnly  name="message" value={usermessage?.message}></textarea>

                <label>Your Reply:</label>
                <textarea name="replymessage" value={formdata.replymessage} required onChange={(e)=>handleChange(e)}></textarea>

                <button type="submit">Send Email</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default MessageReply