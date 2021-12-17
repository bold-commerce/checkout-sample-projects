import React from "react";
import { render } from "@testing-library/react";
import OrderSummaryItem from "../../../client/components/OrderSummary/components/OrderSummaryItem";
import OrderSummaryItemLine from "../../../client/components/OrderSummary/components/OrderSummaryItemLine";

describe('OrderSummaryLine', () => {
  test('renders OrderSummaryLine component', () => {
    const { asFragment } = render (
      <OrderSummaryItem
        title={'Test Item'}
      />)

    expect(asFragment()).toMatchSnapshot();
  })

  test('renders OrderSummaryLine component with amount', () => {
    const { asFragment } = render (
      <OrderSummaryItem
        title={'Test Item'}
        amount={1919}
      />)

    expect(asFragment()).toMatchSnapshot();
  })

  test('renders OrderSummaryLine component with lines', () => {
    const { asFragment } = render (
      <OrderSummaryItem
        title={'Test Item'}
        lines={
          <OrderSummaryItemLine
            description={'Test Card'}
            amount={1919}
            key={'lock'}
          />
        }
      />)

    expect(asFragment()).toMatchSnapshot();
  })
})
