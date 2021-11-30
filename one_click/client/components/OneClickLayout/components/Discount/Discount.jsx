/* eslint-disable react/forbid-prop-types */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { InputField, Button, Message } from '@boldcommerce/stacks-ui';
import { useDiscount } from '@boldcommerce/checkout-react-components';
import './Discount.css';

export const Discount = ({
  discountApplied, discountCode, applyDiscount, removeDiscount
}) => {
  const [discount, setDiscount] = useState(discountCode);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [status, setStatus] = useState({});

  /**
  * Opens the discount modal
  */
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);


  const submitDiscount = async (discount, discountStatus = 'new') => {
      setLoading(true);
      try {
          await applyDiscount(discount);
          setStatus(() => {
            return discountStatus === 'existing' ? {
              info: {
                message: 'The previous discount code was removed. Only one discount code may be applied at a time.',
              }
            } : {
              success: {
                message: 'Discount applied successfully',
              }
            }
          });
      } catch(e) {
        setStatus({
          errors: e.body.errors,
        })
      }
      setLoading(false);
  };

  const removeAndSubmitDiscount = async (discount) => {
    setLoading(true);
    try {

      await removeDiscount(discount);
      // TODO: check if the discount was removed
      submitDiscount(discount, discountStatus='existing');
    } catch(e) {
      setStatus({
        errors: e.body.errors,
      })
    }
    setLoading(false);
};

  if (!open) return (
    <div className="DiscountLink" onClick={openModal}>Discount code</div>
  );

  return (
    <div className="SummaryBlock Summary__DiscountForm">
      <div className="DiscountForm">
        <InputField
          type="text"
          placeholder="Enter discount code"
          value={discount}
          messageText={status.errors && status.errors[0].message}
          messageType={status.errors && 'alert'}
          onChange={(e) => setDiscount(e.target.value)}
          disabled={loading}
        />
        <Button
          primary={discountApplied || discount.length > 0}
          disabled={discount.length === 0 || loading}
          loading={loading}
          onClick={() => {
            if (discountApplied) {
              removeAndSubmitDiscount(discount);
            } else {
              submitDiscount(discount);
            }
          }}
        >
          Apply
        </Button>
        {
          (status.success || status.info) && (
            <Message
              type={status.success ? 'success' : 'info'}
              className="DiscountForm__Message"
            >
              {status?.success?.message || status?.info?.message}
            </Message>
          )
        }

      </div>
    </div>
  );
};

Discount.propTypes = {
  discountApplied: PropTypes.bool,
  discountCode: PropTypes.string,
  discountErrors: PropTypes.object,
  applyDiscount: PropTypes.func,
  removeDiscount: PropTypes.func,
};

const MemoizedDiscount = React.memo(Discount);

const DiscountContainer = () => {
  const { data, applyDiscount, removeDiscount } = useDiscount();

  return (
    <MemoizedDiscount
      discountApplied={data.discountApplied}
      discountCode={data.discountCode}
      applyDiscount={applyDiscount}
      removeDiscount={removeDiscount}
    />
  );
};

export default DiscountContainer;
