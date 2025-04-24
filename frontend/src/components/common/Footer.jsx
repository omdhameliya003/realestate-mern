import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
      <footer>
      <div className="footer-container">
        <div className="footer-top">
          <div className="foot-left">
            <a href="tel:9313739003"><FaPhoneAlt  className='footer-icon'/><span>9313739003</span></a>
            <a href="tel:+91 6535675320"><FaPhoneAlt className='footer-icon'/><span>+91 999 98 98 111</span></a>
            <a href="mailto:omshameliya003@gmail.com"
              ><MdEmail className='footer-icon'/><span>support@wonderproperties.com</span></a
            >
            <a href="#"><FaMapMarkerAlt className='footer-icon' /><span>A-121 High-Street Vesu, Surat-395010</span></a>
          </div>
          <div className="foot-middel">
            <Link to="/home"><span>home</span></Link>
            <Link to="/aboutUs"><span>about</span></Link>
            <Link to="/contactUs"><span>contact us</span></Link>
            <Link to="/allListing"><span>all listings</span></Link>
            <Link to="/saveProperty"><span>saved properties</span></Link>
          </div>
          <div className="foot-right">
            <a href="#"><FaFacebookSquare  className='footer-icon'/><span>facebook</span></a>
            <a href="#"><FaSquareTwitter  className='footer-icon'/><span>twitter</span></a>
            <a href="#"><IoLogoLinkedin  className='footer-icon'/><span>linkedin</span></a>
            <a href="#"><FaInstagram  className='footer-icon'/><span>instagram</span></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; copyright @ 2025 by <span>Wonder Properties </span> | all
            rights reserved!
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer