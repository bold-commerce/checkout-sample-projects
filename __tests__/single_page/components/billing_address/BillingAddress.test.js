import React from "react";
import { render } from "@testing-library/react";
import { BillingAddress } from '../../../../single_page/src/components/BillingAddress';
import {
  exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
  exampleUseBillingAddress as MOCKbillingAddress,
  exampleUseCountryInfo as MOCKcountryInfo,
} from "../../../utils/hookHelpers";
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
  useBillingAddress: ()=> MOCKbillingAddress,
  useCountryInfo: () => MOCKcountryInfo,
}));

describe('BillingAddress', () => {
  test('renders BillingAddress component', () => {
    const { asFragment } = render( <BillingAddress /> );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders BillingAddress component while loading', () => {
    const { asFragment } = render( <BillingAddress applicationLoading /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
