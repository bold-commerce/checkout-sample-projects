import React from 'react';
import EmptyStateLogo from '../../../src/components/OneClickLayout/components/EmptyState/EmptyStateLogo';
import { render } from '@testing-library/react';

describe('EmptyStateKLogo', () => {
    test('renders Empty State Logo component', () => {
        const { asFragment } = render( <EmptyStateLogo /> );
        expect(asFragment()).toMatchSnapshot();
    });
});