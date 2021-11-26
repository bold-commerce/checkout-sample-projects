import React, { useCallback } from 'react';
import { useLoadingStatus, useSavedAddresses, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { BackButton } from '../BackButton';
import ShippingAddressList from './ShippingAddressList';
import ShippingLines from '../ShippingLines/ShippingLines';
import './Shipping.css';

const Shipping = () => {
  const { data: shippingAddress, submitShippingAddress } = useShippingAddress();
  const { data: savedAddresses } = useSavedAddresses();
  const { shippingAddressLoadingStatus, shippingLinesLoadingStatus } = useLoadingStatus();
  const handleSubmit = useCallback(async (address) => {
    try {
      await submitShippingAddress(address);
    }
    catch(e) {
    }
  }, []);

  const isSetting = shippingAddressLoadingStatus === 'setting' || shippingLinesLoadingStatus === 'fetching';

  return (
    <div className="Shipping">
      <h1 className="Section__Title">Shipping</h1>
      <BackButton />
      <section className="Shipping__ShippingAddress">
        <h3>Shipping address</h3>
        <ShippingAddressList
          addresses={savedAddresses}
          onChange={(address) => handleSubmit(address)}
          selectedAddress={shippingAddress?.id}
          disabled={isSetting}
        />
      </section>
      <ShippingLines />
    </div>
  );
};

export default Shipping;
