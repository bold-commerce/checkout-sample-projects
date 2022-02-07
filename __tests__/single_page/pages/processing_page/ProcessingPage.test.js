import React from 'react';
import { render } from "@testing-library/react";
import { ProcessingPage } from "../../../../single_page/src/pages/ProcessingPage";
import '../../../../single_page/src/i18n/config';

describe('ProcessingPage', () => {
  test('renders ProcessingPage page', () => {
    const { asFragment } = render( <ProcessingPage /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
