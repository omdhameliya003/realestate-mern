import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute=({children,role})=>{
   const {user,loading}= useAuth();

   console.log("user from protected route",user)
   console.log("role which need:-",role)
   
    if (loading) {
    return null; 
  }

   if(!user){
     return <Navigate to="/"  replace/>;
    }
    
    if(role && user?.role!== role){
     return <Navigate to="/unauthorized"  replace />
   }

   return children;
}

export default ProtectedRoute