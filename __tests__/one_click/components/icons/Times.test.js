import React from 'react';
import { render } from "@testing-library/react";
import { Times } from "../../../../one_click/src/components/Icons";

describe('Times', () => {
  test('renders Times icon', () => {
    const { asFragment } = render( <Times/> )

    expect(asFragment()).toMatchSnapshot();
  })
});
