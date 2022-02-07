import React from 'react';
import { render } from "@testing-library/react";
import { OrderErrors } from '../../../../single_page/src/components/OrderErrors';
import { exampleUseErrors as MOCKerrors } from '../../../utils/hookHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useErrors: () => MOCKerrors
}));

describe('OrderErrors', () => {
  test('renders OrderErrors component', () => {
    const { asFragment } = render ( <OrderErrors /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
