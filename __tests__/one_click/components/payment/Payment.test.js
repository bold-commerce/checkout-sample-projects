import React from "react";
import { render } from '@testing-library/react';
import { PaymentMethod } from '../../../../one_click/src/components/Payment'
import { MemoryRouter } from "react-router";
import {
    exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
    exampleUseBillingAddress as MOCKbillingAddress,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUseCountryInfo as MOCKcountryInfo,
    exampleUseDiscount as MOCKdiscount,
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    usePaymentIframe: () => MOCKpaymentIframe,
    useCountryInfo: () => MOCKcountryInfo,
    useDiscount: () => MOCKdiscount,
    useBillingAddress: () => MOCKbillingAddress,
    useShippingLines: () => MOCKshippingLines,
    useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
}));

describe('Payment', () => {
    test('renders PaymentMethod component showing payment method', () => {
        const { asFragment } = render(
            <PaymentMethod showPaymentMethod />,
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
