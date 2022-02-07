import React from 'react';
import { render } from "@testing-library/react";
import OrderSummaryItem from "../../../../single_page/src/components/OrderSummary/components/OrderSummaryItem";
import OrderSummaryItemLine from "../../../../single_page/src/components/OrderSummary/components/OrderSummaryItemLine";
import '../../../../single_page/src/i18n/config';

describe('OrderSummaryLine', () => {
  test('renders OrderSummaryLine component', () => {
    const { asFragment } = render ( <OrderSummaryItem title={'Test Item'} /> );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders OrderSummaryLine component with amount', () => {
    const { asFragment } = render (
      <OrderSummaryItem
        title={'Test Item'}
        amount={1919}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

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
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
