import React from 'react';
import { IndexPage } from '../../../../one_click/src/pages/IndexPage';
import { render } from '@testing-library/react';
import { exampleLineItems as MOCKexampleLineItems } from '../../../utils/lineItemHelpers';
import { testApplicationState as MOCKexampleApplicationState } from '../../../utils/applicationStateHelper';
import {
    exampleAddress as MOCKexampleAddress,
    countries as MOCKcountries
} from '../../../utils/addressHelpers';
import { exampleShippingLines as MOCKexampleShippingLines } from '../../../utils/shippingLinesHelper';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useLineItems: () => ({
        data: MOCKexampleLineItems,
        updateLineItemQuantity: (() => {}),
        removeLineItem: (() => {})        
    }),
    useCheckoutStore: () => ({
        state: {
            orderInfo: {
                billingSameAsShipping:true,
                orderStatus: ""
            },
            errors: { order: null },
            loadingStatus: { isLoading: false },
            applicationState: MOCKexampleApplicationState
        }
    }),
    usePaymentIframe: () => ({
        data: {
            url: 'test.url',
            loadingStatus: 'fulfilled',
            paymentIframeOnLoaded: (() => {})
        }
    }),
    useShippingLines: () => ({
        data: MOCKexampleShippingLines
    }),
    useShippingAddress: () => ({
        submitShippingAddress: (() => {})
    }),
    useBillingAddress: () => ({
        data: MOCKexampleAddress
    }),
    useDiscount: () => ({
        data: '?',
        applyDiscount: (() => {})
    }),
    useBillingSameAsShipping: () => ({
        data: true,
        setBillingSameAsShipping: (() => {})
    }),
    useCountryInfo: () => ({
        data: MOCKcountries
    })
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
    useNavigate: () => ({
        navigate: (() => {})
    })
}));

describe('IndexPage', () => {
    test('renders IndexPage component', () => {
        const { asFragment } = render(
            <IndexPage />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
