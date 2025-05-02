import React from 'react'
import { MdOutlineStarPurple500 } from "react-icons/md";
import "./Card.css"

function ReviewCard({reviewdata}) {
  return (
   <>
   <div className="card">
                <div className="client-rating">
                    <div className="client-photo">
                        <img src={reviewdata.src} alt=""/>
                    </div>
                    <div className="client-name">
                        <h2>{reviewdata.name}</h2>
                        <div className="stars"> 
                        {
                            [...Array(reviewdata.stars)].map((item, index)=>{
                               return <MdOutlineStarPurple500  key={index} color='orange'/>
                            })
                                 
                        }
                        </div>
                    </div>
                </div>
                <div className="card-desc client-desc">
                   <p>"This platform made finding my dream home effortless. The process was smooth, and the agents were incredibly helpful! Highly recommended."</p>
                </div>
              </div>
   </>
  )
}

export default ReviewCard