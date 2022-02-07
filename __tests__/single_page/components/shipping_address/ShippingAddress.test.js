import React from "react";
import { render } from "@testing-library/react";
import ShippingAddress from "../../../../single_page/src/components/ShippingAddress/ShippingAddress";
import {
  exampleUseShippingAddress as MOCKshippingAddress,
  exampleUseSavedAddresses as MOCKsavedAddresses,
  exampleUseLoadingStatus as MOCKloadingStatus,
  exampleUseCountryInfo as MOCKcountryInfo
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useShippingAddress: () => MOCKshippingAddress,
  useSavedAddresses: () => MOCKsavedAddresses,
  useLoadingStatus: () => MOCKloadingStatus,
  useCountryInfo: () => MOCKcountryInfo
}));

describe('ShippingAddress', () => {
  test('renders ShippingAddress component', () => {
    const { asFragment } = render(
      <ShippingAddress />
    )

    expect(asFragment()).toMatchSnapshot();
  })
})