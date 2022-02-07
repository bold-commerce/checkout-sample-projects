import React from 'react';
import { render } from "@testing-library/react";
import { ProcessingOrder } from '../../../../one_click/src/pages/Processing';
import '../../../../one_click/src/i18n/config';

describe('Processing', () => {
  test('renders Processing component', () => {
    const { asFragment } = render( <ProcessingOrder /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
