import React from 'react';
import { render } from '@testing-library/react';
import { CheckoutButton } from '../../../../one_click/src/components/CheckoutButton'
import { 
    exampleUseCheckoutStore as MOCKcheckoutStore,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseLineItems as MOCKlineItems
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';
import { MemoryRouter } from "react-router-dom";

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () => MOCKcheckoutStore,
    usePaymentIframe: () => MOCKpaymentIframe,
    useLineItems: () => MOCKlineItems
}));

describe('CheckoutButton', () => {
    test('renders CheckoutButton component', () => {
        const { asFragment } = render(
            <CheckoutButton 
                disabled={null} 
                onClick={null} 
                loading={null} 
                className={null} 
                errorMessage={null} 
            />,
            {wrapper: MemoryRouter}
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
                />,
                {wrapper: MemoryRouter}
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
                />,
                {wrapper: MemoryRouter}
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
                    />,
                    {wrapper: MemoryRouter}
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
            />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
