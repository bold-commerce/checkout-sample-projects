import React from "react";
import { render } from "@testing-library/react";
import { TimesCircle } from "../../../client/components/OneClickLayout/components/Icons";

describe('TimesCircle', () => {
  test('renders TimesCircle icon', () => {
    const { asFragment } = render( <TimesCircle /> )

    expect(asFragment()).toMatchSnapshot();
  })
});