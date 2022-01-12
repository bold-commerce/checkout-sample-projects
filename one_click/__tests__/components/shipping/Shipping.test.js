import React from 'react';
import Shipping from '../../../src/components/OneClickLayout/components/Shipping/Shipping';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { exampleShippingState as MOCKexampleShippingState } from '../../utils/shippingLinesHelper';
import {
    countries as MOCKcountries,
    caProvinces as MOCKprovinces,
    exampleAddress as MOCKexampleAddress,
    exampleSavedAddresses as MOCKexampleSavedAddresses
 } from '../../utils/addressHelpers';

 jest.mock('@boldcommerce/checkout-react-components', () => ({
     ...jest.requireActual('@boldcommerce/checkout-react-components'),
     useLoadingStatus: () => ({
        customerLoadingStatus: "fulfilled",
        discountLoadingStatus: "fulfilled",
        isLeading: true,
        lineItemsLoadingStatus: "fulfilled",
        shippingAddressLoadingStatus: "fulfilled",
        shippingLinesLoadingStatus: "fulfilled"
    }),
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
    useSavedAddresses: () => ({
        data: MOCKexampleSavedAddresses
    }),
    useShippingAddress: () => ({
        data: MOCKexampleAddress,
        submitShippingAdderess: (() => {})
    })
})).mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => ({
        setShowCheckout: (() => {})
    })
}));

describe('Shipping', () => {
    test('renders Shipping component', () => {
        const { asFragment } = render(
            <Shipping />,
            {wrapper: MemoryRouter}
        );
        expect(asFragment()).toMatchSnapshot();
    });
});