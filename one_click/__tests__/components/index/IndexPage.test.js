import React from 'react';
import IndexPage from '../../../client/components/OneClickLayout/components/Index/IndexPage';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { exampleLineItems as MOCKexampleLineItems } from '../../utils/lineItemHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useLineItems: () => ({
        lineItems: MOCKexampleLineItems,
        updateLineItemQuantity: (() => {}),
        removeLineItem: (() => {})        
    }),
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
    usePaymentIframe: () => ({ })
}));

describe('IndexPage', () => {
    test('renders IndexPage component', () => {
        const { asFragment } = render(
            <IndexPage />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });
});