import React, { useCallback } from 'react';
import { useLoadingStatus, useSavedAddresses, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { BackButton } from '../BackButton';
import ShippingAddressList from './ShippingAddressList';
import ShippingLines from '../ShippingLines/ShippingLines';
import './Shipping.css';
import { Header } from '../Header';

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
      <Header title={"Shipping"}/>
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
