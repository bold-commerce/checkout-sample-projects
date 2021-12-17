import React from "react";
import { render } from "@testing-library/react";
import OrderSummaryCollapseButton from '../../../client/components/OrderSummary/components/OrderSummaryCollapseButton';
import { exampleLineItems as MOCKlineItems } from '../../utils/lineItemHelpers';
import { exampleBreakdown as MOCKbreakdown } from '../../utils/orderHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useLineItems: () => ({
    data: MOCKlineItems
  }),
  useBreakdown: () => ({
    data: MOCKbreakdown
  })
}))

describe('OrderSummaryCollapseButton', () => {
  test('renders OrderSummaryCollapseButton component', () => {
    const { asFragment } = render (<OrderSummaryCollapseButton/>)

    expect(asFragment()).toMatchSnapshot();
  })
})
