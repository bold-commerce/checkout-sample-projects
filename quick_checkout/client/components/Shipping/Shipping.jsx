import React, { memo, useEffect, useRef } from 'react';
import { useShippingAddress, useShippingLines } from '@boldcommerce/checkout-react-components';
import { ShippingAddress } from '../ShippingAddress';
import { ShippingLines } from '../ShippingLines';
import { CheckoutStep } from '../CheckoutStep';
import { Link, useNavigate } from 'react-router-dom';
import { CondensedSection } from '../CondensedSection';
import { ConfirmationButton } from '../ConfirmationButton';

const Shipping = ({ condensed }) => {
  return <MemoizedShipping condensed={condensed} />
}

const MemoizedShipping = memo(({ condensed }) => {
  const loading = false;
  const navigate = useNavigate();
  const { data: shippingAddress } = useShippingAddress();
  const { data } = useShippingLines();
  const disabled = !shippingAddress?.country_code && !data.selectedShippingLineIndex;
  const sectionRef = useRef();

  const handleSubmit = () => {
    navigate('/billing');
  };

  useEffect(() => {
    if (!condensed && sectionRef.current) {
      sectionRef.current.scrollIntoView();
    }
  }, [condensed]);

  if (condensed) {
    return (
      <CheckoutStep
        className="CheckoutStep--Shipping"
        title="2. Shipping"
        action={<Link to="/shipping" className="FieldSet__Action">Change</Link>}
      >
        <CondensedSection 
          title="Shipping address"
        >
          <p>shipping address here</p>
        </CondensedSection>
        <CondensedSection 
          title="Shipping method"
        >
          <p>shipping method here</p>
        </CondensedSection>
      </CheckoutStep>
    );
  }

  return (
    <CheckoutStep
      className="CheckoutStep--Shipping"
      title="2. Shipping"
      ref={sectionRef}
    >
      <ShippingAddress />
      <ShippingLines />
      <ConfirmationButton text="Continue to billing" loading={loading} disabled={disabled || loading} onClick={handleSubmit} />
    </CheckoutStep>
  );
});

export default Shipping;
