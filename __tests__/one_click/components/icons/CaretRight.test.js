import React from 'react';
import { render } from "@testing-library/react";
import { CaretRight } from "../../../../one_click/src/components/Icons";

describe('CaretRight', () => {
  test('renders CaretRight icon', () => {
    const { asFragment } = render( <CaretRight /> )

    expect(asFragment()).toMatchSnapshot();
  })
});
