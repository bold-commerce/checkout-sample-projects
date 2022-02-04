import React from 'react';
import EmptyStateLogo from '../../../../one_click/src/components/EmptyState/EmptyStateLogo';
import { render } from '@testing-library/react';

describe('EmptyStateKLogo', () => {
    test('renders Empty State Logo component', () => {
        const { asFragment } = render( <EmptyStateLogo /> );
        expect(asFragment()).toMatchSnapshot();
    });
});
