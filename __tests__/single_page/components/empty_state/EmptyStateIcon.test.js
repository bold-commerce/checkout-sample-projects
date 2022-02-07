import React from 'react';
import { render } from "@testing-library/react";
import { EmptyStateIcon } from '../../../../single_page/src/components/EmptyState/components';

describe('EmptyState', () => {
  test('renders EmptyState component', () => {
    const { asFragment } = render( <EmptyStateIcon /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
