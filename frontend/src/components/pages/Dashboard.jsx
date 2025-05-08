import React, { useEffect, useState } from 'react'
import DashboardCard from '../common/DashboardCard'
import Navbar from "../common/Navbar"
import Footer from '../common/Footer'

function Dashboard() {

  const cardData=[
    { id:1, title:"welcome!" , desc:"om", btntext:"update profile" , link:"/updateProfile"},
    {id:2, title:"filter search" , desc:"search your dream property", btntext:"serch now" ,link:"/filterSearch"},
    {id:3, title:0 , desc:"properties listed", btntext:"view all my listings",link:"/myListing"},
    {id:4, title:0 , desc:"request received", btntext:"view received requests",link:"/requiestReceived"},
    { id:5, title:0 , desc:"requests sent", btntext:"view your requests",link:"/requiestSent"},
    {id:6, title:0 , desc:"properties saved", btntext:"view saved propertis",link:"/saveProperty"}, 
]

 const [LodingPage,setLodingPage]= useState(true);
 const [dashboardData,setDashboardData]= useState([...cardData])

useEffect(()=>{

  async function getdashboardData(){
    try {

      const token = JSON.parse(localStorage.getItem("token") || "");
      const user_id = JSON.parse(localStorage.getItem("user_id") || "");

      const [userInfo, myProperty,PropertySaved, requiestSent, requiestRecieved] = await Promise.all(
        [
           fetch("http://localhost:5000/auth/me", {
            method: "GET",
            headers: {
              "content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }),

          fetch(`http://localhost:5000/property/user/${user_id}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),

          fetch(`http://localhost:5000/saveProperty/user/${user_id}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
          }),

          fetch(`http://localhost:5000/requiest/sent/${user_id}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
          }),

          fetch(`http://localhost:5000/requiest/received/${user_id}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
          }),

        ]);
         
      const  userdata= await userInfo.json();
      const myPropertyCount= await myProperty.json();
      const SaveProperty= await PropertySaved.json();
      const totalRequiestSent= await requiestSent.json();
      const totalRequiestRecieved= await requiestRecieved.json();
  
      setDashboardData((prev)=>
          prev.map((item)=>{
            if(item?.id===1){
             return{...item,desc:userdata.user.fname}
            }
            if(item?.id===2){
              return {...item}
            }
            if(item?.id===3){
              return {...item,title:myPropertyCount.properties.length}
            }
            if(item?.id===4){
              return {...item, title:totalRequiestRecieved.requiestdata.length }
            }
            if(item?.id===5){
              return {...item, title:totalRequiestSent.requiestdata.length}
            }
            if(item?.id===6){
               return {...item,title:SaveProperty.properties.length}
            }
            return item 
           })
    )
    } catch (error) {
      console.log("error message:-",error)
    }finally{
           setLodingPage(false)
    }
  }
  getdashboardData();

},[])

if(LodingPage) return <h3 style={{textAlign:"center"}}> Loding...</h3>;

  return (
    <>
     <Navbar/>
    <div className="dashbord-container">
      <h1>Dashbord</h1>
      <div className="dashbord-cards">
        {
            dashboardData && dashboardData.map((item,index)=>{
               return  <DashboardCard  cardData={item} key={index} />
            })
        }
      </div>
      </div>
      <Footer/>
    </>
  )
}

export default Dashboard