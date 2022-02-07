import React from "react";
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { CheckoutButton } from '../../../../single_page/src/components/CheckoutButton';
import {
  exampleUseBillingAddress as MOCKbillingAddress,
  exampleUsePaymentIframe as MOCKPaymentIframe,
  exampleUseCheckoutStore as MOCKcheckoutStore,
  exampleUseLineItems as MOCKlineItems
} from "../../../utils/hookHelpers";
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useBillingAddress: () => MOCKbillingAddress,
  usePaymentIframe: () => MOCKPaymentIframe,
  useCheckoutStore: () => MOCKcheckoutStore,
  useLineItems: () => MOCKlineItems,
}));


describe('CheckoutButton', () => {
  test('renders CheckoutButton component', () => {
    const { asFragment } = render(
      <CheckoutButton />,
      {wrapper: MemoryRouter}
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
