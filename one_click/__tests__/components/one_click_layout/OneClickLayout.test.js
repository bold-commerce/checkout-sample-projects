import React from "react";
import { render } from '@testing-library/react';
import { OneClickLayout } from '../../../client/components/OneClickLayout'
import { exampleLineItems as MOCKexampleLineItems } from '../../utils/lineItemHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () => ({
        state: {
            orderInfo: {
                billingSameAsShipping:true,
                orderStatus: ""
            },
            errors: { order: null },
            loadingStatus: { isLoading: false }
        }
    }),
    useLineItems: () => ({
        lineItems: MOCKexampleLineItems,
        updateLineItemQuantity: (() => {}),
        removeLineItem: (() => {})        
    }),
    usePaymentIframe: () => ({ })
}))

describe('OneClickLayout', () => {
    test('renders OneClickLayout component', () => {
        const { asFragment } = render( <OneClickLayout orderStatus={null} /> );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders OneClickLayout component order processing', () => {
        const { asFragment } = render( <OneClickLayout orderStatus={'processing'} /> );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders OneClickLayout component order processed', () => {
        const { asFragment } = render( <OneClickLayout orderStatus={'completed'} /> );
        expect(asFragment()).toMatchSnapshot();
    });
});