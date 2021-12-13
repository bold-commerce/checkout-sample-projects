import React from "react";
import { render } from "@testing-library/react";
import { Times } from "../../../client/components/OneClickLayout/components/Icons";

describe('Times', () => {
  test('renders Times icon', () => {
    const { asFragment } = render( <Times/> )

    expect(asFragment()).toMatchSnapshot();
  })
});