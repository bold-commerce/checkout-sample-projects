import React from 'react';
import { IndexPageGuest } from '../../../../one_click/src/pages/IndexPage';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
    exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
    exampleUseShippingAddress as MOCKshippingAddress,
    exampleUseBillingAddress as MOCKbillingAddress,
    exampleUseCheckoutStore as MOCKcheckoutStore,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUseCountryInfo as MOCKcountryInfo,
    exampleUseLineItems as MOCKlineItems,
    exampleUseCustomer as MOCKcustomer,
    exampleUseDiscount as MOCKdiscount,
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';
import { AppContext } from '../../../../one_click/src/context/AppContext';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
    useShippingAddress: () => MOCKshippingAddress,
    useBillingAddress: () => MOCKbillingAddress,
    useCheckoutStore: () => MOCKcheckoutStore,
    usePaymentIframe: () => MOCKpaymentIframe,
    useShippingLines: () => MOCKshippingLines,
    useCountryInfo: () => MOCKcountryInfo,
    useLineItems: () => MOCKlineItems,
    useCustomer: () => MOCKcustomer,
    useDiscount: () => MOCKdiscount,
}));

describe('IndexPageGuest', () => {
  test('renders IndexPageGuest component', () => {
    const { asFragment } = render(
        <AppContext.Provider value={{ websiteName: 'app.test' }} >
            <IndexPageGuest show />
        </AppContext.Provider>,
        {wrapper: MemoryRouter}
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders IndexPageGuest component', () => {
    const { asFragment } = render(
        <AppContext.Provider value={{ websiteName: 'app.test' }} >
            <IndexPageGuest />
        </AppContext.Provider>,
        {wrapper: MemoryRouter}
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
