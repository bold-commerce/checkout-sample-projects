import React from 'react';
import { render } from '@testing-library/react';
import { Billing } from '../../../../one_click/src/components/Billing'
import {
    exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
    exampleUseBillingAddress as MOCKbillingAddress,
    exampleUseCheckoutStore as MOCKcheckoutStore,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseCountryInfo as MOCKcountryInfo,
    exampleUseLineItems as MOCKlineItems,
    exampleUseDiscount as MOCKdiscount,
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
    useBillingAddress: () => MOCKbillingAddress,
    useCheckoutStore: () =>  MOCKcheckoutStore,
    useShippingLines: () => MOCKshippingLines,
    usePaymentIframe: () => MOCKpaymentIframe,
    useCountryInfo: () => MOCKcountryInfo,
    useLineItems: () => MOCKlineItems,
    useDiscount: () => MOCKdiscount,
})).mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => ({ websiteName: 'TestSite' })
})).mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => ({ pathname: '/' })
}));

describe('Billing', () => {
  test('render Billing component set to show', () => {
    const { asFragment } = render( <Billing section={'billing'} /> );

    expect(asFragment()).toMatchSnapshot();
  })

  test('render Billing component with the summary set to show', () => {
    const { asFragment } = render( <Billing section={'summaryB'} /> );
      
    expect(asFragment()).toMatchSnapshot();
  })

  test('render Billing component with another component set to show', () => {
    const { asFragment } = render( <Billing section={'shipping'} /> );
    
    expect(asFragment()).toMatchSnapshot();
  })
})
