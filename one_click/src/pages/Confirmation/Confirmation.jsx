import React, { useEffect, useContext, useCallback } from 'react';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { useAnalytics } from '../../hooks';
import { AppContext } from '../../context/AppContext';
import { Header } from '../../components/Header';
import './Confirmation.css'
import { useTranslation } from 'react-i18next';
import { Button } from '@boldcommerce/stacks-ui';

const Confirmation = ({}, ref) => {
    const { state } = useCheckoutStore();
    const { addresses, payments, shipping} = state.applicationState;
    const trackEvent = useAnalytics();
    const { websiteName } = useContext(AppContext);
    const { t } = useTranslation();

    useEffect(() => {
      trackEvent('thank_you');
    }, []);

    const continueShopping = useCallback(() => {
        const event = new CustomEvent("oneClick:close");
        window.dispatchEvent(event);
    }, []);

    return(
        <div ref={ref} className='Sidebar ConfirmationPage'>
            <Header title={websiteName} />
            <div className="ThankYou">{t('confirmation.thank_you')}</div>
            <div className='confirmation-order'>
                <h2>{t('confirmation.order_confirmed')}</h2>
                <div className='confirmation-order-accepted'>{t('confirmation.order_accepted')}</div>
            </div>
            <div className='confirmation-information'>
                <h2>{t('customer.info')}</h2>
                <h3>{t('shipping.address')}</h3>
                <p>{addresses.shipping.first_name} {addresses.shipping.last_name}</p>
                <p>{addresses.shipping.address_line_1}</p>
                <p>{addresses.shipping.address_line_2}</p>
                <p>{addresses.shipping.city} {addresses.shipping.province_code} {addresses.shipping.postal_code}</p>
                <p>{addresses.shipping.country}</p>

                <h3>{t('billing.address')}</h3>
                <p>{addresses.billing.first_name} {addresses.billing.last_name}</p>
                <p>{addresses.billing.address_line_1}</p>
                <p>{addresses.billing.address_line_2}</p>
                <p>{addresses.billing.city} {addresses.billing.province_code} {addresses.billing.postal_code}</p>
                <p>{addresses.billing.country}</p>

                <h3>{t('shipping.method')}</h3>
                <p>{shipping.selected_shipping.description}</p>

                <h3>{t('payment.method')}</h3>
                {
                    payments &&
                    payments.map( (payment) => {
                        return <p key={payment.id} >{payment.brand}</p>
                    })
                }
            </div>
            <div className='confirmation-help'>
                <p>{t('confirmation.need_help')}<a href='#'>{t('confirmation.contact_us')}</a></p> { /* TODO: get correct contact us link */}
            </div>
            <div className="confirmation-continue">
                <Button className='confirmation-continue-button' onClick={continueShopping} > 
                    {t('confirmation.continue_shopping')}
                </Button>
            </div>
        </div>
    );
};

const ConfirmationForwardedRef = React.forwardRef(Confirmation);

export default ConfirmationForwardedRef;