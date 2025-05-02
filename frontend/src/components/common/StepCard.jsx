import React from 'react'
import "./Card.css"

function StepCard({carddata}) {
  return (
    <>
        <div className="card">
            <img src={carddata.src} alt="" />
            <h2>{carddata.tital}</h2>
            <p className="card-desc">
               {carddata.desc}
            </p>
          </div>
    </>
  )
}

export default StepCard