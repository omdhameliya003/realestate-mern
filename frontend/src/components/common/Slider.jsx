import React, { useEffect, useState } from 'react'
import "./Slider.css"

function Slider() {
    const [currentslide,setCurrentslide]=useState(0)
        
    const images=[
{
    src:"../images/house.jpg",caption:"House"
},
{
    src:"../images/office.jpg",caption:"Office"
},
{
     src:"../images/flat.jpg",caption:"Flat"
},
{
     src:"../images/shop.jpg",caption:"Shop"
}

    ];


useEffect(()=>{

     const interval= setInterval(function () {
    setCurrentslide((prev)=>(prev + 1) % images.length)
      }, 2000);

      return () => clearInterval(interval);
},[])
   
  return (
    <div className="slide-container">

{
 images.map((item,index)=>{
 
   return <div className="slide"  key={index} style={{display:index===currentslide ?'block':'none'}}>
    <img src={item.src} alt={item.caption} />
    <div className="caption">{item.caption}</div>
  </div>
 })
}   
       {/* <span class="arrow prev" onclick="controller(-1)">&#10094</span>
      <span class="arrow next" onclick="controller(1)">&#10095</span>    */}
      
      </div>
  )
}

export default Slider