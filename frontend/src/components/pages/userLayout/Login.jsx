import React, { useState } from "react";
import "./Form.css";
import "./Login-Register.css"
import { FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "../../common/AlertProvider";
import { useAuth } from "../../common/AuthContext";

function Login() {
  const [showpass, setShowpass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const { showAlert } = useAlert();
  const { setUser } = useAuth();

  const getprofile = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await fetch("https://wonder-property-backend.onrender.com/auth/me", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    const user_id = result.user._id;
    console.log("user_id from getprofile function1:-",result.user._id)
    console.log("user_id from getprofile function2:-",user_id)
    localStorage.setItem("user_id", JSON.stringify(user_id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      const res = await fetch("https://wonder-property-backend.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.token) {
        localStorage.setItem("token", JSON.stringify(result.token));
      }

      if (result.success) {
        getprofile();
        setEmail("");
        setPassword("");
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
        if (result.user.role) {
          if (result.user.role === "admin") {
            Navigate("/admin/dashboard");
          } else {
            Navigate("/user/home");
            showAlert("success", result.message);
          }
        } else {
          Navigate("/logout");
        }
        function handleLoginSuccess(token) {
          const payload = JSON.parse(atob(token.split(".")[1]));
          const expiryTime = payload.exp * 1000;
          localStorage.setItem("token", token);
          localStorage.setItem("tokenExpiry", expiryTime);
        }
        handleLoginSuccess(JSON.stringify(result.token));
      } else {
        showAlert("error", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      showAlert("error", "Something went wrong.");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="left-image-side">
        <img
          src="/images/dream-house.png"
          alt="Real Estate"
        />
      </div>
       <div className="right-form-side">
       <div className="form-container">
      <div className="my-form">
        <form onSubmit={handleSubmit}>
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
    </div>
    </div>
  );
}

export default Login;
