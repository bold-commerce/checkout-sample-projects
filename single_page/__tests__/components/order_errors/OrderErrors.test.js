import React from "react";
import { render } from "@testing-library/react";
import OrderErrors from "../../../client/components/OrderErrors/OrderErrors";

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useErrors: () => ({
    data: {
      order: [{ message: 'Testing order errors' }]
    }
  })
}));

describe('OrderErrors', () => {
  test('renders OrderErrors component', () => {
    const { asFragment } = render ( <OrderErrors /> )

    expect(asFragment()).toMatchSnapshot();
  })
})
