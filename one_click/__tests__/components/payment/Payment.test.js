import React from "react";
import { render } from '@testing-library/react';
import { PaymentMethod } from '../../../client/components/OneClickLayout/components/Payment'
import { MemoryRouter } from "react-router";

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    usePaymentMethod: () => ({ showPaymentMethod: true }),
    usePaymentIframe: () => ({
        paymentIframeLoadingStatus: '',
        paymentIframeUrl: '',
        paymentIframeHeight: 0,
        paymentIframeOnLoaded: (() => {})
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

/**
 * both test return same result because showPaymentMethod comes from
 * usePaymentMethod and not component props.
 */