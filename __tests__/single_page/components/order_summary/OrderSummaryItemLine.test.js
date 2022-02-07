import React from 'react';
import { render } from '@testing-library/react'
import OrderSummaryItemLine from '../../../../single_page/src/components/OrderSummary/components/OrderSummaryItemLine'
import '../../../../single_page/src/i18n/config';

describe('OrderSummaryItemLine', () => {
  test('renders OrderSummaryItemLine', () => {
    const { asFragment } = render(
      <OrderSummaryItemLine
        description={'Test description'}
        amount={1919}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders OrderSummaryItemLine as removable ', () => {
    const { asFragment } = render(
      <OrderSummaryItemLine
        description={'Test description'}
        amount={1919}
        onRemove={() => {}}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
