import React from "react";
import { render } from '@testing-library/react';
import { Billing } from '../../../../one_click/src/components/Billing'
import { exampleLineItems as MOCKexampleLineItems } from '../../../utils/lineItemHelpers';
import { testApplicationState as MOCKapplicationState } from '../../../utils/applicationStateHelper';
import { exampleShippingState as MOCKexampleShippingState } from '../../../utils/shippingLinesHelper';
import {
    exampleAddress as MOCKexampleAddress,
    countries as MOCKcountries,
    caProvinces as MOCKprovinces
} from '../../../utils/addressHelpers';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () => ({
        state: {
            orderInfo: {
                billingSameAsShipping:true,
                orderStatus: ""
            },
            errors: { order: null },
            loadingStatus: { isLoading: false },
            applicationState: MOCKapplicationState,
            orderTotals: {
                taxesTotal: 1200,
                subTotal: 23000,
                total: 24200
            }
        }
    }),
    useLineItems: () => ({
        data: MOCKexampleLineItems
    }),
    useShippingLines: () => ({
        data: MOCKexampleShippingState
    }),
    useBillingAddress: () => ({
        data: MOCKexampleAddress
    }),
    usePaymentIframe: () => ({
        data: {
            url: 'test.url',
            loadingStatus: 'fulfilled',
            paymentIframeOnLoaded: (() => {})
        }
    }),
    useDiscount: () => ({
        data: '?',
        applyDiscount : (() => {})
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


describe('Billing', () => {
  test('render Billing component set to show', () => {
      const { asFragment } = render(
          <Billing
            section={'billing'}
          />
      );
      expect(asFragment()).toMatchSnapshot();
  })

  test('render Billing component with the summary set to show', () => {
      const { asFragment } = render(
          <Billing
            section={'summaryB'}
          />
      );
      expect(asFragment()).toMatchSnapshot();
  })

  test('render Billing component with another component set to show', () => {
      const { asFragment } = render(
          <Billing
            section={'shipping'}
          />
      );
      expect(asFragment()).toMatchSnapshot();
  })
})
