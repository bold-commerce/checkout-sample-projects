import React from 'react';
import ShippingAddressItem from '../../../src/components/Shipping/ShippingAddressItem';
import { render } from '@testing-library/react';
import { exampleAddress } from '../../utils/addressHelpers';

describe('ShippingAddressItem', () => {
    test('renders ShippinAddressItem component', () => {
        const { asFragment } = render(
            <ShippingAddressItem
                address={exampleAddress}
                onChange={null}
                selectedAddress={null}
                disabled={false}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders ShippinAddressItem component with onChange', () => {
        const { asFragment } = render(
            <ShippingAddressItem
                address={exampleAddress}
                onChange={() => {}}
                selectedAddress={null}
                disabled={false}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders ShippinAddressItem component disabled', () => {
        const { asFragment } = render(
            <ShippingAddressItem
                address={exampleAddress}
                onChange={null}
                selectedAddress={null}
                disabled
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});