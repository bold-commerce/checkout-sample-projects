import React from 'react';
import { render } from "@testing-library/react";
import { LineItemQuantity } from "../../../../single_page/src/components/LineItems";

describe('LineItemQuantity', () => {
  test('renders LineItemQuantity component',  () => {
    const { asFragment } = render ( <LineItemQuantity defaultValue={1} /> );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders LineItemQuantity component loading',  () => {
    const { asFragment } = render ( <LineItemQuantity /> )

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders LineItemQuantity component as read only',  () => {
    const { asFragment } = render (
      <LineItemQuantity
        defaultValue={1}
        readOnly
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
