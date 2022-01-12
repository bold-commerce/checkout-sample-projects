import React from "react";
import BackButton from '../../../src/components/OneClickLayout/components/BackButton/BackButton';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router";

describe('BackButton', () => {
    test('renders BackButton component', () => {
        const { asFragment } = render(
            <BackButton />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    })
});