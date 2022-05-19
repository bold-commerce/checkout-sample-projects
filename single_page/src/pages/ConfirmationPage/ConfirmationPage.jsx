import React from 'react';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { CheckoutSection, Header, OrderSummary } from '../../components';
import './ConfirmationPage.css';
import { ConfirmationList, ConfirmationListItem } from './components';
import { RedactedCreditCard } from './components/RedactedCreditCard';
import { useTranslation } from 'react-i18next';
import { Button } from '@boldcommerce/stacks-ui';

const ConfirmationPage = () => {
  const { state } = useCheckoutStore();
  const customer = state.applicationState.customer;
  const shippingAddress = state.applicationState.addresses.shipping;
  const billingAddress = state.applicationState.addresses.billing;
  const shippingMethod = state.applicationState.shipping.selected_shipping.description;
  const payments = state.applicationState.payments;
  const { t } = useTranslation();

  const continueShopping = () => {
    location.href = `https://${state.initialData.shop_name}`;
  };

  const paymentList = payments.map((payment) => {
    return (
      <li className="Payment__ListItem" key={payment.id}>
        <RedactedCreditCard brand={payment.friendly_brand} lineText={payment.lineText} />
      </li>
    )
  });

  return (
    <>
      <div className="Checkout__Layout Checkout__Confirmation" role="main">
        <Header/>
        <OrderSummary readOnly/>
        <h1 className="Checkout__ThankYou">{`${t('confirmation.thank_you')}, ${customer.first_name || shippingAddress.first_name}!`}</h1>
        <CheckoutSection
          className="Confirmation__Section"
          title={t('confirmation.order_confirmed')}
        >
          <p>{t('confirmation.order_accepted')}</p>
        </CheckoutSection>
        <CheckoutSection
          className="Confirmation__Section"
          title={t('customer.info')}
        >
          <ConfirmationList>
            <ConfirmationListItem title={t('shipping.address')}>
              <p>{`${shippingAddress.first_name} ${shippingAddress.last_name}`}</p>
              <p>
                {`
                  ${shippingAddress.address_line_1},
                  ${shippingAddress.address_line_2 && shippingAddress.address_line_2 + ','}
                  ${shippingAddress.city},
                  ${shippingAddress.province && shippingAddress.province + ','}
                  ${shippingAddress.postal_code && shippingAddress.postal_code + ','}
                  ${shippingAddress.country},
                  ${shippingAddress.phone_number && shippingAddress.phone_number}
                `}
              </p>
            </ConfirmationListItem>
            <ConfirmationListItem title={t('billing.address')}>
            <p>{`${billingAddress.first_name} ${billingAddress.last_name}`}</p>
              <p>
                {`
                  ${billingAddress.address_line_1},
                  ${billingAddress.address_line_2 && billingAddress.address_line_2 + ','}
                  ${billingAddress.city},
                  ${billingAddress.province && billingAddress.province + ','}
                  ${billingAddress.postal_code && billingAddress.postal_code + ','}
                  ${billingAddress.country},
                  ${billingAddress.phone_number && billingAddress.phone_number}
                `}
              </p>
            </ConfirmationListItem>
            <ConfirmationListItem title={t('shipping.method')}>
              <p>{shippingMethod}</p>
            </ConfirmationListItem>
            <ConfirmationListItem title={t('payment.method')}>
              <ul className="Payment__List">
                {paymentList}
              </ul>
            </ConfirmationListItem>
          </ConfirmationList>
        </CheckoutSection>
        <div className="Checkout__Navigation">
          <Button className='Checkout__ContinueButton' onClick={continueShopping} > 
            {t('confirmation.continue_shopping')}
          </Button>
          <p className="Checkout__ContactUs">{t('confirmation.need_help')}<a href={window.returnUrl}>{t('confirmation.contact_us')}</a></p>
        </div>
       <div className="Checkout__Footer">
          <p className="Checkout__Rights">{`All rights reserved ${t('website_name')}`}</p>
        </div>
      </div>
    </>
  )
};

export default ConfirmationPage;
