import React, { useState } from 'react'
import InputFild from '../../ui/InputFild';
import SelectFiel from '../../ui/SelectFiel';
import "./Form.css"
import Footer from '../../common/Footer';
import Navbar from '../../common/Navbar';
import { useAlert } from '../../common/AlertProvider';
import PropertyCard from '../../common/PropertyCard';

function Filter() {
    const { showAlert } = useAlert();
    const [filterResult,setFilterResult]=useState();
   
    const initialstate={
        state:"gujarat",
        city:"surat",
        offer:"sell",
        type:"flat",
        min_badget:"",
        max_badget:"",
        status:"ready to move",
        furnished:"furnished",
      }
      const [formData,setFormData]=useState(initialstate);

    const propertyType = ["flat", "house", "shop", "office"];
    const offerType = ["sell", "resell", "rent"];
    const cityName = ["surat", "ahmedabad", "rajkot", "bhavnagar", "vadodra"];
    const status = ["ready to move", "under construction"];
    const furnishedStatus = ["furnished", "semi-furnished", "unfurnished"];

    const handleChange=(e)=>{
    
   const {name,value}=e.target;

   setFormData((prev)=>({
    ...prev,
    [name]:value,
   }))

}  
   const handleSubmit= async(e)=>{
      e.preventDefault();
      try {
        const token= JSON.parse(localStorage.getItem("token")||"");
        const res= await fetch("http://localhost:5000/property/filter",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                 body:JSON.stringify(formData)
            });

            const result=  await res.json();
            setFilterResult(result.filterproperties)

            if(result.success){

                setFormData({...initialstate});
                
            }
            else{
                showAlert('error', result.message);
            }
      } catch (error) {
        console.log(error); 
        showAlert('error', "Something went wrong.");
      }
   }

  return (
    <>
    <Navbar/>
    <div className="form-container filter-form">
      <div className="my-form " id="property-form">
      <h3>filter your search</h3>
        <form onSubmit={handleSubmit} method="GET">
          <div className="property-flex">
          <InputFild
              lable="state"
              type="text"
              name="state"
              value="gujarat"
              placeholder="enter your state"
              readOnly
            />
           <SelectFiel
              lable="city"
              name="city"
              options={cityName}
              required
              value={formData.city}
              onChange={handleChange}
            />
            <SelectFiel
              lable="offer type "
              name="offer"
              options={offerType}
              required
              value={formData.offer}
              onChange={handleChange}
            />
            <SelectFiel
              lable="property type "
              name="type"
              options={propertyType}
              value={formData.type}
              required
              onChange={handleChange}
            />
              <InputFild
                type="number"
                lable="minimum budget"
                name="min_badget"
                required
                min="0"
                max="999999999"
                maxLength="10"
                placeholder="enter min badget"
                onChange={handleChange}
              />
              <InputFild
                type="number"
                lable="maximum budget"
                name="max_badget"
                required
                min="0"
                max="999999999"
                maxLength="10"
                placeholder="enter max badget"
                onChange={handleChange}
              />
            <SelectFiel
              lable="property status "
              name="status"
              options={status}
              required
              value={formData.status}
              onChange={handleChange}
            />
            <SelectFiel
              lable="furnished status"
              name="furnished"
              options={furnishedStatus}
              required
              value={formData.furnished}
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="serch property" className="btn" name="post" />
        </form>
      </div>
    </div>

    {
        filterResult && filterResult.length >0?
    <div className="listing-container">
    <h2>Filtered Properties</h2>
    {
         filterResult.map((item,index)=>{
            return <PropertyCard  cardDetail={item} key={item._id} propertydata={item}/>
        })
    }
    </div>:null
    }
    <Footer/>
    </>
  )
}

export default Filter