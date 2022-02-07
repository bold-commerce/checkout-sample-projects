import React from 'react';
import { render } from '@testing-library/react';
import { BillingAddress } from '../../../../one_click/src/components/BillingAddress/BillingAddress';
import { exampleAddress as MOCKexampleAddress } from '../../../utils/addressHelpers';
import { exampleUseCountryInfo as MOCKcountryInfo } from "../../../utils/hookHelpers";
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCountryInfo: () => MOCKcountryInfo
}))

describe('BillingAddress', () => {
    test('render BillingAddress component with the same billing address', () => {
        const { asFragment } = render(
            <BillingAddress
                billingAddress={MOCKexampleAddress}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('render BillingAddress component with different billing address', () => {
        const { asFragment } = render(
            <BillingAddress
                billingAddress={MOCKexampleAddress}
                billingSameAsShipping
            />
        );
        expect(asFragment()).toMatchSnapshot();
    })
})
