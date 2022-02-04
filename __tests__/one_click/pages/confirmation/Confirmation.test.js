import React from 'react';
import { Confirmation } from '../../../../one_click/src/pages/Confirmation';
import { testApplicationState as MOCKtestApplicationState } from '../../../utils/applicationStateHelper';
import { render } from '@testing-library/react';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () => ({
        state: { applicationState: MOCKtestApplicationState }
    })
})).mock('React', () => ({
    ...jest.requireActual('React'),
    useContext: () => ({
        websiteName: 'app.test'
    })
}));

describe('Confirmation', () => {
    test('renders Confirmation component', () => {
        const { asFragment } = render(
            <Confirmation />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
