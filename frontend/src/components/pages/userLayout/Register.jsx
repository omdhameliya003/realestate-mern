import React, {useState } from 'react'
import "./Form.css";
import "./Login-Register.css"
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useAlert } from '../../common/AlertProvider';

function Ragister() {
  const [formData,setFormData]=useState({
    fname:"",
    lname:"",
    age:"",
    email:"",
    mobile:"",
    password:"",
    conpass:"",
  });
  const [errors,setErrors]=useState({})
  const [showpass,setShowpass]=useState(false);

  const {showAlert}= useAlert();
  const handleChange=(e)=>{
    const {name, value}=e.target;
    setFormData((pre)=>({...pre,[name]:value}))

  }

  const validation=()=>{
    const nameRegex = /^[A-Za-z]+$/;

    if(!formData.fname && formData.fname<2){
      setErrors({ fname: "*first name must be contain minimam 2 character." });
      return false;
    }else if (!nameRegex.test(formData.fname)) {
      setErrors({ fname: "*please enter a valid first name." });
    return false;
    }

    if (!formData.lname || formData.lname.length < 3) {
      setErrors({ lname: "*last name must be contain minimam 3 character." });
      return false;
    } else if (!nameRegex.test(formData.lname)) {
      setErrors({ lname: "*Please enter a valid last name." });
      return false;
    }

    if (!formData.age || isNaN(formData.age) || Number(formData.age) <= 0) {
      setErrors({ age: "*Please enter a valid age." });
      return false;
    } else if (formData.age < 18) {
      setErrors({ age: "*age is not valid under 18 years."});
      return false;
    }

    if (!formData.email) {
      setErrors({ email: "*email is not valid to empty." });
    return false;
    } else if (formData.email.indexOf('@') <= 0) {
      setErrors({ email: "*invalid position of '@'" });
    return false;
    } else if (
      formData.email.charAt(formData.email.length - 4) !== '.' &&
      formData.email.charAt(formData.email.length - 3) !== '.'
    ) {
      setErrors({ email:"*invalid position of '."  });
      return false;
    }

    if (!formData.mobile || isNaN(formData.mobile) || formData.mobile.length !== 10) {
      setErrors({ mobile: "*Enter a valid 10-digit mobile number." });
    return false;
    }else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      setErrors({ mobile: "*Mobile number must start with 6, 7, 8, or 9."});
    return false;
  }
 
  if (!formData.password) {
    setErrors({ password: "*Password cannot be empty." });
    return false;
  } else if (formData.password.length < 8) {
    setErrors({ password: "*Password must be at least 8 characters long." });
    return false;
  } else if (!/[A-Z]/.test(formData.password)) {
    setErrors({ password: "*Password must contain at least one uppercase letter." });
    return false;
  } else if (!/[a-z]/.test(formData.password)) {
    setErrors({ password: "*Password must contain at least one lowercase letter." });
    return false;
  } else if (!/[0-9]/.test(formData.password)) {
    setErrors({ password: "*Password must contain at least one digit." });
    return false;
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
    setErrors({ password: "*Password must contain a special character." });
    return false;
  }

  if (!formData.conpass || formData.conpass !== formData.password) {
    setErrors({ conpass: "*password or confirm password not match." });
    return false;
  }

  setErrors({});
  return true;

  }

  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(!validation()){
      return
    }

    if(validation()){

      const data={
        fname: formData.fname,
        lname: formData.lname,
        age: formData.age,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        conpass: formData.conpass,
      };

      try {
        const res= await fetch("https://wonder-property-backend.onrender.com/auth/register",{
          method:"POST",
          headers:{
            "content-Type":"application/json"
          },
          body:JSON.stringify(data)
        });

        const result = await res.json();
        console.log(result);

        if (result.success) {
          showAlert("success", result.message)
          setFormData({
            fname: '',
            lname: '',
            age: '',
            email: '',
            mobile: '',
            password: '',
            conpass: '',
          });
        } else {
          showAlert("error",result.message)
          validation(); 
        }
      } catch (error) {
        console.error("Error:", error);
        showAlert("error","something went wrong..")
      }
    }
  }

  return (
    <div className="form-wrapper">
      <div className="left-image-side">
        <img
          src="/images/dream-house.png"
          alt="Real Estate"
        />
      </div>
       <div className="right-form-side">
    <div className='form-container'>
      <div className='my-form'>
      <form action="" onSubmit={handleSubmit} >
        <h2>Create An Account</h2>

        <input type="text" name='fname' placeholder='enter first name'
         value={formData.fname} onChange={handleChange} />
         {errors.fname && <span className="error">{errors.fname}</span>}

        <input type="text" name='lname' placeholder='enter last name'
         value={formData.lname}onChange={handleChange} />
          {errors.lname && <span className="error">{errors.lname}</span>}

        <input type="text" name='age' placeholder='enter your age' 
        value={formData.age} onChange={handleChange} />
         {errors.age && <span className="error">{errors.age}</span>}

        <input type="email" name='email' placeholder='enter your email'
         value={formData.email} onChange={handleChange}/>
          {errors.email && <span className="error">{errors.email}</span>}

        <input type="number" name='mobile' placeholder='enter mobile number' 
        value={formData.mobile} onChange={handleChange} />
         {errors.mobile && <span className="error">{errors.mobile}</span>}

        <div className='field-password'>
        <input type={showpass? "text":"password"} name='password' 
        placeholder='enter your password' 
        value={formData.password} onChange={handleChange} />

        <FaRegEye  className='field-icon' onClick={()=>setShowpass(!showpass)}/>
        </div>
        {errors.password && <span className="error">{errors.password}</span>}

        <input type="password" name='conpass' placeholder='confirm password'
         value={formData.conpass} onChange={handleChange} />
          {errors.conpass && <span className="error">{errors.conpass}</span>}

        <p>already have an account? <Link to="/">Login Now</Link> </p>
        <input type="submit" value="Register Now"   onClick={validation}/>
      </form>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Ragister