import React from "react";
import BackButton from '../../../client/components/OneClickLayout/components/BackButton/BackButton';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router";

describe('BackButton', () => {
    test('renders BackButton component', () => {
        // <BackButton> requires a wrapper because it contains <Link>
        const { asFragment } = render(
            <BackButton />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    })
});