import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../common/AlertProvider';


function Logout() {
    const { showAlert } = useAlert();
 localStorage.removeItem("user_id");
 localStorage.removeItem("token");
 const Navigate=useNavigate()
 
 useEffect(()=>{
    const auth= JSON.parse(localStorage.getItem("token"));
    if(!auth){
        Navigate("/") 
        showAlert('success', 'Logout Successful!');
    }
 },[Navigate])
 
  return null;
}

export default Logout