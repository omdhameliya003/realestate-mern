import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute=({children,role})=>{
   const {user,loading}= useAuth();
 
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