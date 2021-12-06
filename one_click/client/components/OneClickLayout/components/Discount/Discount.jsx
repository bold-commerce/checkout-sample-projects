/* eslint-disable react/forbid-prop-types */
import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Plus from '../Icons/Plus'
import { InputField, Button, Message } from '@boldcommerce/stacks-ui';
import { useDiscount } from '@boldcommerce/checkout-react-components';
import './Discount.css';
import { useAnalytics, useErrorLogging } from '../../../../hooks';

export const Discount = ({
  discountApplied, discountCode, applyDiscount, removeDiscount
}) => {
  const [discount, setDiscount] = useState(discountCode);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({});
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const discountRef = React.useRef();

  /**
    * Opens the discount modal
    */
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    if (status.errors && loading === false){
      discountRef.current.querySelector('input').focus();
    }
  }, [status.errors, loading])

  const submitDiscount = useCallback( async(discount, discountStatus = 'new') => {
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
        trackEvent('apply_discount_code');
    } catch(e) {
      setStatus({
        errors: e.body.errors,
      });
      logError('discount_code', e);
    }
    setLoading(false);
  }, []);


  const removeAndSubmitDiscount = useCallback(async (discount) => {
    setLoading(true);
    try {
      await removeDiscount(discount);
      // TODO: check if the discount was removed
      submitDiscount(discount, discountStatus='existing');
      trackEvent('apply_discount_code');
    } catch(e) {
      setStatus({
        errors: e.body.errors,
      })
      logError('discount_code', e);
    }
    setLoading(false);
  }, []);

  if (!open) return (
    <div className="DiscountLink" >
      <button onClick={openModal} aria-label="add discount code"><Plus className='DiscountPlus' />Discount code</button>
    </div>
  );

  return (
    <div className="SummaryBlock Summary__DiscountForm">
      <div className="DiscountForm" ref={discountRef}>
        <InputField
          id="discount_input"
          type="text"
          placeholder="Enter discount code"
          value={discount}
          messageText={status.errors && status.errors[0].message}
          messageType={status.errors && 'alert'}
          onChange={(e) => setDiscount(e.target.value)}
          disabled={loading}
          aria-invalid={status.errors ? true : null }
        />
        <Button
          aria-label='apply discount'
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
