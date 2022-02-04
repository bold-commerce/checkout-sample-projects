import React from 'react';
import NewShippingAddress from '../../../../one_click/src/components/Shipping/NewShippingAddress'
import { render } from '@testing-library/react';
import { 
    exampleAddress,
    countries as MOCKcountries,
    caProvinces as MOCKprovinces,
    exampleAddress as MOCKexampleAddress
} from '../../../utils/addressHelpers';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useShippingAddress: () => ({
        data: MOCKexampleAddress,
        errors: [],
        sumbitShippingAddress: (() => {})
    }),
    useCountryInfo: () => ({
        data: {
            countries: MOCKcountries,
            provinceLabel: "province",
            provinces: MOCKprovinces,
            showPostalCode: true,
            showProvince: true
        }
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
