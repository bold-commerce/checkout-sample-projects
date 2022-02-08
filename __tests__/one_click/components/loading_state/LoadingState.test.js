import React from 'react';
import LoadingState from '../../../../one_click/src/components/LoadingState/LoadingState';
import { render } from '@testing-library/react';

describe('LoadingState', () => {
    test('renders LoadingState component', () => {
        const { asFragment } = render( <LoadingState /> );
        expect(asFragment()).toMatchSnapshot();
    });
});
