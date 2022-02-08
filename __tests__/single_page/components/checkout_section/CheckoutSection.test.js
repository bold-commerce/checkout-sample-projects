import React from 'react';
import { render } from "@testing-library/react";
import { CheckoutSection } from '../../../../single_page/src/components/CheckoutSection';
import {
  exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
  exampleUseBIllingAddress as MOCKbillingAddress,
  exampleUsePaymentIframe as MOCKpaymentIframe,
  exampleUseCheckoutStore as MOCKcheckoutStore,
  exampleUseCountryInfo as MOCKcountryInfo,
  exampleUseLineItems as MOCKlineItems,
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
  useBillingAddress: () => MOCKbillingAddress,
  usePaymentIframe : () => MOCKpaymentIframe,
  useCheckoutStore: () => MOCKcheckoutStore,
  useCountryInfo: () => MOCKcountryInfo,
  useLineItems: () => MOCKlineItems,
}));

describe('CheckoutSection', () => {
  test('renders CheckoutSection component without children', () => {
    const { asFragment } = render( <CheckoutSection title="Test Title" /> );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders CheckoutSection component with children', () => {
    const { asFragment } = render(
      <CheckoutSection 
        title="Test Title"
        children={
          <>
            <div>test child one</div>
            <div>test child two</div>
            <div>test child three</div>
          </>
        }
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
