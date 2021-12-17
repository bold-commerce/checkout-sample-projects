import React from "react";
import { render } from "@testing-library/react";
import { DiscountForm } from '../../../client/components/DiscountForm';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useDiscount: () => ({
    data: {
      discountApplied: true,
      discountCode: 'Test'
    },
    applyDiscount: (() => {})
  })
}))


describe('DiscountForm', () => {
  test('renders DiscountForm component', () => {
    const { asFragment } = render( <DiscountForm/>)

    expect(asFragment()).toMatchSnapshot();
  })
})
