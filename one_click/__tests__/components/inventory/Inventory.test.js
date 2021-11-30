import React from 'react';
import { render } from '@testing-library/react';
import { Inventory } from '../../../client/components/OneClickLayout/components/Inventory';
import { MemoryRouter } from 'react-router';
import { 
    exampleLineItems as MOCKexampleLineItems,
    exampleInventory as MOCKinventory
} from '../../utils/lineItemHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useLineItems: () => ({
        data: MOCKexampleLineItems,
        updateLineItemQuantity: (() => {}),
        removeLineItems: (() => {})
    })
})).mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        state: MOCKinventory
    })
}));

describe('Inventory', () => {
    test('renders Inventory component', () => {
        const { asFragment } = render( 
            <Inventory />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    })
})