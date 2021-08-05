/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Message } from '@boldcommerce/stacks-ui';
import { useDiscount } from '../../hooks';
import './QuickCheckoutDiscount.css';

const QuickCheckoutDiscount = ({
  discountApplied, discountCode, discountErrors, applyDiscount,
}) => {
    const [discount, setDiscount] = useState(discountCode);
    const [minimized, setMinimized] = useState(true);

    const toggleCollapseDiscount = () => setMinimized(!minimized);

    const submitDiscount = async () => {
        try {
            await applyDiscount(discount);
            toggleCollapseDiscount();
        } catch(e) {
            console.error(e);
        }
    };

    if (minimized) {
        return (
            <>
                <div className="FieldSet DiscountFormContainer--Collapsed" onClick={toggleCollapseDiscount}>
                    <span>&#43;</span>
                    <div className="SpacingDiv"></div>
                    <span className="DiscountForm__Title">Discount code</span>
                </div>
                { 
                    discountApplied && (
                    <div className="FieldSet">
                        <Message type="success">
                            <p>Discount applied</p>
                        </Message>
                    </div>
                    )
                }
            </>
        );
    } else {
        return (
            <>
                <div className="FieldSet Summary__DiscountForm">
                    <div className="DiscountForm">
                        <Input
                        type="text"
                        placeholder="Enter discount code"
                        value={discount}
                        messagetext={discountErrors && discountErrors.discounts}
                        messageType={discountErrors && 'alert'}
                        onChange={(e) => setDiscount(e.target.value)}
                        disabled={discountApplied}
                        />
                        <Button
                        primary={discountApplied || discount.length > 0}
                        disabled={discount.length === 0 || discountApplied}
                        onClick={submitDiscount}
                        >
                        Apply
                        </Button>
                    </div>
                </div>
                {
                    discountErrors && (
                    <div className="FieldSet">
                        <div className="DiscountForm__error">
                            <Message type="alert">
                                <p>{ discountErrors.discounts }</p>
                            </Message>
                        </div>
                    </div>
                    )
                }
            </>
        );
    }
};

QuickCheckoutDiscount.propTypes = {
  discountApplied: PropTypes.bool,
  discountCode: PropTypes.string,
  discountErrors: PropTypes.object,
  applyDiscount: PropTypes.func,
};

const MemoizedQuickCheckoutDiscount = React.memo(QuickCheckoutDiscount);

const QuickCheckoutDiscountContainer = () => {
  const {
    discountApplied, discountCode, discountErrors, applyDiscount,
  } = useDiscount();

  return (
    <MemoizedQuickCheckoutDiscount
      discountApplied={discountApplied}
      discountCode={discountCode}
      discountErrors={discountErrors}
      applyDiscount={applyDiscount}
    />
  );
};

export default QuickCheckoutDiscountContainer;
