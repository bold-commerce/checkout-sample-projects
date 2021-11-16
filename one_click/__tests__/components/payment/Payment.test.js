import React from "react";
import { render } from '@testing-library/react';
import { PaymentMethod } from '../../../client/components/OneClickLayout/components/Payment/Payment'
import { MemoryRouter } from "react-router";
import { 
    countries as MOCKcountries,
    exampleAddress as MOCKexampleAddress
} from '../../utils/addressHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    usePaymentIframe: () => ({
        paymentIframeLoadingStatus: '',
        paymentIframeUrl: '',
        paymentIframeHeight: 0,
        paymentIframeOnLoaded: (() => {})
    }),
    useDiscount: () => ({
        discountApplied: false,
        discountCode: "",
        discountErrors: null,
        applyDiscount: (() => {})
    }),
    useBillingAddress: () => ({
        billingAddress: MOCKexampleAddress,
        countryInfo: MOCKcountries,
        billingAddressErrors: null,
        billingSameAsShipping: true,
        submitBillingAddress: (() => {}),
        setBillingSameAsShipping: (() => {})
    })
}))

describe('Payment', () => {
    test('renders PaymentMethod component showing payment method', () => {
        const { asFragment } = render( <PaymentMethod showPaymentMethod />,
            {wrapper: MemoryRouter} );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders PaymentMethod component without showing payment method', () => {
        const { asFragment } = render(
            <PaymentMethod showPaymentMethod={false} />,
                {wrapper: MemoryRouter}
             );
        expect(asFragment()).toMatchSnapshot();
    });
});