import React from 'react';
import { render } from '@testing-library/react';
import { Summary } from '../../../src/components/Summary'
import { MemoryRouter } from 'react-router';
import { exampleLineItems as MOCKexampleLineItems } from '../../utils/lineItemHelpers';
import { testApplicationState as MOCKapplicationState } from '../../utils/applicationStateHelper';
import { exampleShippingState as MOCKexampleShippingState } from '../../utils/shippingLinesHelper';
import '../../../src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () => ({
        state: {
            orderInfo: {
                billingSameAsShipping:true,
                orderStatus: ""
            },
            errors: { order: null },
            loadingStatus: { isLoading: false },
            applicationState: MOCKapplicationState,
            orderTotals: {
                taxesTotal: 1200,
                subTotal: 23000,
                total: 24200
            }
        }
    }),
    useShippingLines: () => ({
        data: MOCKexampleShippingState
    }),
    useDiscount: () => ({
        data: '?',
        applyDiscount : (() => {})
    }),
    usePaymentIframe: () => ({
        data: {
            url: 'test.url',
            loadingStatus: 'fulfilled',
            paymentIframeOnLoaded: (() => {})
        }
    }),
    useLineItems: () => ({
        data: MOCKexampleLineItems
    })
})).mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => ({
        setShowCheckout: (() => {})
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