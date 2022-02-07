import React from 'react';
import { render } from "@testing-library/react";
import { ChevronRight } from "../../../../one_click/src/components/Icons";

describe('ChevronRight', () => {
  test('renders ChevronRight icon', () => {
    const { asFragment } = render( <ChevronRight /> )

    expect(asFragment()).toMatchSnapshot();
  })
});
