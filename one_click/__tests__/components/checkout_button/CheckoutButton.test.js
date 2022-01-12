import React from "react";
import { render } from '@testing-library/react';
import { CheckoutButton } from '../../../src/components/CheckoutButton'
import { exampleLineItems as MOCKexampleLineItems } from '../../utils/lineItemHelpers';
import { testApplicationState as MOCKapplicationState } from '../../utils/applicationStateHelper';

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
            applicationState: MOCKapplicationState
        }
    }),
    usePaymentIframe: () => ({ }),
    useLineItems: () => ({
        lineItems: MOCKexampleLineItems
    })
}))

describe('CheckoutButton', () => {
    test('renders CheckoutButton component', () => {
        const { asFragment } = render(
            <CheckoutButton 
                disabled={null} 
                onClick={null} 
                loading={null} 
                className={null} 
                errorMessage={null} 
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders CheckoutButton component with an error message', () => {
        const error = "This is the test error message."
        const { asFragment } = render(
                <CheckoutButton 
                    disabled={null} 
                    onClick={null} 
                    loading={null} 
                    className={null} 
                    errorMessage={error} 
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders CheckoutButton component that is loading', () => {        
        const { asFragment } = render(
                <CheckoutButton 
                    disabled={null} 
                    onClick={null} 
                    loading={true} 
                    className={null} 
                    errorMessage={null} 
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders CheckoutButton component that is disabled', () => {
        const { asFragment } = render(
                    <CheckoutButton 
                        disabled={true} 
                        onClick={null} 
                        loading={null} 
                        className={null} 
                        errorMessage={null} 
                    />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders CheckoutButton with a class name', () => {
        const checkoutClass = "test_class"
        const { asFragment } = render(
            <CheckoutButton 
                disabled={null} 
                onClick={null} 
                loading={null} 
                className={checkoutClass} 
                errorMessage={null}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});