import React from 'react';
import { render } from '@testing-library/react';
import Product from '../../../client/components/OneClickLayout/components/Product/Product';

describe('Product', () => {
    test('renders Product component', () => {
        const { asFragment } = render(
        <Product
            title="Product A"
            image="https://via.placeholder.com/150"
            quantity={2}
            lineItemKey="abcd"
            description={["Test description goes here"]}
            onQuantityChange={() => {}}
            totalPrice={19998}
            onRemove= {() => {}}
        />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});