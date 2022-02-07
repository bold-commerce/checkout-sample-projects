import React from 'react';
import { render } from "@testing-library/react";
import  { LoadingState } from '../../../../single_page/src/components/LoadingState';

describe('LoadingState', () => {
  test('renders LoadingState component', () => {
    const { asFragment } = render ( <LoadingState /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
