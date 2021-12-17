import React from "react";
import { render } from "@testing-library/react";
import { CheckoutSection } from '../../../client/components/CheckoutSection';
import { exampleLineItems as MOCKlineItems } from '../../utils/lineItemHelpers';
import {
  countries as MOCKcountries,
  caProvinces as MOCKprovinces,
  exampleAddress as MOCKaddress
} from '../../utils/addressHelpers';

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

describe('CheckoutSection', () => {
  test('renders CheckoutSection component without children', () => {
    const { asFragment } = render(
      <CheckoutSection 
        title="Test Title"
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })

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
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
