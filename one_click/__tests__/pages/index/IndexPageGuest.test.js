import React from 'react';
import { IndexPageGuest } from '../../../src/pages/IndexPage';
import { render } from '@testing-library/react';
import { exampleLineItems as MOCKexampleLineItems } from '../../utils/lineItemHelpers';
import { testApplicationState as MOCKexampleApplicationState } from '../../utils/applicationStateHelper';
import {
    countries as MOCKcountries,
    caProvinces as MOCKprovinces
} from '../../utils/addressHelpers';
import { exampleShippingLines as MOCKexampleShippingLines } from '../../utils/shippingLinesHelper';
import { BrowserRouter } from 'react-router-dom';

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
    useShippingLines: () => ({
        data: MOCKexampleShippingLines
    }),
    useShippingAddress: () => ({
        data: {},
        submitShippingAddress: (() => {})
    }),
    useBillingAddress: () => ({
        data: {}
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

describe('IndexPageGuest', () => {
  test('renders IndexPageGuest component', () => {
    const { asFragment } = render(<BrowserRouter><IndexPageGuest show /></BrowserRouter> )
    expect(asFragment()).toMatchSnapshot();
  })

  test('renders IndexPageGuest component', () => {
    const { asFragment } = render(<BrowserRouter><IndexPageGuest show={false} /></BrowserRouter> )
    expect(asFragment()).toMatchSnapshot();
  })
})