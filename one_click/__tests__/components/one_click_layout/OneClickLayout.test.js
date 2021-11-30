import React from "react";
import { render } from '@testing-library/react';
import { OneClickLayout } from '../../../client/components/OneClickLayout'
import { exampleLineItems as MOCKexampleLineItems } from '../../utils/lineItemHelpers';
import { testApplicationState as MOCKexampleapplicationState } from '../../utils/applicationStateHelper';
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
            applicationState: MOCKexampleapplicationState,
            orderTotals: {
                taxesTotal: 1200,
                subTotal: 23000,
                total: 24200
            }
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
        const { asFragment } = render( <OneClickLayout orderStatus={null} /> );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders OneClickLayout component order processing', () => {
        const { asFragment } = render( <OneClickLayout orderStatus={'processing'} /> );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders OneClickLayout component order processed', () => {
        const { asFragment } = render( <OneClickLayout orderStatus={'completed'} /> );
        expect(asFragment()).toMatchSnapshot();
    });
});