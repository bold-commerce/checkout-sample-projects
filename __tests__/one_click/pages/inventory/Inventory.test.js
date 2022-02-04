import React from 'react';
import { render } from '@testing-library/react';
import { Inventory } from '../../../../one_click/src/pages/Inventory';
import { exampleInventory as MOCKinventory } from '../../../utils/lineItemHelpers';
import { exampleUseLineItems as MOCKlineItems } from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';
import History from 'history';
const MOCKhistory = History;

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useLineItems: () => MOCKlineItems
})).mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Router: () => ({
        location: MOCKhistory.location,
        navigator: MOCKhistory
    })
})).mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        pathname: '/inventory',
        state: MOCKinventory
    }),
    useNavigate: () => ({
        navigate: (() => {})
    })
})).mock('React', () => ({
    ...jest.requireActual('React'),
    useContext: () => ({
        websiteName: 'app.test'
    })
}));

describe('Inventory', () => {
    test('renders Inventory component', () => {
        const { asFragment } = render(
            <Inventory />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
