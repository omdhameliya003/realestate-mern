import React,{useState} from 'react'
import "../pages/userLayout/Faq.css"
import { FaAngleDown } from "react-icons/fa6";

function FaqBox({faqitem }) {
    const [isOpen,setIsOpen]=useState(false)

  return (
    <div className={`faq-item ${isOpen ?"active":""}`} onClick={()=>setIsOpen((prev)=> !prev)}>
         <h3>{faqitem.question} <span className="faq-toggle-icon"><FaAngleDown /></span></h3>
         <p>{faqitem.answer}</p>
    </div>
  )
}

export default FaqBox