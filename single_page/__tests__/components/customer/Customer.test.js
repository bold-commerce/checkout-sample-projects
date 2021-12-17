import React from "react";
import { render } from "@testing-library/react";
import { Customer } from "../../../client/components/Customer";

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useCustomer: () => ({
    data: {
      email_address: "guy@test.gg",
      isAuthenticated: true
    },
    submitCustomer: (() => {})
  })
}));

describe('Customer', () => {
  test('renders Customer component', () => {
    const { asFragment } = render (
      <Customer />
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
