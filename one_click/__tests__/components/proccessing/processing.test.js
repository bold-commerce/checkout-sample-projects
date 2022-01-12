import React from "react";
import { render } from "@testing-library/react";
import { ProcessingOrder } from '../../../src/components/OneClickLayout/components/Processing';

describe('Processing', () => {
  test('renders Processing component', () => {
    const { asFragment } = render( <ProcessingOrder /> );

    expect(asFragment()).toMatchSnapshot();
  })
})