import React from "react";
import { render } from "@testing-library/react";
import { ProcessingOrder } from '../../../src/pages/Processing';
import '../../../src/i18n/config';

describe('Processing', () => {
  test('renders Processing component', () => {
    const { asFragment } = render( <ProcessingOrder /> );

    expect(asFragment()).toMatchSnapshot();
  })
})