import React, { useEffect, useState } from "react";
import PropertyCard from "../../common/PropertyCard";
import { getProperties } from "../../common/propertydata";
import Navbar from "../../common/Navbar";
import Footer from "../../common/Footer";
import { useNavigate } from "react-router-dom";
import { useSave } from "../../common/SaveContext";
import { useAlert } from "../../common/AlertProvider";

function AllListing() {
  const Navigate = useNavigate();
  const {toggleSave } = useSave();

   const { showAlert } = useAlert();


  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("token"));
    if (!auth || auth === "") {
      Navigate("/");
    }
  }, [Navigate]);

  const [properties, setProperties] = useState([]);
 
  useEffect(() => {
    getProperties(setProperties);
  }, []);

  const onRequiest= async(property_id,owner_id)=>{
    console.log("property_id:-",property_id);
    console.log("owner_id:-",owner_id)
    const token= JSON.parse(localStorage.getItem("token")||"");
    const user_id= JSON.parse(localStorage.getItem("user_id")||"");
    console.log("user_id:-",user_id);
    const res= await fetch(`http://localhost:5000/requiest`,{
      method:"POST",
      headers:{
        "content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      },
      body:JSON.stringify({property_id,owner_id,user_id})
    });

    const result= await res.json();

    if(result.success){
    showAlert('success', result.message);
    }else{
      showAlert('warning', result.message);
    }
  }


  const viewProperty = (property_id) => {
    Navigate("/viewProperty", { state: { property_id } });
  };

  return (
    <>
      <Navbar />
      {
  properties && properties.length > 0 ?
   
      <div className="listing-container">
        <h2>All Listing</h2>
        {
          properties.map((item) => {
            return (
              <PropertyCard
                key={item._id}
                propertydata={item}
                viewProperty={() => viewProperty(item._id)}
                onSave={()=>toggleSave(item._id)}
                onRequiest={()=>onRequiest(item._id,item.user._id)}
              />
            );
          })}
      </div>
      :<div className="no_property">
      <p>No Listing Found.</p>
    </div>
    }
      <Footer />
    </>
  );
}

export default AllListing;
