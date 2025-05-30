import React, { createContext, useContext, useState, useEffect } from "react";
import { useAlert } from "./AlertProvider";

const SaveContext = createContext();

export const useSave = ()=> useContext(SaveContext);

 

export const SaveProvider= ({children})=>{
  const [savedProperties, setSavedProperties] = useState([]);
  const { showAlert } = useAlert();

     useEffect(()=>{
       const token = JSON.parse(localStorage.getItem("token"));
       const user_id = JSON.parse(localStorage.getItem("user_id"));

      const fetchSaved = async () => {
        const res = await fetch(`https://wonder-property-backend.onrender.com/saveProperty/user/${user_id}`,{
          method:"GET",
        headers:{
          Authorization:`Bearer ${token}`,
        }
        },[user_id]);

        const data = await res.json();
        setSavedProperties(data.propertyIds); 
      };
      if(token && user_id){
        fetchSaved();
      }
     },[])


      async function toggleSave(property_id){

        const token = JSON.parse(localStorage.getItem("token"));
        const user_id = JSON.parse(localStorage.getItem("user_id"));
        const isSaved= savedProperties.includes(property_id);

        const endpoint= isSaved ?"/unsaveProperty":"/saveProperty";

        const res = await fetch(
          `https://wonder-property-backend.onrender.com${endpoint}`,
          {
            method: "POST",
            headers: {
              "Content-Type":"application/json",
              Authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({ user_id: user_id, property_id: property_id })
          }
        );
        
        const result = await res.json();
        if (result.success) {
          showAlert("success", result.message);

          setSavedProperties(prev =>
            isSaved
              ? prev.filter(id => id !== property_id)
              : [...prev, property_id]
          );
        } else {
          showAlert("error", result.message);
        }
      };

      return (
        <SaveContext.Provider value={{savedProperties, toggleSave}}>
              {children}
        </SaveContext.Provider>
      )

}


