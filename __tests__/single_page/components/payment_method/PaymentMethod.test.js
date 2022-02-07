import React from 'react';
import { render } from "@testing-library/react";
import { PaymentMethod } from '../../../../single_page/src/components/PaymentMethod';
import {
  exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
  exampleUseShippingAddress as MOCKshippingAddress,
  exampleUseBillingAddress as MOCKbillingAddress,
  exampleUseCheckoutStore as MOCKcheckoutStore,
  exampleUsePaymentIframe as MOCKpaymentIframe,
  exampleUseShippingLines as MOCKshippingLines
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
  useShippingAddress: () => MOCKshippingAddress,
  useBillingAddress: () => MOCKbillingAddress,
  usePaymentIframe : () => MOCKpaymentIframe,
  useShippingLines: () => MOCKshippingLines,
  useCheckoutStore: () => MOCKcheckoutStore
}));

describe('PaymentMethod', () => {
  test('renders PaymentMethod component', () => {
    const { asFragment } = render( <PaymentMethod /> );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders PaymentMethod component while loading', () => {
    const { asFragment } = render( <PaymentMethod applicationLoading /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
