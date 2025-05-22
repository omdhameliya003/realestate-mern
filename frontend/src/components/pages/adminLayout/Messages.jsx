import React, { useState, useEffect } from "react";
import Sidebar from "../../common/adminComponent/Sidebar";
import AdminTable from "../../common/adminComponent/AdminTable";
import Swal from "sweetalert2";
import { useAlert } from "../../common/AlertProvider";
import { useNavigate } from "react-router-dom";

function Messages() {
  const [messages, setMessages] = useState();
  const {showAlert}= useAlert();
  const Navigate =useNavigate();
  useEffect(() => {
    async function getMessages() {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const res = await fetch("http://localhost:5000/message", {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        setMessages(result.messages);
      } catch (error) {
        console.log(error);
      }
    }
    getMessages();
  }, []);
  
  const flatData = messages && messages.map((item) =>({...item,
      fname: item.user_id?.fname,
      email: item.user_id?.email,
    } ));
    
    console.log("messages:-", messages);
  const messageTableColumn = [
    { key:"fname" ,lable: "Name" },
    { key: "email", lable: "Email" },
    { key: "message", lable: "message" , render:(row)=> row.message?row.message.slice(0,30)+"...":""},
    { key: "createdAt", lable: "Date", render: (row) =>row.createdAt?
      row.createdAt .slice(0,10):"" },
    {
      key: "action",
      lable: "Action",
      render: (row) => {
       return <div className="action-btn">
          <button onClick={(e)=>handlereplayMessage(row._id)}>replay</button>
          <button onClick={(e)=>handleDelete(row._id)}>delete</button>
       </div>;
      },
    },
  ];

  const handlereplayMessage= (message_id)=>{
    Navigate("/admin/MessageReply", { state: {message_id}});
         
  }

   const handleDelete= async (Message_id)=>{
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
               const res= await fetch(`http://localhost:5000/message/${Message_id}`,{
                  method:"DELETE",
                  headers:{
                      authorization:`Bearer ${token}`
                  }
               });
               const result= await res.json();
               if(result.success){
                  showAlert("success",result.message);
                  setMessages((prev)=>prev.filter((message)=> message._id!==Message_id));
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
        <h2>Contact Messages</h2>
            <AdminTable column={messageTableColumn}  data={flatData} />
      </div>
    </div>
  );
}

export default Messages;
