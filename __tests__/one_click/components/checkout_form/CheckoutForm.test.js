import React from 'react';
import CheckoutForm from '../../../../one_click/src/components/CheckoutForm/CheckoutForm'
import ResizeObserver from "../../../../__mocks__/ResizeObserver";
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import {
    exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
    exampleUseShippingAddress as MOCKshippingAddress,
    exampleUseBillingAddress as MOCKbillingAddress,
    exampleUseSavedAddresses as MOCKsavedAddresses,
    exampleUseCheckoutStore as MOCKcheckoutStore,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseLoadingStatus as MOCKloadingStatus,
    exampleUseCountryInfo as MOCKcountryInfo,
    exampleUseCountryInfo as MOCKcustomer,
    exampleUseLineItems as MOCKlineItems,
    exampleUseDiscount as MOCKdiscount,
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config'

jest.mock('@boldcommerce/checkout-react-components', () => ({
    useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
    useShippingAddress: () => MOCKshippingAddress,
    useSavedAddresses: () => MOCKsavedAddresses,
    useBillingAddress: () => MOCKbillingAddress,
    usePaymentIframe: () => MOCKpaymentIframe,
    useCheckoutStore: () => MOCKcheckoutStore,
    useShippingLines: () => MOCKshippingLines,
    useLoadingStatus: () => MOCKloadingStatus,
    useCountryInfo: () => MOCKcountryInfo,
    useLineItems: () => MOCKlineItems,
    useCustomer: () => MOCKcustomer,
    useDiscount: () => MOCKdiscount,
})).mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => ({ websiteName: 'TestSite' }),
})).mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => ({ pathname: '/' }),
    Routes: () => '/'
}));

describe('CheckoutForm', () => {
    test('renders CheckoutForm', async () => {
        const { getByRole, asFragment } = render( <CheckoutForm /> );

        await waitForElementToBeRemoved(() => getByRole('alert'));

        expect(asFragment()).toMatchSnapshot();
    });
});
