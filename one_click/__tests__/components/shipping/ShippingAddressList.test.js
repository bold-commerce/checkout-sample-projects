import React from 'react';
import ShippingAddressList from '../../../client/components/OneClickLayout/components/Shipping/ShippingAddressList';
import { render } from '@testing-library/react';
import {
    exampleAddress,
    exampleSavedAddresses,
    countries as MOCKcountries, 
    exampleSavedAddresses as MOCKexampleSavedAddresses
 } from '../../utils/addressHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useShippingAddress: () => ({
        countryInfo: MOCKcountries,
        savedAddresses: MOCKexampleSavedAddresses,
        shippingAddress: [],
        shippingaddressErrors: null,
        submitShippingaddress:(() => {})
    })
}));

describe('ShippingAddressList', () => {
    test('renders ShippingAddressList component with addresses', () => {
        const { asFragment } = render(
                <ShippingAddressList
                    addresses={exampleSavedAddresses}
                    onChange={null}
                    selectedAddress={exampleAddress}
                    disabled={null}
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders ShippingAddressList component with onChange', () => {
        const { asFragment } = render(
                <ShippingAddressList
                    addresses={exampleSavedAddresses}
                    onChange={() => {}}
                    selectedAddress={exampleAddress}
                    disabled={null}
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders ShippingAddressList component disabled', () => {
        const { asFragment } = render(
                <ShippingAddressList
                    addresses={exampleSavedAddresses}
                    onChange={null}
                    selectedAddress={exampleAddress}
                    disabled
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});