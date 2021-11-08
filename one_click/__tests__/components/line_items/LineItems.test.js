import React from 'react';
import { render } from '@testing-library/react';
import { LineItems } from '../../../client/components/OneClickLayout/components/LineItems/LineItems'

const lineItems = [
  {
    product_data: {
      title: 'Test Product A',
      image_url: 'https://via.placeholder.com/150',
      quantity: 2,
      price: 2999,
      total_price: 5998,
      description: 'Test description goes here',
      line_item_key: '12345',
    },
  },
  {
    product_data: {
      title: 'Test Product B',
      image_url: 'https://via.placeholder.com/150',
      quantity: 4,
      price: 1999,
      total_price: 7996,
      description: 'Test description goes here',
      line_item_key: '67890',
    },
  },
];

describe('LineItems', () => {
  test('renders LineItems component with editable quantity', () => {
    const { asFragment } = render(
      <LineItems
        readOnly={false}
        lineItems={lineItems}
        updateLineItemQuantity={() => {}}
        removeLineItem={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders read only LineItems component', () => {
    const { asFragment } = render(
      <LineItems
        readOnly
        lineItems={lineItems}
        updateLineItemQuantity={() => {}}
        removeLineItem={() => {}}
      />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
