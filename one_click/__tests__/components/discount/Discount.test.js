import React from "react";
import { render, fireEvent } from '@testing-library/react';
import { Discount } from '../../../src/components/OneClickLayout/components/Discount/Discount';

describe('Discount', () => {
    test('renders Discount component closed', () => {
        const { asFragment } = render(<Discount />);
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders Discount component opened', () => {
        
        const { container, asFragment } = render(
            <Discount
                discountCode="ExampleDiscount"
            /> );
        fireEvent.click(container.firstChild)
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders Discount component opened', () => {
        const discountError = { discounts: "Invalid example discount" };
        const { container, asFragment } = render(
            <Discount
                discountCode="ExampleDiscount"
                discountErrors={discountError}
            /> );
        fireEvent.click(container.firstChild)
        expect(asFragment()).toMatchSnapshot();
    });
});