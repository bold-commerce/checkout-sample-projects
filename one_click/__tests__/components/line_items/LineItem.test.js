import React from 'react';
import { render } from '@testing-library/react';
import { LineItem } from '../../../src/components/OneClickLayout/components/LineItems'

describe('LineItem', () => {
  test('renders LineItem component with editable quantity', () => {
    const { asFragment } = render(
      <LineItem
        title="Product A"
        image="https://via.placeholder.com/150"
        quantity={2}
        totalPrice={19998}
        lineItemKey="abcd"
        variants={["Test description right here"]}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
