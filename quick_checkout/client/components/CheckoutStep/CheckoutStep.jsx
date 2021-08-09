import React from 'react';
import PropTypes from 'prop-types';
import './CheckoutStep.css';

const OneClickStep = ({activeStep, step, stepTitle, expandedForms, minimizedForms}) => {

    if (activeStep == step) {
      return (
        <>  
          <h5 className="CheckoutStep__Title">{step+"."+stepTitle}</h5>
          {expandedForms.map((Form,index) => { 
            return (
              <div key={index}>{Form}</div>
            );
          }
          )}
        </>
      );
    } else if (activeStep > step) {
      return (
        <div className="CheckoutStep--Collapsed">
          <h5 className="CheckoutStep__Title">{step+"."+stepTitle}</h5>
          
          {minimizedForms.map((Form,index) => {
            return (
            <div key={index}>
              {Form}
            </div>
            )
          })}
        </div>
      );
    } else {
      return null;
    } 
};

OneClickStep.propTypes = {
    activeStep: PropTypes.number,
    step: PropTypes.number,
    stepTitle: PropTypes.string,
    expandedForms: PropTypes.array,
    minimizedForms: PropTypes.array
  };

export default OneClickStep;