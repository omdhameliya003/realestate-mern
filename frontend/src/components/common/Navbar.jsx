import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { TiHome } from "react-icons/ti";
import { IoIosPaperPlane } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import Dropdown from "./Dropdown";

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const navdata = [
    {
      lable: "My Listing",
      submenu: [
        { lable: "dashbord", link: "/user/dashbord" },
        { lable: "post property", link: "/user/postProperty" },
        { lable: "my listing", link: "/user/myListing" },
      ],
    },

    {
      lable: "options",
      submenu: [
        { lable: "filter search", link: "/user/filterSearch" },
        { lable: "all listing", link: "/user/allListing" },
      ],
    },
    {
      lable: "help",
      submenu: [
        { lable: "about us", link: "/user/aboutUs" },
        { lable: "contact us", link: "/user/contactUs" },
        { lable: "FAQ", link: "/user/faq" },
      ],
    },
  ];

  return (
    <div className="header-container">
      <header className="header-section">
        <div className="header-logo">
          <Link to="/user/home">
            <TiHome className="icon-home" />
            Wonder Property
          </Link>
        </div>
        <div className="header-post-property">
          <Link to="/user/postProperty">
            Post Property
            <IoIosPaperPlane className="icon-nav" />
          </Link>
        </div>
      </header>

      <nav className="nav-container">
        <div className="toggle-div">
          <div className="toggle crose" onClick={() => setToggle(!toggle)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="menu-left">
          <ul>
            {navdata.map((item, index) => {
              return (
                <li key={index}>
                  <Dropdown data={item} key={index} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="menu-right">
          <ul>
            <li>
              <Link to="/user/saveProperty">
                Saved <CiHeart className="icon-nav-right" />
              </Link>
            </li>
            <li>
              <div className="dropdown">
                <button className="btnaccount">
                  account <FaRegCircleUser className="icon-nav-right" />
                </button>
                <div className="dropdown-content">
                  <Link to="/user/updateProfile">update profile</Link>
                  <Link to="/logout">logout</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <div className={`menu-hide  ${toggle ? "show-menu-hide" : ""}`}>
        <div className="hide-item">
          <div className="list-item">
            <div className="close-div">
              <p className="close" onClick={() => setToggle(!toggle)}>
                close
              </p>
              <div
                className="toggle toggle-crose"
                onClick={() => setToggle(!toggle)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            {navdata.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <h3>{item.lable}</h3>
                  {item.submenu.map((subitem, index) => {
                    return (
                      <Link to={subitem.link} key={index}>
                        {subitem.lable}
                      </Link>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
