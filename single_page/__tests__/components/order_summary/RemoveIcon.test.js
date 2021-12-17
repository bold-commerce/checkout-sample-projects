import React from "react";
import { render } from "@testing-library/react";
import RemoveIcon from '../../../client/components/OrderSummary/components/RemoveIcon'

describe('RemoveIcon', () => {
  test('renders RemoveIcon components', () => {
    const { asFragment } = render(<RemoveIcon />)

    expect(asFragment()).toMatchSnapshot();
  })
})
