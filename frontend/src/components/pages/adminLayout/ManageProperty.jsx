import React, { useEffect, useState } from "react";
import AdminTable from "../../common/adminComponent/AdminTable";
import Sidebar from "../../common/adminComponent/Sidebar";
import Swal from "sweetalert2";
import { useAlert } from "../../common/AlertProvider";
import { useNavigate } from "react-router-dom";

function ManageProperty() {
  const [properties, setProperties] = useState("");
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const {showAlert}=useAlert();
  const Navigate = useNavigate();

  useEffect(() => {
    async function getProperties() {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const res = await fetch("https://wonder-property-backend.onrender.com/property", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const result =await res.json();
        setProperties(result.properties);
        filteredData(result.properties)
      } catch (error) {
        console.log(error);
      }
    }
    getProperties();
  },[]);


   useEffect(() => {
    const timeout = setTimeout(() => {
      const results = properties.filter((item) =>
        item.property_name.toLowerCase().includes(search.toLowerCase())||
        item.type.toLowerCase().includes(search.toLowerCase()) ||
        item.city.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(results);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, properties]);

  const propertyTableColumn = [
    { key: "property_name", lable: "Propety Name" },
    { key: "type", lable: "Type" },
    { key: "offer", lable: "Offer" },
    { key: "price", lable: "price", render:(row)=>row.offer && row.offer==='sell'? row.price:"-"  },
    { key: "rent", lable: "rent" ,render:(row)=>row.offer && row.offer==='rent'? row.price:"-" },
    { key: "city", lable: "City" },
    { key: "action",
      lable: "Action",
      render: (row) => {
       return  <div className="action-btn">
          <button onClick={(e)=>viewProperty(row._id)}>View</button>
          <button className="delete-btn" onClick={(e)=>handleDelete(row._id)}>Delete</button>
        </div>;
      },
    },
  ];

  const handleDelete= async (property_id)=>{
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
              const token= JSON.parse(localStorage.getItem('token'))
               const res= await fetch(`https://wonder-property-backend.onrender.com/property/${property_id}`,{
                  method:"DELETE",
                  headers:{
                      authorization:`Bearer ${token}`
                  }
               });
               const result= await res.json();
               if(result.success){
                  showAlert("success",result.message);
                  setProperties((prev)=>prev.filter((property)=>property._id!==property_id));
               }
          } catch (error) {
              console.log(error)
              showAlert('error',result.message)
          }
        }
  }

   const viewProperty = (property_id) => {
    const admin=true;
    Navigate("/user/viewProperty", { state: { property_id, admin}});
  };

  return (
    <div className="admin-container">
      <Sidebar/>
      <div className="content">
        <h2>All Properties</h2>
        <input type="text" id="search" placeholder="Search by City, Property name or Type" onChange={(e) => setSearch(e.target.value)} />
        <AdminTable column={propertyTableColumn} limit={5} data={filteredData} />
      </div>
    </div>
  );
}

export default ManageProperty;
