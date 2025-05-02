import React, { useEffect, useState } from 'react'
import "./AboutUs.css"
import Navbar from '../common/Navbar'
import StepCard from '../common/StepCard'
import ReviewCard from '../common/ReviewCard';
import Footer from '../common/Footer';

function AboutUs() {
   
  const [windowWidth, setWindowWidth]=useState(window.innerWidth);
  useEffect(()=>{
    const handleResize=()=> {
      
      setWindowWidth(window.innerWidth);
      console.log("width:-",windowWidth);
    }
    window.addEventListener('resize',handleResize);

    return()=> window.removeEventListener('resize',handleResize);
  }, [])

     const stepcarddata=[
        {src:"images/step-1.png", title:"search property", desc:"Browse through our extensive listings to find a property that suits your needs. Use filters to refine your search by location, budget, and preferences."},
        {src:"images/step-2.png",title:"contact agents",desc:"Get in touch with verified property agents or owners. Ask questions, schedule visits, and gather all the information you need before making a decision."},
        {src:"images/step-3.png",title:"enjoy property",desc:" Finalize the deal, sign the necessary documents, and move into your dream home with ease and confidence."}
    ];

    const reviewdata=[
      {src:"images/pic-1.png",name:"john doe", stars:5 ,desc:"This platform made finding my dream home effortless. The process was smooth, and the agents were incredibly helpful! Highly recommended." },
      {src:"images/pic-2.png", name:"Emma Taylor" , stars:5,desc:"I found a great rental property within days. The website is user-friendly, and the agent was professional and responsive."},
      {src:"images/pic-3.png",name:"James Miller", stars:4 ,desc:"Selling my property was quick and easy. I received multiple inquiries and closed a deal within a week!"},
      {src:"images/pic-4.png",name:"Neha Das",stars:5,desc:"A great experience overall! The listings were accurate, and the platform was easy to use."},
      {src:"images/pic-5.png",name:"Rohan Roy",stars:5,desc:"Excellent service! The entire process was smooth and transparent. Would use it again."},
      {src:"images/pic-6.png",name:"Emma ray",stars:3 , desc:"Finding my dream home was never easier! The website made the process quick and stress-free."}
    ]
   const  visibleReviews= windowWidth < 560 ? reviewdata.slice(0,3):reviewdata;
  return (
   <>
   <Navbar/>
   
   <div className="about-container">
      <div className="about-image-part">
        <img src="images/about-img.svg" alt="" />
      </div>
      <div className="about-content-part">
        <h2>why choose us?</h2>
        <p>
        We are dedicated to helping you find the perfect home. With a wide range of listings, expert advice, and a seamless process, we make property buying and renting easier than ever. Our platform connects buyers, sellers, and renters, ensuring a hassle-free experience with trusted agents and verified properties.
        </p>
        <button type="submit" id="btn-about"><a href="contactus">contact us</a></button>
      </div>
    </div>
    <div className="steps-section">
      <h1>3 simple steps</h1>
      <div className="steps-cards">
    {
    stepcarddata && stepcarddata.map((item,index)=>{
       return <StepCard  carddata={item} key={index}/>
    })
    }
      </div>
 </div> 
 <div className="client-review-container">
        <h1>client's reviews</h1>
        <div className="client-cards">
         {
            visibleReviews.map((item,index)=>{
            return <ReviewCard  reviewdata={item} key={index} />
          })
         }
       </div>
       </div>

       <Footer/>
   </>
  )
}

export default AboutUs