import React from 'react';
import Confirmation from '../../../client/components/OneClickLayout/components/Confirmation/Confirmation';
import { testApplicationState as MOCKtestApplicationState } from '../../utils/applicationStateHelper';
import { MemoryRouter } from 'react-router';
import { render } from '@testing-library/react';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () => ({
        state: { applicationState: MOCKtestApplicationState }
    })
}));

describe('Confirmation', () => {
    test('renders Confirmation component', () => {
        const { asFragment } = render(
            <Confirmation />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });
});