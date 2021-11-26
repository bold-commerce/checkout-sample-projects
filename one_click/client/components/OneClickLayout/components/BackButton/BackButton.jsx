import React from 'react';
import './BackButton.css';

const BackButton = ({ onClick }) => {
  return (
    <div>
      <button className="back-btn" type="button" onClick={onClick}>Back</button>
    </div>
  );
};

export default BackButton;
