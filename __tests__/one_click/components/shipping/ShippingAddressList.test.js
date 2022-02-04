import React from 'react';
import ShippingAddressList from '../../../../one_click/src/components/Shipping/ShippingAddressList';
import { render } from '@testing-library/react';
import { exampleShippingState as MOCKexampleShippingState } from '../../../utils/shippingLinesHelper';
import {
    exampleAddress,
    exampleSavedAddresses,
    countries as MOCKcountries,
    caProvinces as MOCKprovinces,
    exampleAddress as MOCKexampleAddress
 } from '../../../utils/addressHelpers';
 import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useShippingLines: () => ({
        data: MOCKexampleShippingState,
        loadindStatus: 'fulfilled',
        errors: [],
        updateShippingLines: (() => {})
    }),
    useCountryInfo: () => ({
        data: {
            countries: MOCKcountries,
            provinceLabel: "province",
            provinces: MOCKprovinces,
            showPostalCode: true,
            showProvince: true
        }
    }),
    useShippingAddress: () => ({
        data: MOCKexampleAddress,
        errors: [],
        submitShippingAdderess: (() => {})
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
