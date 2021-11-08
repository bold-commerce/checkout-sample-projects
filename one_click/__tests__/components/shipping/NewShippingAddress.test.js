import React from 'react';
import NewShippingAddress from '../../../client/components/OneClickLayout/components/Shipping/NewShippingAddress'
import { render } from '@testing-library/react';
import { 
    exampleAddress,
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

describe('NewShippingAddress', () => {
    test('renders NewShippingAddress component', () => {
        const { asFragment } = render(
                <NewShippingAddress
                    selected={null}
                    onChange={null}                    
                    disabled={null}
                    defaultAddress={null}
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders NewShippingAddress component with selected', () => {
        const { asFragment } = render(
                <NewShippingAddress
                    selected
                    onChange={null}
                    disabled={null}
                    defaultAddress={null}
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders NewShippingAddress component with default address', () => {
        const { asFragment } = render(
                <NewShippingAddress
                    selected={null}
                    onChange={null}
                    disabled={null}
                    defaultAddress={exampleAddress}
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders NewShippingAddress component', () => {
        const { asFragment } = render(
                <NewShippingAddress
                    selected={null}
                    onChange={null}
                    disabled
                    defaultAddress={exampleAddress}
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders NewShippingAddress component with onChange', () => {
        const { asFragment } = render(
                <NewShippingAddress
                    selected
                    onChange={() => {}}
                    disabled={null}
                    defaultAddress={exampleAddress}
                />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});