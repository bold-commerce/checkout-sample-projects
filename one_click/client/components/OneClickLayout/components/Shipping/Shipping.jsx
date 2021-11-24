import React, { useCallback } from 'react';
import { useLoadingStatus, useSavedAddresses, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { BackButton } from '../BackButton';
import ShippingAddressList from './ShippingAddressList';
import ShippingLines from '../ShippingLines/ShippingLines';
import { Header } from '../Header';
import classNames from 'classnames';
import { useAnalytics, useErrorLogging } from '../../../../hooks';
import './Shipping.css';

const Shipping = ({ show, onBack }) => {
  const { data: shippingAddress, submitShippingAddress } = useShippingAddress();
  const { data: savedAddresses } = useSavedAddresses();
  const { shippingAddressLoadingStatus, shippingLinesLoadingStatus } = useLoadingStatus();
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();

  const handleSubmit = useCallback(async (address) => {
    try {
      await submitShippingAddress(address);
      trackEvent('set_shipping_address');
    }
    catch(e) {
      logError('shipping_address', e);
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
