import React from 'react';
import { render } from '@testing-library/react';
import { Inventory } from '../../../../one_click/src/pages/Inventory';
import { MemoryRouter as Router } from "react-router-dom";
import { exampleInventory as MOCKinventory } from '../../../utils/lineItemHelpers';
import { exampleUseLineItems as MOCKlineItems } from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';
import { AppContext } from '../../../../one_click/src/context/AppContext';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useLineItems: () => MOCKlineItems
})).mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockImplementation(() => {
        return { pathname: 'pathname', state: MOCKinventory }
    }),
}));

describe('Inventory', () => {
    test('renders Inventory component', () => {
        const { asFragment } = render(
            <AppContext.Provider value={{ websiteName: "app.test" }}>
                <Router>
                    <Inventory />
                </Router>
            </AppContext.Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
