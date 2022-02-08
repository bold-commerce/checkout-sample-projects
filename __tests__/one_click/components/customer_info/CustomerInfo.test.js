import React from 'react';
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { CustomerInfo } from '../../../../one_click/src/components/CustomerInfo';
import { exampleUseCustomer as MOCKcustomer } from "../../../utils/hookHelpers";
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useCustomer: () => MOCKcustomer
}));

describe('CustomerInfo', () => {
  test('renders CustomerInfo component', () => {
    const { asFragment } = render(
      <CustomerInfo />,
      {wrapper: MemoryRouter}
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
