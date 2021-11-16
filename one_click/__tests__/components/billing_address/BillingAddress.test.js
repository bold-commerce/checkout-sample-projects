import React from "react";
import { render } from '@testing-library/react';
import { BillingAddress } from '../../../client/components/OneClickLayout/components/BillingAddress/BillingAddress';
import { exampleAddress as MOCKexampleAddress } from '../../utils/addressHelpers';

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