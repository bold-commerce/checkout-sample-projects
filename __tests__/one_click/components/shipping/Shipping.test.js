import React from 'react';
import Shipping from '../../../../one_click/src/components/Shipping/Shipping';
import { render } from '@testing-library/react';
import {
    exampleUseShippingAddress as MOCKshippingAddress,
    exampleUseSavedAddresses as MOCKsavedAddresses,
    exampleUseLoadingStatus as MOCKloadingStatus,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUseCountryInfo as MOCKcountryInfo,
} from '../../../utils/hookHelpers';
 import '../../../../one_click/src/i18n/config';

 jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useLoadingStatus: () => MOCKloadingStatus,
    useShippingLines: () => MOCKshippingLines,
    useCountryInfo: () => MOCKcountryInfo,
    useSavedAddresses: () => MOCKsavedAddresses,
    useShippingAddress: () => MOCKshippingAddress
})).mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => ({
        setShowCheckout: (() => {})
    })
}));

describe('Shipping', () => {
    test('renders Shipping component', () => {
        const { asFragment } = render(
            <Shipping />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
