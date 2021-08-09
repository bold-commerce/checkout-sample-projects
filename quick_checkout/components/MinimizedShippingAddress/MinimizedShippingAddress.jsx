import React from 'react';
import PropTypes from 'prop-types';

const MinimizedShippingAddress = ({ step, onChangeStep, changeButtonText, shippingAddress }) => {
    if (shippingAddress) {
        return (
            <>
                <button className="CheckoutStep__ChangeBtn" onClick={() => onChangeStep(step)}>{changeButtonText}</button>
                <div className="CheckoutStep__Inner FieldSet">
                    <span>Shipping Address</span>
                    <div className="CheckoutStep__FieldSetInfoContainer">
                        <span className="CheckoutStep__FieldSetInfo">{shippingAddress.first_name} {shippingAddress.last_name}</span>
                        <span className="CheckoutStep__FieldSetInfo">{shippingAddress.address_line_1}</span>
                        <span className="CheckoutStep__FieldSetInfo">{shippingAddress.address_line_2}</span>
                        <span className="CheckoutStep__FieldSetInfo">{shippingAddress.city} {shippingAddress.province} {shippingAddress.postal_code}</span>
                        <span className="CheckoutStep__FieldSetInfo">{shippingAddress.country}</span>
                        <span className="CheckoutStep__FieldSetInfo">{shippingAddress.phone_number}</span>
                    </div>
                </div>
            </>
        );
    }
    return null;
};

MinimizedShippingAddress.propTypes = {
    step: PropTypes.number,
    onChangeStep: PropTypes.func,
    changeButtonText: PropTypes.string,
    shippingAddress: PropTypes.object,
};
  
export default React.memo(MinimizedShippingAddress);