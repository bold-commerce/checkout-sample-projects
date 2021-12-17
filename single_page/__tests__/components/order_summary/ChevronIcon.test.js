import React from "react";
import { render } from "@testing-library/react";
import ChevronIcon from '../../../client/components/OrderSummary/components/ChevronIcon'

describe('ChevronIcon', () => {
  test('renders ChevronIcon components', () => {
    const { asFragment } = render(<ChevronIcon />)

    expect(asFragment()).toMatchSnapshot();
  })
})
