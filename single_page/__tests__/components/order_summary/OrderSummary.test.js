import React from "react";
import { render } from "@testing-library/react";
import { OrderSummary } from "../../../client/components/OrderSummary";
import { exampleLineItems as MOCKlineItems } from '../../utils/lineItemHelpers';
import { exampleBreakdown as MOCKbreakdown } from '../../utils/orderHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useLineItems: () => ({
    data: MOCKlineItems,
    updateLineItemQuantity: (() => {}),
    removeLineItem: (() => {})
  }),
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

describe('OrderSummary', () => {
  test('renders OrderSummary component', () => {
    const { asFragment } = render( <OrderSummary /> )

    expect(asFragment()).toMatchSnapshot();
  })
});
