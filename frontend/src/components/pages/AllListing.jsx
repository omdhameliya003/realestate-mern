import React, { useEffect, useState } from 'react'
import PropertyCard from '../common/PropertyCard';
import { getProperties } from '../common/propertydata';
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import { useNavigate } from 'react-router-dom';

function AllListing() {
    const Navigate=useNavigate();

    useEffect(()=>{
          const auth= JSON.parse(localStorage.getItem("token"));
          if(!auth || auth===""){
            Navigate("/") 
          }
       },[Navigate])

const [properties,setProperties]=useState([])

useEffect(()=>{
    getProperties(setProperties);
},[])
  return (
    <>
      <Navbar/>
    <div className="listing-container">
    <h2>All Listing</h2>
    {
       properties && properties.map((item,index)=>{
        return <PropertyCard  cardDetail={item} key={item._id} propertydata={item}/>
        })
    }
    </div>

    <Footer/>
    </>
  )
}

export default AllListing