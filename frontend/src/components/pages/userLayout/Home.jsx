import React, { useEffect,useState } from 'react'
import Navbar from '../../common/Navbar'
import Footer from '../../common/Footer'
import Slider from '../../common/Slider';
import OurService from '../../common/OurService';
import PropertyCard from '../../common/PropertyCard';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../../common/propertydata';
import { useSave } from "../../common/SaveContext";
import { Link } from 'react-router-dom';
import { LiaAngleDownSolid } from "react-icons/lia";

function Home() {

    const [properties,setProperties]=useState([])
    const {  toggleSave } = useSave();

    const Navigate=useNavigate()

  useEffect(()=>{
     getProperties(setProperties);
  },[])

  const isexpireToken=()=>{
    const tokenExpiry= JSON.parse(localStorage.getItem("tokenExpiry"))
    const now= Date.now();
    if(now > tokenExpiry){
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("tokenExpiry");
    }
  }

  useEffect(()=>{
       isexpireToken();
      const auth= JSON.parse(localStorage.getItem("token"));
      if(!auth || auth===""){
        Navigate("/") 
      }
   },[properties])
   
   const viewProperty = (property_id) => {
    Navigate("/viewProperty", { state: { property_id } });
  };

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
      <div className="view_more">
     <button className="btn_view_more"><Link to="/allListing">View More</Link><LiaAngleDownSolid  style={{paddingLeft:"5px"}}/></button>
    </div>
      </div>
       <Footer></Footer>
    </div>
  )
}

export default Home