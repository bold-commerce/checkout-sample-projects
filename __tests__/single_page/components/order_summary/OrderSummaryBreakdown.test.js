import React from 'react';
import { render } from "@testing-library/react";
import { OrderSummaryBreakdown } from "../../../../single_page/src/components/OrderSummary";
import {
  exampleUseBreakdown as MOCKbreakdown,
  exampleUseDiscount as MOCKdiscount
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useDiscount: () => MOCKdiscount,
  useBreakdown: () => MOCKbreakdown
}));

describe('OrderSummaryBreakdown', () => {
  test('renders OrderSummaryBreakdown component', () => {
    const { asFragment } = render( <OrderSummaryBreakdown /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
