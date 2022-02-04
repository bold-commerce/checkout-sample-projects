import React from "react";
import { render, waitFor } from '@testing-library/react';
import { OneClickLayout } from '../../../../one_click/src/layouts/OneClickLayout'
import ResizeObserver from "../../../../__mocks__/ResizeObserver";
import {
    exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
    exampleUseShippingAddress as MOCKshippingAddress,
    exampleUseBillingAddress as MOCKbillingAddress,
    exampleUseLoadingStatus as MOCKloadingStatus,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUseCheckoutStore as MOCKcheckoutStore,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseSavedAddresses as MOCKsavedAddress,
    exampleUseCountryInfo as MOCKcountryInfo,
    exampleUseLineItems as MOCKlineItems,
    exampleUseCustomer as MOCKcustomer,
    exampleUseDiscount as MOCKdiscount,
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config'

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
    useShippingAddress: () => MOCKshippingAddress,
    useBillingAddress: () => MOCKbillingAddress,
    useCheckoutStore: () => MOCKcheckoutStore,
    usePaymentIframe: () => MOCKpaymentIframe,
    useSavedAddresses: () => MOCKsavedAddress,
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
    })
})).mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        pathname: '/' 
    }),
    useNavigate: () => {}
})).mock('../../../../one_click/src/hooks', () => ({
    ...jest.requireActual('../../../../one_click/src/hooks'),
    useInventory: () => ({
        checkInventory: () => {}
    })
}));

describe('OneClickLayout', () => {
    test('renders OneClickLayout component', async () => {
        const { asFragment } = render( <OneClickLayout /> );
        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
