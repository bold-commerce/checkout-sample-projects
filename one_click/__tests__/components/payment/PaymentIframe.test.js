import React from "react";
import { render } from '@testing-library/react';
import { PaymentIframe } from '../../../src/components/Payment'
import { MemoryRouter } from "react-router";
import {
    caProvinces as MOCKprovinces,
    countries as MOCKcountries
} from '../../utils/addressHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    usePaymentMethod: () => ({ showPaymentMethod: true }),
    usePaymentIframe: () => ({
        data: {
            url: 'test.url',
            loadingStatus: 'fulfilled',
            paymentIframeOnLoaded: (() => {})
        }
    }),
    useCountryInfo: () => ({
        data: {
            countries: MOCKcountries,
            provinceLabel: "province",
            provinces: MOCKprovinces,
            showPostalCode: true,
            showProvince: true
        }
    }),
    useBillingSameAsShipping: () => ({
        data: true,
        setBillingSameAsShipping: (() => {})
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