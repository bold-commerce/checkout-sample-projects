import React from "react";
import CheckoutForm from '../../../../one_click/src/components/CheckoutForm/CheckoutForm'
import ResizeObserver from "../../../../__mocks__/ResizeObserver";
import { render, waitFor } from '@testing-library/react';
import { exampleLineItems as MOCKexampleLineItems } from '../../../utils/lineItemHelpers';
import { testApplicationState as MOCKapplicationState } from '../../../utils/applicationStateHelper';
import { exampleShippingState as MOCKexampleShippingState } from '../../../utils/shippingLinesHelper';
import {
    exampleAddress as MOCKexampleAddress,
    countries as MOCKcountries,
    caProvinces as MOCKprovinces,
    exampleSavedAddresses as MOCKsavedAddresses
} from '../../../utils/addressHelpers';
import '../../../../one_click/src/i18n/config'

jest.mock('@boldcommerce/checkout-react-components', () => ({
    useCheckoutStore: () => ({
        state: {
            orderInfo: {
                billingSameAsShipping:true,
                orderStatus: ""
            },
            errors: { order: null },
            loadingStatus: { isLoading: false },
            applicationState: MOCKapplicationState,
            orderTotals: {
                taxesTotal: 1200,
                subTotal: 23000,
                total: 24200
            }
        }
    }),
    useLineItems: () => ({
        data: MOCKexampleLineItems
    }),
    useShippingLines: () => ({
        data: MOCKexampleShippingState
    }),
    useShippingAddress: () => ({
        data: MOCKexampleAddress,
        submitShippingAddress: (() => {})
    }),
    useCustomer: () => ({
        data: {
            platform_id: 123
        }
    }),
    useBillingAddress: () => ({
        data: MOCKexampleAddress
    }),
    usePaymentIframe: () => ({
        data: {
            url: 'test.url',
            loadingStatus: 'fulfilled',
            paymentIframeOnLoaded: (() => {})
        }
    }),
    useDiscount: () => ({
        data: {
            discountTotal: 1234,
            discountApplied: true,
            discountCode: '?'
        },
        applyDiscount: (() => {}),
        removeDiscount: (() => {})
    }),
    useBillingSameAsShipping: () => ({
        data: true,
        setBillingSameAsShipping: (() => {})
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
        data: MOCKsavedAddresses
    }),
    useLoadingStatus: () => ({
        shippingAddressLoadingStatus: 'complete',
        shippingLinesLoadingStatus: 'complete'
    })
})).mock('react', () => ({
    ...jest.requireActual('react'),
    useContext: () => ({
        websiteName: 'TestSite'
    }),
})).mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useLocation: () => ({
        pathname: '/' 
    }),
    useNavigate: () => ({
        navigate: (() => {})
    }),
    Routes: () => ({
        useRoutes: () => {
        <route 
        key='key'
        name='screen name'
        path='/'
        />
    }})
})).mock('../../../../one_click/src/hooks', () => ({
    ...jest.requireActual('../../../../one_click/src/hooks'),
    useInventory: () => ({
        checkInventory: (() => {})
    })
}));

describe('CheckoutForm', () => {
    test('renders CheckoutForm', async () => {
        // React.useState = jest.fn().mockReturnValue([false, (i) => {}])

        const { asFragment } = render(
            <CheckoutForm />
        );

        await waitFor(() => {
            expect(asFragment()).toMatchSnapshot();
        });
    });
});
