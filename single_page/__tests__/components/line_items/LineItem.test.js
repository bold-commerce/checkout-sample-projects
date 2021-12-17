import React from "react";
import { render } from "@testing-library/react";
import { LineItem } from '../../../client/components/LineItems';
import { exampleLineItems as MOCKlineItems } from '../../utils/lineItemHelpers';
import {
  countries as MOCKcountries,
  caProvinces as MOCKprovinces,
  exampleAddress as MOCKaddress
} from '../../utils/addressHelpers';

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

describe('', () => {
  test('renders  component', () => {
    const { asFragment } = render(
      <LineItem 
        title="Test Item"
        onRemove={() => {}}
        onChange={() => {}}
        totalPrice={1991}
      />
        
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
