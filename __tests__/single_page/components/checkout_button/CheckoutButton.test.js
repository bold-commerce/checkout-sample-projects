import React from "react";
import { render } from '@testing-library/react';
import { CheckoutButton } from '../../../../single_page/src/components/CheckoutButton';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  usePaymentIframe: () => ({
    processPaymentIframe: (() => {})
  }),
  useCheckoutStore: () => ({
    data: {
      orderInfo: {
        orderStatus: 'pending'
      }
    }
  })
}));


describe('CheckoutButton', () => {
  test('renders CheckoutButton component', () => {
    const { asFragment } = render(
      <CheckoutButton />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
