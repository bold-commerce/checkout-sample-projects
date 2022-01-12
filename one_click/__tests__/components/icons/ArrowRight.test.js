import React from "react";
import { render } from "@testing-library/react";
import { ArrowRight } from "../../../src/components/OneClickLayout/components/Icons";

describe('ArrowRight', () => {
  test('renders ArrowRight icon', () => {
    const { asFragment } = render( <ArrowRight /> )

    expect(asFragment()).toMatchSnapshot();
  })
});