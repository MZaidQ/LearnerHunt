import React from 'react';
import Classes from '/styles/cta.module.css';

const CTA = (props) => {
  // Define a style object to customize the button's color
  const buttonStyle = {
    color: props.color, 
    fontWeight: props.fontWeight // Use the provided color prop or default to black
    // You can add more styles here if needed, e.g., backgroundColor, padding, etc.
  };

  return (
    <div className={Classes['cta-btn']}>
      {/* Apply the buttonStyle object to the button */}
      <button style={buttonStyle} onClick={props.onClick}>
        {props.title}
      </button>
    </div>
  );
};

export default CTA;
