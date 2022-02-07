import React from 'react';
import CheckoutForm from '../../../../one_click/src/components/CheckoutForm/CheckoutForm'
import ResizeObserver from "../../../../__mocks__/ResizeObserver";
import { render, waitFor } from '@testing-library/react';
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
    useContext: () => ({
        websiteName: 'TestSite'
    }),
})).mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        pathname: '/' 
    }),
    useNavigate: () => ({
        navigate: (() => {})
    }),
    Routes: () => ({
        useRoutes: () => {
        <route 
        key='key'
        name='screen name'
        path='/'
        />
    }})
})).mock('../../../../one_click/src/hooks', () => ({
    ...jest.requireActual('../../../../one_click/src/hooks'),
    useInventory: () => ({
        checkInventory: (() => {})
    })
}));

describe('CheckoutForm', () => {
    test('renders CheckoutForm', async () => {
        // React.useState = jest.fn().mockReturnValue([false, (i) => {}])

        const { asFragment } = render(
            <CheckoutForm />
        );

        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
