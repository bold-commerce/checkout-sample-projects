import React from "react";
import { render } from "@testing-library/react";
import BillingSameAsShipping from "../../../client/components/BillingAddress/components/BillingSameAsShipping";

describe('BillingSameAsShipping', () => {
  test('renders BillingSameAsShipping component', () => {
    const { asFragment } = render (
      <BillingSameAsShipping
        billingSameAsShipping
        setBillingSameAsShipping={() => {}}
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })

  test('renders BillingSameAsShipping component use different billing address', () => {
    const { asFragment } = render (
      <BillingSameAsShipping
        setBillingSameAsShipping={() => {}}
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })

  test('renders BillingSameAsShipping component disabled', () => {
    const { asFragment } = render (
      <BillingSameAsShipping
        billingSameAsShipping
        setBillingSameAsShipping={() => {}}
        disabled
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
