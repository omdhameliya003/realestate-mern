import { useNavigate } from 'react-router-dom';
import "./404-Page.css"

function PageNotFound() {
 const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="error-container">
      <img
        src="/images/pagenotfound.png" 
        alt="Unauthorized"
        className="error-image"
      />
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-message">
         The page you are looking for does not exist.
      </p>
      <button className="error-button" onClick={handleGoBack}>
        ← Go Back
      </button>
    </div>
  )
}

export default PageNotFound