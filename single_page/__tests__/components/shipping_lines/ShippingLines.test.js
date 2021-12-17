import React from "react";
import { render } from "@testing-library/react";
import { exampleLineItems as MOCKlineItems } from '../../utils/lineItemHelpers';
import { 
  exampleBreakdown as MOCKbreakdown,
  exampleShippingLines as MOCKshippingLines
} from '../../utils/orderHelpers';
import {
  countries as MOCKcountries,
  caProvinces as MOCKprovinces,
  exampleAddress as MOCKaddress
} from '../../utils/addressHelpers';
import ShippingLines from "../../../client/components/ShippingLines/ShippingLines";

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
    data: {
      url: 'test.gg',
      height: 42
    },
    processPaymentIframe: (() => {}),
    paymentIframeOnLoaded: (() => {})
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
  }),
  useBreakdown: () => ({
    data: MOCKbreakdown
  }),
  useDiscount: () => ({
    data: {
      discountApplied: true,
      discountCode: 'Test'
    },
    applyDiscount: (() => {})
  }),
  useShippingAddress: () => ({
    data: MOCKaddress
  }),
  useShippingLines: () => ({
    data: {
      shippingLines: MOCKshippingLines
    },
    updateShippingLines: (() => {}),
    getShippingLines: (() => { return MOCKshippingLines })
  }),
  useLoadingStatus: () => ({
    data: {
      shippingAddress: 'fulfilled'
    }
  }),
  useErrors: () => ({
    data: { shippingAddress: false}
  })
}))

describe('ShippingLines', () => {
  test('renders ShippingLines component', () => {
    const { asFragment } = render(<ShippingLines/>)

    expect(asFragment()).toMatchSnapshot();
  })
})
