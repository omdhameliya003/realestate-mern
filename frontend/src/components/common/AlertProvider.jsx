import React, { useContext, createContext ,useState} from 'react'
import Swal from 'sweetalert2';

const AlertContext=createContext();
export const useAlert = () => useContext(AlertContext);
export function AlertProvider({children}) {

    const showAlert = (type, message) => {
        Swal.fire({
          icon: type, // success, error, warning, info, question
          title: message,
          showConfirmButton: false,
          timer: 2000,
        });
      };
    
  return (
    <AlertContext.Provider value={{alert,showAlert}}>
     {children}
    </AlertContext.Provider>
  )
}
