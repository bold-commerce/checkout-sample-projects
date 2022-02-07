import React from 'react';
import { render } from "@testing-library/react";
import { LineItem } from '../../../../single_page/src/components/LineItems';
import {
  exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
  exampleUseBillingAddress as MOCKbillingAddress,
  exampleUsePaymentIframe as MOCKpaymentIframe,
  exampleUseCheckoutStore as MOCKcheckoutStore,
  exampleUseCountryInfo as MOCKcountryInfo,
  exampleUseLineItems as MOCKlineItems,
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
  useBillingAddress: () => MOCKbillingAddress,
  usePaymentIframe : () => MOCKpaymentIframe,
  useCheckoutStore: () => MOCKcheckoutStore,
  useCountryInfo: () => MOCKcountryInfo,
  useLineItems: () => MOCKlineItems,
}));

describe('', () => {
  test('renders  component', () => {
    const { asFragment } = render(
      <LineItem 
        title="Test Item"
        onRemove={() => {}}
        onChange={() => {}}
        totalPrice={1991}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
