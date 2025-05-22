import React, { useEffect, useState } from "react";
import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";
import MyListingCard from "../../common/MyListingCard";
import Swal from 'sweetalert2';
import { useAlert } from "../../common/AlertProvider";
import { useNavigate,Link } from "react-router-dom";

function MyListing() {
  const [properties, setProperties] = useState([]);
  const { showAlert } = useAlert();
  const Navigator= useNavigate();
  useEffect(() => {
    async function myproperties() {
      const token = JSON.parse(localStorage.getItem("token") || "");
      const user_id = JSON.parse(localStorage.getItem("user_id") || "");
      const res = await fetch(`http://localhost:5000/property/user/${user_id}`, {
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

 const handleDelete= async(property_id)=>{

  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  });
  
  if(result.isConfirmed){
    try {
      const token = JSON.parse(localStorage.getItem("token") || "");
      const res= await fetch(`http://localhost:5000/property/${property_id}`,{
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
 const result= await res.json();
 if(result.success){
   showAlert("success",result.message);
   setProperties((prev)=>prev.filter((property)=>property._id !==property_id));
  }else{
    showAlert("error",result.message);
 }
    } catch (error) {
    showAlert("error","Something went wrong! try agin");   
    }
  }

 }

  const viewProperty=(property_id)=>{
     Navigator("/user/viewProperty",{state:{property_id }});
  }

  const handleUpdate=(property_id)=>{
    Navigator("/user/postProperty",{state:{property_id}});
     console.log("property_id:-", property_id)
  }
  
  return (
    <>
      <Navbar />
      {properties && properties.length > 0 ? (
         <div className="my_listingcontainer">
         <h2>My Listing</h2>
         <div className="my_listing_flex">
         {
             properties.map((item,index) => {
                 return <MyListingCard propertiesdata={item}  key={item._id} onDelete={()=> handleDelete(item._id)} viewProperty={()=>viewProperty(item._id) } onUpdate={()=>handleUpdate(item._id)} />
                })
            }
            </div>
            </div>
          )  
      : (
        <div className="no_property">
          <p>No listings found. Be the first to post a property!</p>
          <button className="add_mylisting_btn">
            <Link to="/user/postProperty"> Add New </Link>
          </button>
        </div>
      )}
      <Footer />
    </>
  );
}

export default MyListing;
