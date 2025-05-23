import React, { useEffect, useState } from "react";
import AdminTable from "../../common/adminComponent/AdminTable";
import Sidebar from "../../common/adminComponent/Sidebar";
import Swal from "sweetalert2";
import { useAlert } from './../../common/AlertProvider';

function ManageUser() {
    const [alluser,setallUser]=useState();
    const {showAlert}=useAlert();

    useEffect(()=>{
    async function getUsers(){
          const token = JSON.parse(localStorage.getItem("token"));
        try {
             const res= await fetch("http://localhost:5000/auth/alluser", {
            method: "GET",
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        const result= await res.json();
        setallUser(result.allUser)
        } catch (error) {
            console.log(error)
        }
    }
    getUsers();
    },[])

  const userTableColumn = [
    { key: "user_id", lable: "User Id" },
    { key: "fname", lable: "Name" },
    { key: "email", lable: "Email" },
    { key: "role", lable: "Role" },
    {key:"ChangeRole" , lable:"ChangeRole" , 
    render:(row)=>(
        <button  onClick={(e)=>handleRolls(row._id,row.role==="user"?"admin":"user")}>{row.role==='user'?"Make Admin":"Make User"}</button>
    )
    },
    {key:"action" , lable:"Action" , 
    render:(row)=>(
        <button  onClick={(e)=>handleDelete(row._id)}>Delete</button>
    )
    }
  ];


  const handleRolls= async (userid,role)=>{
    console.log("role from change Role..:-",role)
        const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You want change role.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
      });

      if(result.isConfirmed){
        try {
          const token= JSON.parse(localStorage.getItem('token'))
          const res= await fetch(`http://localhost:5000/auth/changerole/${userid}`,{
            method:"PUT",
            headers:{
                 'content-type':'application/json',
                  authorization:`Bearer ${token}`
            },
            body:JSON.stringify({role})
          });
           const result= await res.json();
           if(result.success){
            showAlert("success",result.message);
           }
        } catch (error) {
          console.log(error)
          showAlert('error',result.message)
        }
      }
  }

  const handleDelete= async (userid)=>{
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
          console.log(userid)
            const token= JSON.parse(localStorage.getItem('token'))
             const res= await fetch(`http://localhost:5000/auth/delete-user/${userid}`,{
                method:"DELETE",
                headers:{
                    authorization:`Bearer ${token}`
                }
             });
             const result= await res.json();
             if(result.success){
                showAlert("success",result.message);
                setallUser((prev)=>prev.filter((user)=>user._id!==userid));
             }
        } catch (error) {
            console.log(error)
            showAlert('error',result.message)
        }
      }
  }

  return (
    <div className="admin-container">
        <Sidebar/>
      <div className="content">
        <h2>Manage Users</h2>
        <AdminTable column={userTableColumn} data={alluser} />
      </div>
    </div>
  );
}

export default ManageUser;
