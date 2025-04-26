import React, { useEffect, useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import MyListingCard from "../common/MyListingCard";

function MyListing() {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    async function myproperties() {
      const token = JSON.parse(localStorage.getItem("token") || "");
      const user_id = JSON.parse(localStorage.getItem("user_id") || "");
      const res = await fetch(`http://localhost:5000/property/${user_id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProperties(data.properties);
    }
    myproperties();
}, []);
console.log("mylisting:-",properties)
  return (
    <>
      <Navbar />
      {properties && properties.length > 0 ? (
         <div className="my_listingcontainer">
         <h2>My Listing</h2>{
             properties.map((item,index) => {
                 return <MyListingCard propertiesdata={item}  key={item._id}/>
                })
            }
            </div>
          )  
      : (
        <div className="no_property">
          <p>No listings found. Be the first to post a property!</p>
          <button className="add_mylisting_btn">
            <a href="post_property.php"> Add New </a>
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default MyListing;
