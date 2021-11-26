import React, { useCallback } from 'react';
import { useLoadingStatus, useSavedAddresses, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { BackButton } from '../BackButton';
import ShippingAddressList from './ShippingAddressList';
import ShippingLines from '../ShippingLines/ShippingLines';
import { Header } from '../Header';
import classNames from 'classnames';
import './Shipping.css';
import classNames from 'classnames';

const Shipping = ({ show, onBack }) => {
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
    <div className={classNames('Sidebar Shipping', show ? 'Sidebar--Show' : 'Sidebar--Hide')}>
      <Header title={"Shipping"} />
      <BackButton onClick={onBack} />
      <section className="Shipping__ShippingAddress">
        <h3 className="FieldSet__Heading">Shipping address</h3>
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
