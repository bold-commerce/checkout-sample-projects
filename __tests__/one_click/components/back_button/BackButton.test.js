import React from 'react';
import BackButton from '../../../../one_click/src/components/BackButton/BackButton';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '../../../../one_click/src/i18n/config';

describe('BackButton', () => {
    test('renders BackButton component', () => {
        const { asFragment } = render(
            <BackButton />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    })
});
