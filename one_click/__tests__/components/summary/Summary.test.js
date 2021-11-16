import React from 'react';
import { render } from '@testing-library/react';
import { Summary } from '../../../client/components/OneClickLayout/components/Summary'
import { MemoryRouter } from 'react-router';
import { testApplicationState as MOCKapplicationState } from '../../utils/applicationStateHelper';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useShippingLines: () => ({
        selectedShippingLineIndex: 0,
        shippingLines: [],
        showShippingLines: true
    }),
    useDiscount: () => ({
        discountCode: 'TEST',
        discountTotal: 1000,
        removeDiscount: () => {},
        discountApplied: true
    }),
    useCheckoutStore: () => ({
        state: {
            applicationState: MOCKapplicationState,
            orderTotals: {
                subtotal: 2222,
                taxesTotal: 1200,
                total: 2422
            },
            orderInfo: {
                billingSameAsShipping:true,
                orderStatus: ""
            },
            errors: { order: null },
            loadingStatus: { isLoading: false }
        }
    })
}));

describe('Summary', () => {
    test('renders Summary component', () => {
        const { asFragment } = render(
            <Summary />,
            {wrapper: MemoryRouter}
        );

        expect(asFragment()).toMatchSnapshot();
    });
});