import React from "react";
import { render } from "@testing-library/react";
import { CheckoutButton } from '../../../client/components/CheckoutButton';
import { exampleLineItems as MOCKlineItems } from '../../utils/lineItemHelpers';
import {
  countries as MOCKcountries,
  caProvinces as MOCKprovinces,
  exampleAddress as MOCKaddress
} from '../../utils/addressHelpers';
import { MemoryRouter } from "react-router-dom";

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useBillingAddress: () => ({
    data: {MOCKaddress},
    submitBillingAddress: (() => {})
  }),
  useBillingSameAsShipping: () => ({
    setBillingSameAsShipping: (() => {}),
    data: true
  }),
  useCountryInfo: () => ({
    data: {
      countries: MOCKcountries,
      provinces: MOCKprovinces,
      provinceLabel: "province",
      showPostalCode: true,
      showProvince: true
    }
  }),
  usePaymentIframe : () => ({
    processPaymentIframe: (() => {})
  }),
  useCheckoutStore: () => ({
    state: {
      orderInfo: 'fulfilled',
      loadingStatus: {
        isLoading: false
      }
    }
  }),
  useLineItems: () => ({ 
    data : MOCKlineItems
  })
}))

describe('CheckoutButton', () => {
  test('renders CheckoutButton component', () => {
    const { asFragment } = render(
      <CheckoutButton />,
      {wrapper: MemoryRouter}
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
