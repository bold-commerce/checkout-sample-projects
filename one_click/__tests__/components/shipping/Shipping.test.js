import React from 'react';
import Shipping from '../../../client/components/OneClickLayout/components/Shipping/Shipping';
import { render } from '@testing-library/react';
import {
    countries as MOCKcountries, 
    exampleSavedAddresses as MOCKexampleSavedAddresses
 } from '../../utils/addressHelpers';
import { MemoryRouter } from 'react-router';

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
    useShippingAddress: () => ({
        countryInfo: MOCKcountries,
        savedAddresses: MOCKexampleSavedAddresses,
        shippingAddress: [],
        shippingaddressErrors: null,
        submitShippingaddress:(() => {})
    }),
    useShippingLines: () => ({
        selectedShippingLineIndex: 0,
        shippingLines: [],
        showShippingLines: true
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