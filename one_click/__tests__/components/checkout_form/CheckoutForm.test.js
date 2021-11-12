import React from "react";
import CheckoutForm from '../../../client/components/OneClickLayout/components/CheckoutForm/CheckoutForm'
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router";
import { exampleLineItems as MOCKexampleLineItems } from '../../utils/lineItemHelpers'

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useLineItems: () => ({
        lineItems: MOCKexampleLineItems,
        updateLineItemQuantity: (() => {}),
        removeLineItems: (() => {})
    })
}))

describe('CheckoutForm', () => {
    test('renders CheckoutForm', () => {
        const { asFragment } = render(
            <CheckoutForm />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });
});