import React from "react";
import { render } from '@testing-library/react';
import { BillingAddress } from '../../../src/components/BillingAddress/BillingAddress';
import {
    exampleAddress as MOCKexampleAddress,
    countries as MOCKcountries,
    caProvinces as MOCKprovinces
} from '../../utils/addressHelpers';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCountryInfo: () => ({
        data: {
            countries: MOCKcountries,
            provinceLabel: "province",
            provinces: MOCKprovinces,
            showPostalCode: true,
            showProvince: true
        }
    })
}))

describe('BillingAddress', () => {
    test('render BillingAddress component with the same billing address', () => {
        const { asFragment } = render(
            <BillingAddress
                billingAddress={MOCKexampleAddress}
                billingSameAsShipping={false}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    })

    test('render BillingAddress component with differnt billing address', () => {
        const { asFragment } = render(
            <BillingAddress
                billingAddress={MOCKexampleAddress}
                billingSameAsShipping
            />
        );
        expect(asFragment()).toMatchSnapshot();
    })
})