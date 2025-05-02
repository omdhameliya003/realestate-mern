import React, { useEffect,useState } from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Slider from './../common/Slider';
import OurService from '../common/OurService';
import PropertyCard from '../common/PropertyCard';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../common/propertydata';
import { useSave } from "../common/SaveContext";

function Home() {

    const [properties,setProperties]=useState([])
    // const [saveList,setSaveList]=useState([])
    const {  toggleSave } = useSave();

    const viewProperty = (property_id) => {
      Navigate("/viewProperty", { state: { property_id } });
    };

    //  useEffect(()=>{
    //     async function getsavesList(){
    //       const token = JSON.parse(localStorage.getItem("token") || "");
    //       const user_id = JSON.parse(localStorage.getItem("user_id") || "");
    //       const res= await fetch(`http://localhost:5000/saveProperty/user/${user_id}`,{
    //         method:"GET",
    //         headers:{
    //           "Authorization":`Bearer ${token}`,
    //           "Content-Type":"application/json",
    //         }
    //       })
    //       const result= await res.json();
    //       setSaveList(result.propertyIds)
    //     }
    //     getsavesList();
    //   },[])

  useEffect(()=>{
     getProperties(setProperties);
  },[])
  const Navigate=useNavigate()
  useEffect(()=>{
      const auth= JSON.parse(localStorage.getItem("token"));
      if(!auth || auth===""){
        Navigate("/") 
      }
   },[Navigate])
  return (
    <div>
       <Navbar></Navbar>
       <Slider></Slider>
       <OurService></OurService>
       <div className="listing-container">
       <h2>Latest Listing</h2>
      {
       properties && properties.slice(-1).map((item,index)=>{
        return <PropertyCard  cardDetail={item} key={index} propertydata={item}  onSave={()=>toggleSave(item._id)} viewProperty={() => viewProperty(item._id)}/>
        })
      }
      </div>
       <Footer></Footer>
    </div>
  )
}

export default Home