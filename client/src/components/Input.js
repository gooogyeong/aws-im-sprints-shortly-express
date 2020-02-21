import React from 'react';
import './Input.css';

const Input = ({ onCreate, onChange, value }) => {
  return (
    <div className="input">
      <input value={value} onChange={onChange} />
      <div className="create-button" onClick={onCreate}>
        Shorten
      </div>
    </div>
  );
};

export default Input;
