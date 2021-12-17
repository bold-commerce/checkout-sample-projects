import React from "react";
import { render } from "@testing-library/react";
import { EmptyShippingLines } from "../../../client/components/ShippingLines/components";

describe('EmptyShippingLines', () => {
  test('renders EmptyShippingLines', () => {
    const { asFragment } = render(<EmptyShippingLines title={'Test Title'} />)

    expect(asFragment()).toMatchSnapshot();
  })
})
