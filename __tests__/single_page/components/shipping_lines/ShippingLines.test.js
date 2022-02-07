import React from "react";
import { render } from "@testing-library/react";
import { ShippingLines } from "../../../../single_page/src/components/ShippingLines";
import {
  exampleUseShippingAddress as MOCKshippingAddress,
  exampleUseShippingLines as MOCKshippingLines,
  exampleUseLoadingStatus as MOCKloadingStatus,
  exampleUseErrors as MOCKerrors
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useShippingAddress: () => MOCKshippingAddress,
  useShippingLines: () => MOCKshippingLines,
  useLoadingStatus: () => MOCKloadingStatus,
  useErrors: () => MOCKerrors
}));

describe('ShippingLines', () => {
  test('renders ShippingLines component', () => {
    const { asFragment } = render(<ShippingLines/>)

    expect(asFragment()).toMatchSnapshot();
  });
});
