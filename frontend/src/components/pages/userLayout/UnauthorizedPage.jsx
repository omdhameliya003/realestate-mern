import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UnauthorizedPage.css'


const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="unauth-container">
      <img
        src="/images/unauthorized.jpg" 
        alt="Unauthorized"
        className="unauth-image"
      />
      <h1 className="unauth-title">401 - Unauthorized</h1>
      <p className="unauth-message">
        You do not have permission to access this page.
      </p>
      <button className="unauth-button" onClick={handleGoBack}>
        ← Go Back
      </button>
    </div>
  );
};

export default UnauthorizedPage;
