import React, { useCallback, useContext, useEffect, useState }  from 'react';
import Card from '../Card';
import classNames from 'classnames';
import { Price } from '@boldcommerce/stacks-ui';
import { LineItems } from '../LineItems';
import { useCheckoutStore, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { LoadingState } from '../LoadingState';
import { Header } from '../Header';
import { AppContext } from '../../context/AppContext';
import { PaymentMethod } from '../Payment';
import { CheckoutButton } from '../CheckoutButton';
import { useAnalytics } from '../../../../hooks';

const IndexPage = ({ onSectionChange, show }, ref) => {
  const { state } = useCheckoutStore();
  const { order_total, customer, addresses, shipping } = state.applicationState;
  const shippingAddressArray = [ addresses.shipping.address_line_1, addresses.shipping.address_line_2, addresses.shipping.city, addresses.shipping.province, addresses.shipping.postal_code, addresses.shipping.country ]
  const billingAddressArray = [ addresses.billing.address_line_1, addresses.billing.address_line_2, addresses.billing.city, addresses.billing.province, addresses.billing.postal_code, addresses.billing.country ];
  const shippingCombined = shippingAddressArray.filter((addressString) => addressString !== '').join(', ');
  const billingCombined = billingAddressArray.filter((addressString) => addressString !== '').join(', ');
  const { submitShippingAddress } = useShippingAddress();
  const [loading, setLoading] = useState(false);
  const { websiteName } = useContext(AppContext);
  const trackEvent = useAnalytics();

  const setDefaultAddress = useCallback(async () => {
    setLoading(true);
    try {
      await submitShippingAddress(customer.saved_addresses[0]);
    } catch(e) {
      setLoading(false);
    }
    setLoading(false);
  }, [customer.saved_addresses]);

  useEffect(() => {
    //if customer hasn't set a shipping address yet and they have a saved shipping address, set the shipping address to the first one. 
    if(addresses.shipping.length == 0 && customer.saved_addresses.length > 0){
      setDefaultAddress();
    }

    trackEvent('landing_page');
  }, []);

  return (
    <div ref={ref} className={classNames('Sidebar IndexPage', show ? 'Sidebar--Show' : 'IndexPage--Hide')}>
      <Header title={websiteName}/>
      <LineItems />
      <Card
        title={"Summary"}
        handleClick={() => onSectionChange('summary')}
        component={"/summary"}
        overview={<Price amount={order_total} />}
      />
      { customer?.email_address && (
        <Card
          description={customer.email_address}
          action={{label: "Not you?"}}
        />
      )}
      <Card
        title={"Shipping"}
        type={"shippingCard"}
        handleClick={() => onSectionChange('shipping')}
        description={loading ? '' : addresses.shipping.first_name ? `${addresses.shipping.first_name} ${addresses.shipping.last_name}` : 'No shipping address selected'}
      >
      { (loading && <LoadingState/>) || 
      ( 
        shipping.selected_shipping &&
        <>
          <div>{shippingCombined}</div>
          <div className="card-shipping-content">{shipping.selected_shipping.description} - <Price amount={shipping.selected_shipping.amount} /></div>
        </>
      )}
      </Card>
      <Card
        title={"Payment"}
        type={"paymentCard"}
      >
      {
        state.orderInfo.billingSameAsShipping ? 
        <div>Billing address same as shipping address</div> :
        <div>{billingCombined}</div>
      }
      </Card>
      <PaymentMethod />
      <CheckoutButton className="CheckoutButton CheckoutButton__Mobile" />
    </div>
  )
};

const IndexPageForwardedRef = React.forwardRef(IndexPage);

export default IndexPageForwardedRef;
