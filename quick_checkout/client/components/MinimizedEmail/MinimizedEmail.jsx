import React from 'react';
import PropTypes from 'prop-types';

const MinimizedEmail = ({ step, changeButtonText, onChangeStep, isLoggedIn, customerEmail }) => (
    <>
        <button className="CheckoutStep__ChangeBtn" onClick={() => onChangeStep(step)} >{changeButtonText}</button> {isLoggedIn && (<span className="CheckoutStep__NotYou">Not you?&nbsp;</span>)} 
        <div className="CheckoutStep__Inner FieldSet">
            <span>Email</span>
            <div className="CheckoutStep__FieldSetInfoContainer">
                <span className="CheckoutStep__FieldSetInfo">{customerEmail}</span>
            </div>
        </div>
    </>
);

MinimizedEmail.propTypes = {
    step: PropTypes.number,
    changeButtonText: PropTypes.string,
    onChangeStep: PropTypes.func,
    isLoggedIn: PropTypes.bool,
    customerEmail: PropTypes.string,
};

export default React.memo(MinimizedEmail);