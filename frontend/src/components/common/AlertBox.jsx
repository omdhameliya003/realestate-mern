
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const AlertBox = ({ type, message, trigger, setTrigger }) => {
  useEffect(() => {
    if (trigger) {
      Swal.fire({
        icon: type,    
        title: type === 'success' ? 'Success' : 'Alert',
        text: message,
        timer: 2000,
        showConfirmButton: false,
      });
      setTrigger(false);
    }
  }, [trigger]);

  return null;
};

export default AlertBox;
