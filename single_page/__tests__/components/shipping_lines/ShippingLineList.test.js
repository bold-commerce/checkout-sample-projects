import React from "react";
import { render } from "@testing-library/react";
import { ShippingLineList } from "../../../client/components/ShippingLines/components";
import { exampleShippingLines as MOCKshippingLines } from '../../utils/orderHelpers'

describe('ShippingLineList', () => {
  test('renders ShippingLineList component', () => {
    const { asFragment } = render(
      <ShippingLineList
        shippingLines={MOCKshippingLines}
        selectedShippingLine={0}
      />
    )
    
    expect(asFragment()).toMatchSnapshot();
  })

  test('renders ShippingLineList component disabled', () => {
    const { asFragment } = render(
      <ShippingLineList
        shippingLines={MOCKshippingLines}
        selectedShippingLine={0}
        disabled
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
