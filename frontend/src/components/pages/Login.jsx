import React, { useState } from "react";
import "./Form.css";
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {useAlert} from './../common/AlertProvider';

function Login() {
  const [showpass, setShowpass] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const Navigate = useNavigate();
  const { showAlert } = useAlert();

 const getprofile= async()=>{

 const token=JSON.parse(localStorage.getItem("token")) || "";
 console.log( "getprofile token:-",token)
  const res = await fetch("http://localhost:5000/auth/me", {
    method: "GET",
    headers: {
      "content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(),
  });
  const result= await res.json()
  console.log(result)
  const user_id=result.user.user_id;
  localStorage.setItem("user_id",JSON.stringify(user_id))
 }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result);
      if(result.token){
        localStorage.setItem("token",JSON.stringify(result.token));
      }

      if (result.success) {
         getprofile();
        setEmail("");
        setPassword("");
        Navigate("/home");
        showAlert('success', 'Login Successful!');
      } else {
        showAlert('error', 'Fail to Login');
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert('error', "Something went wrong.");
    }
  };

  return (
    <div className="form-container form-center">
      <div className="my-form">
        <form action="" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input
            type="email"
            value={email}
            placeholder="enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="field-password">
            <input
              type={showpass ? "text" : "password"}
              value={password}
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaRegEye
              className="field-icon"
              onClick={() => setShowpass(!showpass)}
            />
          </div>
          <div className="forgot-pass">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <p className="login-not-account">
            don't have an account? <Link to="/register">Register Now</Link>
          </p>
          <input type="submit" value="Login Now" />
        </form>
      </div>
      </div>
   
  );
}

export default Login;
