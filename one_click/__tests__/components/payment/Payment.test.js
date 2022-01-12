import React from "react";
import { render } from '@testing-library/react';
import { PaymentMethod } from '../../../src/components/Payment'
import { MemoryRouter } from "react-router";
import { exampleShippingState as  MOCKexampleShippingState } from '../../utils/shippingLinesHelper';
import { 
    countries as MOCKcountries,
    caProvinces as MOCKprovinces,
    exampleAddress as MOCKexampleAddress
} from '../../utils/addressHelpers';
import '../../../src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
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
    useDiscount: () => ({
        data: {
            discountApplied: false,
            discountCode: "",
            errors: null,
            applyDiscount: (() => {})
        }
    }),
    useBillingAddress: () => ({
        billingAddress: MOCKexampleAddress,
        countryInfo: MOCKcountries,
        billingAddressErrors: null,
        billingSameAsShipping: true,
        submitBillingAddress: (() => {}),
        setBillingSameAsShipping: (() => {})
    }),
    useShippingLines: () => ({
        data: MOCKexampleShippingState
    }),
    useBillingSameAsShipping: () => ({
        data: true,
        setBillingSameAsShipping: (() => {})
    })
}))

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