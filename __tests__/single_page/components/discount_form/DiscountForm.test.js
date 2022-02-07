import React from "react";
import { render } from "@testing-library/react";
import { DiscountForm } from '../../../../single_page/src/components/DiscountForm';
import { exampleUseDiscount as MOCKdiscount } from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useDiscount: () => MOCKdiscount
}))

describe('DiscountForm', () => {
  test('renders DiscountForm component', () => {
    const { asFragment } = render( <DiscountForm />)

    expect(asFragment()).toMatchSnapshot();
  })
})