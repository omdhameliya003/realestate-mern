import React, { useEffect, useState } from "react";
import InputFild from "../ui/InputFild";
import SelectFiel from "./../ui/SelectFiel";
import CheckBox from "../ui/CheckBox";
import "./PostProperty.css";
import "./Form.css";
import TextArea from "./../ui/TextArea";
import { useNavigate } from "react-router-dom";
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"

function PostProperty() {
  const Navigate = useNavigate();
  // useEffect(()=>{
  //     const auth= JSON.parse(localStorage.getItem("user_id"));
  //     if(!auth || auth===""){
  //       Navigate("/")
  //     }
  //  },[Navigate])

  const initialformData = {
    property_name: "",
    type: "flat",
    offer: "sell",
    price: "",
    deposite: "",
    address: "",
    city: "surat",
    state: "gujarat",
    status: "ready to move",
    furnished: "furnished",
    bhk: "1",
    bedroom: "0",
    bathroom: "1",
    balcony: "1",
    carpet: "",
    age: "",
    total_floor: "",
    room_floor: "",
    loan: "available",
    description: "",
    amities: {
      lift: "no",
      security_guard: "no",
      play_ground: "no",
      garden: "no",
      water_supply: "no",
      power_backup: "no",
      fire_security: "no",
      parking_area: "no",
      gym: "no",
      cctv_cameras: "no",
      shopping_mall: "no",
      hospital: "no",
      school: "no",
      market_area: "no",
    },
    image_01:null,
    image_02:null,
    image_03:null,
    image_04:null,
    image_05:null,
  };
  const [formData, setformData] = useState(initialformData);

  const [type, setType] = useState();

  useEffect(() => {
    setType(formData.type);
  }, [formData.type]);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user_id"));
    setformData((prev) => ({ ...prev, userId: userId }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    const amitiesFields = [
      "lift",
      "security_guard",
      "play_ground",
      "garden",
      "water_supply",
      "power_backup",
      "fire_security",
      "parking_area",
      "gym",
      "cctv_cameras",
      "shopping_mall",
      "hospital",
      "school",
      "market_area",
    ];

    if (amitiesFields.includes(name)) {
      setformData((prev) => ({
        ...prev,
        amities: {
          ...prev.amities,
          [name]: checked ? "yes" : "no",
        },
      }));
    } else if (type === "checkbox") {
      setformData((prev) => ({
        ...prev,
        [name]: checked ? "yes" : "no",
      }));
    } else if (type === "file") {
      setformData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setformData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const filedata= new FormData(); 
    // for (const key in formData) {
    //   if (formData[key]) {
    //     filedata.append(key, formData[key]);
    //   }
    // }    
    for (const key in formData) {
      if (formData[key]) {
        if (typeof formData[key] === 'object' && !(formData[key] instanceof File)) {
          // If object (but not File like image), then stringify
          filedata.append(key, JSON.stringify(formData[key]));
        } else {
          filedata.append(key, formData[key]);
        }
      }
    }
    
    try {
      const token = JSON.parse(localStorage.getItem("token") || "");
      const res = await fetch("http://localhost:5000/property", {
        method: "POST",
        headers: {
          // "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body:filedata,
      });
      const result = await res.json();
      if (result.success) {
        alert("property posted successfully.");
        setformData({ ...initialformData });
      } else {
        alert(result.message || "postproperty failed.");
      }
    } catch (error) {
      alert("Something went wrong.", error);
    }
  };

  const propertyType = ["flat", "house", "shop", "office"];
  const offerType = ["sell", "resell", "rent"];
  const cityName = ["surat", "ahmedabad", "rajkot", "bhavnagar", "vadodra"];
  const status = ["ready to move", "under construction"];
  const furnishedStatus = ["furnished", "semi-furnished", "unfurnished"];
  const bhk = [
    {
      value: "1",
      option: "1 bhk",
    },
    {
      value: "2",
      option: "2 bhk",
    },
    {
      value: "3",
      option: "3 bhk",
    },
    {
      value: "4",
      option: "4 bhk",
    },
    {
      value: "5",
      option: "5 bhk",
    },
  ];

  const bedroom = [
    { value: "0", option: "0 bedroom" },
    {
      value: "1",
      option: "1 bedroom",
    },
    {
      value: "2",
      option: "2 bedroom",
    },
    {
      value: "3",
      option: "3 bedroom",
    },
    {
      value: "4",
      option: "4 bedroom",
    },
    {
      value: "5",
      option: "5 bedroom",
    },
  ];

  const bathroom = [
    {
      value: "1",
      option: "1 bathroom",
    },
    {
      value: "2",
      option: "2 bathroom",
    },
    {
      value: "3",
      option: "3 bathroom",
    },
    {
      value: "4",
      option: "4 bathroom",
    },
    {
      value: "5",
      option: "5 bathroom",
    },
  ];
  const balcony = [
    {
      value: "1",
      option: "1 balcony",
    },
    {
      value: "2",
      option: "2 balcony",
    },
    {
      value: "3",
      option: "3 balcony",
    },
    {
      value: "4",
      option: "4 balcony",
    },
    {
      value: "5",
      option: "5 balcony",
    },
  ];

  const loan = ["available", "not available"];

  const amities1 = [
    { name: "lift", lable: "lift" },
    { name: "security_guard", lable: "security guard" },
    { name: "play_ground", lable: "play  ground" },
    { name: "garden", lable: "garden" },
    { name: "water_supply", lable: "water supply" },
    { name: "power_backup", lable: "power backup" },
    { name: "fire_security", lable: "fire alerm" },
  ];

  const amities2 = [
    { name: "parking_area", lable: "parking area" },
    { name: "gym", lable: "gym" },
    { name: "cctv_cameras", lable: "cctv cameras" },
    { name: "shopping_mall", lable: "shopping mall" },
    { name: "hospital", lable: "hospital" },
    { name: "school", lable: "school" },
    { name: "market_area", lable: "market area" },
  ];

  return (
    <>
    <Navbar/>
    <div className="form-container">
      <div className="my-form " id="property-form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <h3>Property Details</h3>

          <InputFild
            lable="property name"
            type="text"
            name="property_name"
            placeholder="enter property name"
            value={formData.property_name}
            required
            onChange={handleChange}
          />

          <div className="property-flex">
            <SelectFiel
              lable="property type "
              name="type"
              options={propertyType}
              value={formData.type}
              required
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
            <InputFild
              lable="property price"
              type="number"
              name="price"
              placeholder="enter property price or rent"
              value={formData.price}
              required
              onChange={handleChange}
            />
            <InputFild
              lable="deposite amount"
              type="number"
              name="deposite"
              placeholder="enter deposite amount"
              required
              value={formData.deposite}
              onChange={handleChange}
            />
            <InputFild
              lable="property address"
              type="text"
              name="address"
              placeholder="enter property full address"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <SelectFiel
              lable="city"
              name="city"
              options={cityName}
              required
              value={formData.city}
              onChange={handleChange}
            />

            <InputFild
              lable="state"
              type="text"
              name="state"
              value="gujarat"
              placeholder="enter your state"
              readOnly
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

            {type === "flat" || type === "house" ? 
              <>
                <SelectFiel
                  lable="how many BHK"
                  name="bhk"
                  options={bhk}
                  required
                  value={formData.bhk}
                  onChange={handleChange}
                />
                <SelectFiel
                  lable="how many bedrooms"
                  name="bedroom"
                  options={bedroom}
                  required
                  value={formData.bedroom}
                  onChange={handleChange}
                />

                <SelectFiel
                  lable="how many bathrooms"
                  name="bathroom"
                  options={bathroom}
                  required
                  value={formData.bathroom}
                  onChange={handleChange}
                />

                <SelectFiel
                  lable="how many balconys"
                  name="balcony"
                  options={balcony}
                  required
                  value={formData.balcony}
                  onChange={handleChange}
                />
              </>:null
            }
            <InputFild
              lable="carpet area"
              type="number"
              name="carpet"
              placeholder="how many squarefits?"
              required
              value={formData.carpet}
              onChange={handleChange}
            />
            <InputFild
              lable="property age"
              type="number"
              name="age"
              placeholder="how old is property?"
              required
              value={formData.age}
              onChange={handleChange}
            />
            <InputFild
              lable="total floors"
              type="number"
              name="total_floor"
              placeholder="how many floors available?"
              required
              value={formData.total_floor}
              onChange={handleChange}
            />
            <InputFild
              lable="floor room"
              type="number"
              name="room_floor"
              placeholder="property floor number"
              required
              value={formData.room_floor}
              onChange={handleChange}
            />
            <SelectFiel
              lable="loan"
              name="loan"
              options={loan}
              required
              value={formData.loan}
              onChange={handleChange}
            />
          </div>

          <TextArea
            lable="property description"
            name="description"
            maxLength="1000"
            required
            value={formData.description}
            cols=""
            rows="6"
            placeholder="write about property..."
            onChange={handleChange}
          />

          <div className="checkbox">
            <div>
              <CheckBox facilites={amities1} onChange={handleChange} />
            </div>
            <div>
              <CheckBox facilites={amities2} onChange={handleChange} />
            </div>
          </div>

          <InputFild
            lable="image 01"
            type="file"
            name="image_01"
            accept="image/*"
            required
            onChange={handleChange}
          />
          <div className="property-flex">
            <InputFild
              lable="image 02"
              type="file"
              name="image_02"
              accept="image/*"
              onChange={handleChange}
            />
            <InputFild
              lable="image 03"
              type="file"
              name="image_03"
              accept="image/*"
              onChange={handleChange}
            />
            <InputFild
              lable="image 04"
              type="file"
              name="image_04"
              accept="image/*"
              onChange={handleChange}
            />

            <InputFild
              lable="image 05"
              type="file"
              name="image_05"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <InputFild
            type="submit"
            value="post property"
            className="btn"
            name="post"
            onChange={handleChange}
          />
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default PostProperty;
