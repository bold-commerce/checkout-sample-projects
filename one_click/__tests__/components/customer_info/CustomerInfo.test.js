import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CustomerInfo } from '../../../src/components/OneClickLayout/components/CustomerInfo';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useCustomer: () => ({
    data: {
      platform_id: 123
    }
  })
}));

describe('CustomerInfo', () => {
  test('renders CustomerInfo component', () => {
    const { asFragment } = render(
      <CustomerInfo />,
      {wrapper: MemoryRouter}
      );

    expect(asFragment()).toMatchSnapshot()
  });
})