'use strict';

import React from "react";
import { render } from "@testing-library/react";
import { BillingAddress } from '../../../client/components/BillingAddress';
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
  })
}))

describe('BillingAddress', () => {
  test('renders BillingAddress component', () => {
    const { asFragment } = render (
      <BillingAddress />
    )

    expect(asFragment()).toMatchSnapshot();
  })

  test('renders BillingAddress component while application loading', () => {
    const { asFragment } = render (
      <BillingAddress applicationLoading={true} />
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
