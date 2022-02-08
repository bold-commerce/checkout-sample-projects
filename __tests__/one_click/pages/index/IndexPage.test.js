import React from 'react';
import { render } from '@testing-library/react';
import { IndexPage } from '../../../../one_click/src/pages/IndexPage';
import {
    exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
    exampleUseShippingAddress as MOCKshippingAddress,
    exampleUseBillingAddress as MOCKbillingAddress,
    exampleUseCheckoutStore as MOCKcheckoutStore,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUseCountryInfo as MOCKcountryInfo,
    exampleUseLineItems as MOCKlineItems,
    exampleUseDiscount as MOCKdiscount,
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';
import { AppContext } from '../../../../one_click/src/context/AppContext';
import { MemoryRouter } from 'react-router-dom';

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
    useDiscount: () => MOCKdiscount,
}));

describe('IndexPage', () => {
    test('renders IndexPage component', () => {
        const { asFragment } = render(
            <AppContext.Provider value={{ websiteName: "app.test" }}>
                <IndexPage />
            </AppContext.Provider>,
            {wrapper: MemoryRouter}
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
