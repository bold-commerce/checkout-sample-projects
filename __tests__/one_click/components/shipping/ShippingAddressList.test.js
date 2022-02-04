import React from 'react';
import ShippingAddressList from '../../../../one_click/src/components/Shipping/ShippingAddressList';
import { render } from '@testing-library/react';
import { exampleAddress, exampleSavedAddresses } from '../../../utils/addressHelpers';
import { 
    exampleUseShippingAddress as MOCKshippingAddress,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUseCountryInfo as MOCKcountryInfo,
} from '../../../utils/hookHelpers';
 import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useShippingAddress: () => MOCKshippingAddress,
    useShippingLines: () => MOCKshippingLines,
    useCountryInfo: () => MOCKcountryInfo,
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
