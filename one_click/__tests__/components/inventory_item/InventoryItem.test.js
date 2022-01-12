import React from 'react';
import { render } from '@testing-library/react';
import { InventoryItem } from '../../../src/components/InventoryItem';
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

describe('InventoryItem', () => {
    test('renders InventoryItem component with stock', () => {
        const { asFragment } = render(
            <InventoryItem
                title={"Test Title"}
                variants={["Test description"]}
                orderQty={3}
                stockQty={1}
                onRemove={() => {}}
                image={""}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders InventoryItem component with no stock', () => {
        const { asFragment } = render(
            <InventoryItem
                title={"Test Title"}
                variants={["Test description"]}
                orderQty={1}
                stockQty={0}
                onRemove={() => {}}
                image={""}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    })
})
