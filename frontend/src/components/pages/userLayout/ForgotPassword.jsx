import React, { useState } from 'react';
import "./Form.css"
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../common/AlertProvider';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const Navigate= useNavigate();
  const {showAlert}=useAlert();

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://wonder-property-backend.onrender.com/auth/forgot-password', { 
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({email})
       });
       const result= await res.json()
       if(result.success){
        showAlert("success",result.message)
           setMessage(result.message);
           setError('');
           setStep(2);
       }else{
           showAlert("error",result.message)
       }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
      setMessage('');
    }
  };

  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://wonder-property-backend.onrender.com/auth/verify-otp', { 
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({email,otp})
       });
       const result= await res.json();
       if(result.success){
         showAlert("success",result.message)
          setMessage(result.message);
          setError('');
          setStep(3);
      }else{
          showAlert("error",result.message)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP.');
      setMessage('');
    }
  };

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://wonder-property-backend.onrender.com/auth/reset-password', { 
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({email,password,confirmPassword})
       });
       const result= await res.json();
       if(result.success){
         showAlert("success",result.message)
           setMessage(result.message);
           setError('');
        //    setStep(1);
        Navigate("/")
        }else{
            showAlert("error",result.message)
        }
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed.');
      setMessage('');
    }
  };

  return (
    <div className="form-container form-center">
      <div className="my-form">
        <h2>Forgot Password</h2>

        {/* {message && <p className="success-msg">{message}</p>} */}
        {/* {error && <p className="error-msg">{error}</p>} */}

        {step === 1 && (
          <form onSubmit={sendOtpHandler}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input className="btn" type="submit" value="Send OTP" />
          </form>
        )}

        {step === 2 && (
          <form onSubmit={verifyOtpHandler}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <input className="btn" type="submit" value="Verify OTP" />
          </form>
        )}

        {step === 3 && (
          <form onSubmit={resetPasswordHandler}>
            <input type="email" value={email} readOnly />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <input className="btn" type="submit" value="Reset Password" />
          </form>
        )}

        <div className="forgot-pass">
          <Link to="/">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};


export default ForgotPassword;
