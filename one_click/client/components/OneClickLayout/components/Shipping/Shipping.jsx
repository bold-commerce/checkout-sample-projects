import { useLoadingStatus, useShippingAddress } from '@boldcommerce/checkout-react-components';
import React from 'react';
import { BackButton } from '../BackButton';
import ShippingAddressList from './ShippingAddressList';

const Shipping = () => {
  const { savedAddresses, shippingAddress, submitShippingAddress } = useShippingAddress();
  const { shippingAddressLoadingStatus, shippingLinesLoadingStatus } = useLoadingStatus();

  const isSetting = shippingAddressLoadingStatus === 'setting' || shippingLinesLoadingStatus === 'fetching';

  return (
    <div className="Shipping">
      <BackButton />
      <section className="Shipping__ShippingAddress">
        <h3>Shipping address</h3>
        <ShippingAddressList
          addresses={savedAddresses}
          onChange={(address) => submitShippingAddress(address)}
          selectedAddress={shippingAddress.id}
          disabled={isSetting}
        />
      </section>
      <section className="Shipping__ShippingLines">
        <h3>Shipping method</h3>
      </section>
    </div>
  );
};

export default Shipping;
