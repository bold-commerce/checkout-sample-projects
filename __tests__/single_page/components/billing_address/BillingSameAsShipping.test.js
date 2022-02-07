import React from 'react';
import { render } from "@testing-library/react";
import { BillingSameAsShipping } from "../../../../single_page/src/components/BillingAddress";
import '../../../../single_page/src/i18n/config'

describe('BillingSameAsShipping', () => {
  test('renders BillingSameAsShipping component with billing the same as shipping', () => {
    const { asFragment } = render( 
      <BillingSameAsShipping billingSameAsShipping />
    );

    expect(asFragment()).toMatchSnapshot();
  })
  test('renders BillingSameAsShipping component with billing not the same as shipping', () => {
    const { asFragment } = render( 
      <BillingSameAsShipping />
    );

    expect(asFragment()).toMatchSnapshot();
  })
  test('renders BillingSameAsShipping component disabled with billing same as shipping', () => {
    const { asFragment } = render( 
      <BillingSameAsShipping billingSameAsShipping disabled />
    );

    expect(asFragment()).toMatchSnapshot();
  })
  test('renders BillingSameAsShipping component disabled with billing not the same as shipping', () => {
    const { asFragment } = render( 
      <BillingSameAsShipping disabled />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
