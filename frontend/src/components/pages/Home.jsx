import React, { useEffect,useState } from 'react'
import Navbar from '../common/Navbar'
import Footer from '../common/Footer'
import Slider from './../common/Slider';
import OurService from '../common/OurService';
import PropertyCard from '../common/PropertyCard';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../common/propertydata';

function Home() {

    const [properties,setProperties]=useState([])

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
        return <PropertyCard  cardDetail={item} key={index} propertydata={item}/>
        })
      }
      </div>
       <Footer></Footer>
    </div>
  )
}

export default Home