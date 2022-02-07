import React from 'react';
import { render } from "@testing-library/react";
import { Customer } from "../../../../single_page/src/components/Customer";
import { exampleUseCustomer as MOCKcustomer } from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useCustomer: () => MOCKcustomer
}));

describe('Customer', () => {
  test('renders Customer component', () => {
    const { asFragment } = render ( <Customer /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
