import React from "react";
import { render } from "@testing-library/react";
import { exampleBreakdown as MOCKbreakdown } from '../../utils/orderHelpers';
import { OrderSummaryBreakdown } from "../../../client/components/OrderSummary";

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useDiscount: () => ({
    data: {
      discountTotal: 123,
      discountApplied: true,
      discountCode: 'Test'
    },
    applyDiscount: (() => {})
  }),
  useBreakdown: () => ({
    data: MOCKbreakdown
  })
}))

describe('OrderSummaryBreakdown', () => {
  test('renders OrderSummaryBreakdown component', () => {
    const { asFragment } = render( <OrderSummaryBreakdown /> )

    expect(asFragment()).toMatchSnapshot();
  })
})
