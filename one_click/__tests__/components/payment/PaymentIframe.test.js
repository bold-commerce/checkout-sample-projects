import React from "react";
import { render } from '@testing-library/react';
import { PaymentIframe } from '../../../client/components/OneClickLayout/components/Payment'
import { MemoryRouter } from "react-router";

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    usePaymentIframe: () => ({
        paymentIframeLoadingStatus: 'fetching',
        paymentIframeUrl: '',
        paymentIframeHeight: 0,
        paymentIframeOnLoaded: (() => {})
    })
}))

describe('PaymentIframe', () => {
    test('renders PaymentIframe component', () => {
        const { asFragment } = render(
            <PaymentIframe />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });
});