import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="success-page">
      <h1>Catalog Data Submitted Successfully!</h1>
      <button onClick={goBack}>Go Back to Home</button>
    </div>
  );
}

export default SuccessPage;