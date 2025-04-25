import React from 'react'
import "./OurService.css"

function OurService() {

    const carddata=[
        {
            src:"images/icon-1.png",
            title:"buy house",
            description:"Find your dream home with our extensive property listings. We help you make the best investment with expert guidance."
        },
        {
            src:"images/icon-2.png",
            title:"rent house",
            description:" Looking for a rental? Explore a variety of properties that match your budget and lifestyle needs."
        },
        {
            src:"images/icon-3.png",
            title:"sell house",
            description:" List your property with us and reach potential buyers quickly. We ensure a seamless selling experience."
        },
        {
            src:"images/icon-4.png",
            title:"flats and buildings",
            description:"  Browse premium flats and commercial buildings designed for modern living and business growth."
        },

        {
            src:"images/icon-5.png",
            title:"shops and malls",
            description:"   Discover prime retail spaces in top locations, ideal for expanding your business presence."
        },
        {
            src:"images/icon-6.png",
            title:"24/7 service",
            description:" Our team is available around the clock to assist with your property needs. Your satisfaction is our priority."
        }
    ]
  return (
    <div className="service-container">
      <h3>Our Services</h3>

      <div className="service-cards">
        {
            carddata.map((item,index)=>{
               return <div className="card" key={index}>
                <img src={item.src} alt="" />
                <h2>{item.title}</h2>
                <p className="card-desc">
               {item.description}
                </p>
              </div>
            })
        }
        
        </div>
      </div>
  )
}

export default OurService