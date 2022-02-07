import React from "react";
import { render } from "@testing-library/react";
import { SoldOut } from '../../../../single_page/src/components/Icons';

describe('SoldOut', () => {
  test('renders SoldOut component', () => {
    const { asFragment } = render (<SoldOut />)

    expect(asFragment()).toMatchSnapshot();
  })
})