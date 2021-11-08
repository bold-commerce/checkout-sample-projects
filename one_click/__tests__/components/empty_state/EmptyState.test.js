import React from 'react';
import EmptyState from '../../../client/components/OneClickLayout/components/EmptyState/EmptyState';
import { render } from '@testing-library/react';

describe('EmptyState', () => {
    test('renders Empty State component', () => {
        const { asFragment } = render( <EmptyState title="Example Title" /> );
        expect(asFragment()).toMatchSnapshot();
    });
});