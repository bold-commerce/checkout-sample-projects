import React from 'react';
import { render } from '@testing-library/react';
import { Billing } from '../../../../one_click/src/components/Billing'
import {
    exampleUseCheckoutStore as MOCKcheckoutStore,
    exampleUseLineItems as MOCKlineItems,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
    exampleUseBillingAddress as MOCKbillingAddress,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseDiscount as MOCKdiscount,
    exampleUseCountryInfo as MOCKcountryInfo
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () =>  MOCKcheckoutStore,
    useLineItems: () => MOCKlineItems,
    useShippingLines: () => MOCKshippingLines,
    useBillingAddress: () => MOCKbillingAddress,
    usePaymentIframe: () => MOCKpaymentIframe,
    useDiscount: () => MOCKdiscount,
    useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
    useCountryInfo: () => MOCKcountryInfo
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
