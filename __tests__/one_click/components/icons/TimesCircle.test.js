import React from "react";
import { render } from "@testing-library/react";
import { TimesCircle } from "../../../../one_click/src/components/Icons";

describe('TimesCircle', () => {
  test('renders TimesCircle icon', () => {
    const { asFragment } = render( <TimesCircle /> )

    expect(asFragment()).toMatchSnapshot();
  })
});
