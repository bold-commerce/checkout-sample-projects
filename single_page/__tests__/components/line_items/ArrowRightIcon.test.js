import React from "react";
import { render } from "@testing-library/react";
import ArrowRightIcon from '../../../client/components/LineItems/components/ArrowRightIcon'

describe('ArrowRightIcon', () => {
  test('renders ArrowRightIcon component', () => {
    const { asFragment } = render (<ArrowRightIcon />)

    expect(asFragment()).toMatchSnapshot();
  })
})
