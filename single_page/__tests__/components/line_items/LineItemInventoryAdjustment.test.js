import React from "react";
import { render } from "@testing-library/react";
import { exampleLineItems as MOCKlineItems } from '../../utils/lineItemHelpers';
import {
  countries as MOCKcountries,
  caProvinces as MOCKprovinces,
  exampleAddress as MOCKaddress
} from '../../utils/addressHelpers';
import LineItemInventoryAdjustment from "../../../client/components/LineItems/components/LineItemInventoryAdjustment";

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
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

describe('LineItemInventoryAdjustment', () => {
  test('renders LineItemInventoryAdjustment component', () => {
    const { asFragment } = render(
      <LineItemInventoryAdjustment
        originalQuantity={2}
        quantity={1}
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })
  
  test('renders LineItemInventoryAdjustment component sold out', () => {
    const { asFragment } = render(
      <LineItemInventoryAdjustment
        originalQuantity={2}
        quantity={0}
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })
  test('renders LineItemInventoryAdjustment component that is read only', () => {
    const { asFragment } = render(
      <LineItemInventoryAdjustment
        originalQuantity={2}
        quantity={1}
        readOnly
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
