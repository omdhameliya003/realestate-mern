import React, { useEffect, useState } from 'react'
import RequistCard from '../common/RequistCard'
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { useAlert } from '../common/AlertProvider';

function RequiestRecieved() {
 const [requiestData, setRequiestData]=useState([])

 const {showAlert}= useAlert();

    useEffect(()=>{
        async function getrequiestData(){
            const token= JSON.parse(localStorage.getItem("token")||"");
            const user_id= JSON.parse(localStorage.getItem("user_id")||"");
            
            const res= await fetch(`http://localhost:5000/requiest/received/${user_id}`,{
                method:"GET",
                headers:{
                 "Authorization":`Bearer ${token}`,
                }
            });

            const result= await res.json();
            console.log("requiest data:-", result.requiestdata)
            setRequiestData(result.requiestdata)
        }
        getrequiestData();
    },[])

   const OnDeleteRequiest= async(requiest_id)=>{
    const token= JSON.parse(localStorage.getItem("token")||"");
     const res= await fetch(`http://localhost:5000/requiest/${requiest_id}`,{
        method:"delete",
        headers:{
          "Authorization":`Bearer ${token}`
        }
     })
     const result= await res.json();

     if(result.success){
       showAlert('success',result.message) 
       setRequiestData((prev)=> prev.filter(card=>{ return card._id!== requiest_id }))
     }
     else{
        showAlert('error',result.message)
     }
   } 

  return (
    <>
    <Navbar/>
     {
        requiestData && requiestData.length>0
        ?<div className="requiest-container">
        <h2>Requests You Received</h2>
        <div className="requiest-cards">
     {  
         requiestData.map((item,index)=>{
             return <RequistCard requiestData={item} OnDelete={()=>OnDeleteRequiest(item._id)} key={item._id}/>
            }) 
        }
        </div>
         </div>
        :<div className="no_request">
            <p>No requests received for your properties.</p>
        </div>
     }
     <Footer/>

    </>
  )
}

export default RequiestRecieved