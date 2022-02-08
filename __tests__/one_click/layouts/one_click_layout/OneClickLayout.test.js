import React from 'react';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { OneClickLayout } from '../../../../one_click/src/layouts/OneClickLayout'
import { AppContext } from '../../../../one_click/src/context/AppContext';
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
})).mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => {}
}));

describe('OneClickLayout', () => {
    test('renders OneClickLayout component', async () => {
        const { getByRole, asFragment } = render(
            <AppContext.Provider value={{ websiteName: "app.test" }}>
                <OneClickLayout /> 
            </AppContext.Provider>
        );

        await waitForElementToBeRemoved(() => getByRole('alert'));

        expect(asFragment()).toMatchSnapshot();    
    });
});
