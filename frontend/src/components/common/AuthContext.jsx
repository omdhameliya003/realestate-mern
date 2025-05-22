import React, { createContext, useContext, useEffect, useState } from "react"

const AuthContext= createContext();

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
      const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const storedUser=JSON.parse(localStorage.getItem('user'));
        if(storedUser){
            setUser(storedUser)
        }
        setLoading(false);
    },[])

    return (
        <AuthContext.Provider value={{user,setUser,loading}}>
           {children}
        </AuthContext.Provider>
    )

}
export const useAuth= ()=>useContext(AuthContext);