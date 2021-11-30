import React from 'react';
import { render } from '@testing-library/react';
import { LineItem } from '../../../client/components/OneClickLayout/components/LineItems'

describe('LineItem', () => {
  test('renders LineItem component with editable quantity', () => {
    const { asFragment } = render(
      <LineItem
        title="Product A"
        image="https://via.placeholder.com/150"
        quantity={2}
        price={9999}
        totalPrice={19998}
        lineItemKey="abcd"
        onRemove={() => {}}
        onQuantityChange={() => {}}
        description="Test description right here"
        readOnly={false}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders read only LineItem component', () => {
    const { asFragment } = render(
      <LineItem
        title="Product A"
        image="https://via.placeholder.com/150"
        quantity={2}
        price={9999}
        totalPrice={19998}
        lineItemKey="abcd"
        onRemove={() => {}}
        onQuantityChange={() => {}}
        description="Test description right here"
        readOnly
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
