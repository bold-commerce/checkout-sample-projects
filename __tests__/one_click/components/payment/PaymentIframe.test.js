import React from 'react';
import { render } from '@testing-library/react';
import { PaymentIframe } from '../../../../one_click/src/components/Payment'
import { MemoryRouter } from "react-router";
import {
    exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
    exampleUsePaymentMethod as MOCKpaymentMethod,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseCountryInfo as MOCKcountryInfo
} from '../../../utils/hookHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
    usePaymentMethod: () => MOCKpaymentMethod,
    usePaymentIframe: () => MOCKpaymentIframe,
    useCountryInfo: () => MOCKcountryInfo,
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
