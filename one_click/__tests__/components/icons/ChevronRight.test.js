import React from "react";
import { render } from "@testing-library/react";
import { ChevronRight } from "../../../src/components/OneClickLayout/components/Icons";

describe('ChevronRight', () => {
  test('renders ChevronRight icon', () => {
    const { asFragment } = render( <ChevronRight /> )

    expect(asFragment()).toMatchSnapshot();
  })
});