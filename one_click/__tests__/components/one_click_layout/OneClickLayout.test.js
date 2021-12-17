import React from "react";
import { render } from '@testing-library/react';
import { OneClickLayout } from '../../../client/components/OneClickLayout';
import ResizeObserver from "../../../__mocks__/ResizeObserver";
import { exampleLineItems as MOCKexampleLineItems } from '../../utils/lineItemHelpers';
import { testApplicationState as MOCKexampleApplicationState } from '../../utils/applicationStateHelper';
import {
    countries as MOCKcountries,
    caProvinces as MOCKprovinces,
    exampleAddress as MOCKexampleAddress,
    exampleSavedAddresses as MOCKexampleSavedAddresses
} from '../../utils/addressHelpers';
import { exampleShippingState as MOCKexampleShippingState } from '../../utils/shippingLinesHelper';

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
            applicationState: MOCKexampleApplicationState,
            orderTotals: {
                taxesTotal: 1200,
                subTotal: 23000,
                total: 24200
            }
        }
    }),
    useCustomer: () => ({
        data: {
            platform_id: 123
        }
    }),
    usePaymentIframe: () => ({
        data: {
            url: 'test.url',
            loadingStatus: 'fulfilled',
            paymentIframeOnLoaded: (() => {})
        }
    }),
    useSavedAddresses: () => ({
        data: MOCKexampleSavedAddresses
    }),
    useShippingLines: () => ({
        data: MOCKexampleShippingState
    }),
    useShippingAddress: () => ({
        data: MOCKexampleAddress,
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
        data: {
            countries: MOCKcountries,
            provinceLabel: "province",
            provinces: MOCKprovinces,
            showPostalCode: true,
            showProvince: true
        }
    }),
    useLoadingStatus: () => ({
        shippingAddressLoadingStatus: 'complete',
        shippingLinesLoadingStatus: 'complete'
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
    })
}));

describe('OneClickLayout', () => {
    test('renders OneClickLayout component', () => {
        React.useState = jest.fn().mockReturnValueOnce([false, ((i) => {})])

        const { asFragment } = render( <OneClickLayout /> );
        
        expect(asFragment()).toMatchSnapshot();
    });
});