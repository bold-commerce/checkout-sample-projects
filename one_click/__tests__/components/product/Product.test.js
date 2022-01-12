import React from 'react';
import { render } from '@testing-library/react';
import Product from '../../../src/components/OneClickLayout/components/Product/Product';

describe('Product', () => {
    test('renders Product component', () => {
        const { asFragment } = render(
        <Product
            title="Product A"
            image="https://via.placeholder.com/150"
            quantity={2}
            lineItemKey="abcd"
            variants={["Test description goes here"]}
            totalPrice={19998}
        />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});