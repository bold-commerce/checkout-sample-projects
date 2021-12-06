import React, { useEffect, useContext } from 'react';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { Link } from 'react-router-dom';
import { useAnalytics } from '../../../../hooks';
import { AppContext } from '../../context/AppContext';
import { Header } from '../Header';
import './Confirmation.css'

const Confirmation = ({}, ref) => {
    const { state } = useCheckoutStore();
    const { addresses, customer, payments, shipping} = state.applicationState;
    const trackEvent = useAnalytics();
    const { websiteName } = useContext(AppContext);

    useEffect(() => {
      trackEvent('thank_you');
    }, []);

    return(
        <div ref={ref} className='Sidebar ConfirmationPage'>
            <Header title={websiteName} />
            <div className="ThankYou">Thank you{ customer.first_name && ', ' + customer.first_name }!</div>
            <div className='confirmation-order'>
                <h2>Your order is confirmed</h2>
                <div className='confirmation-order-accepted'>We've accepted your order, and we're getting it ready. A confirmation email has been sent to your email address.</div>
            </div>
            <div className='confirmation-information'>
                <h2>Customer information</h2>
                <h3>Shipping addrees</h3>
                <p>{addresses.shipping.first_name} {addresses.shipping.last_name}</p>
                <p>{addresses.shipping.address_line_1}</p>
                <p>{addresses.shipping.address_line_2}</p>
                <p>{addresses.shipping.city} {addresses.shipping.province_code} {addresses.shipping.postal_code}</p>
                <p>{addresses.shipping.country}</p>

                <h3>Billing address</h3>
                <p>{addresses.billing.first_name} {addresses.billing.last_name}</p>
                <p>{addresses.billing.address_line_1}</p>
                <p>{addresses.billing.address_line_2}</p>
                <p>{addresses.billing.city} {addresses.billing.province_code} {addresses.billing.postal_code}</p>
                <p>{addresses.billing.country}</p>

                <h3>Shipping method</h3>
                <p>{shipping.selected_shipping.description}</p>

                <h3>Payment method</h3>
                {
                    payments &&
                    payments.map( (payment) => {
                        return <p key={payment.id} >{payment.brand}</p>
                    })
                }
            </div>
            <div className='confirmation-help'>
                <p>Need help? <a href='#'>Contact us</a></p> { /* TODO: get correct contact us link */}
            </div>
            <div className="confirmation-continue">
                <Link className='confirmation-continue-button stx-button' to='/' >
                    Continue shopping
                </Link>
            </div>
        </div>
    );
};

const ConfirmationForwardedRef = React.forwardRef(Confirmation);

export default ConfirmationForwardedRef;