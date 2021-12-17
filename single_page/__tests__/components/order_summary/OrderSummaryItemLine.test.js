import React from 'react';
import { render } from '@testing-library/react'
import OrderSummaryItemLine from '../../../client/components/OrderSummary/components/OrderSummaryItemLine'

describe('OrderSummaryItemLine', () => {
  test('renders OrderSummaryItemLine', () => {
    const { asFragment } = render(
      <OrderSummaryItemLine
        description={'Test description'}
        amount={1919}
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })

  test('renders OrderSummaryItemLine as removable ', () => {
    const { asFragment } = render(
      <OrderSummaryItemLine
        description={'Test description'}
        amount={1919}
        onRemove={() => {}}
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
