import React from 'react';
import { render } from '@testing-library/react';
import { Summary } from '../../../../one_click/src/components/Summary'
import {
    exampleUseCheckoutStore as MOCKcheckoutStore,
    exampleUseShippingLines as MOCKshippingLines,
    exampleUsePaymentIframe as MOCKpaymentIframe,
    exampleUseLineItems as MOCKlineItems,
    exampleUseDiscount as MOCKdiscount,
} from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () => MOCKcheckoutStore,
    useShippingLines: () => MOCKshippingLines,
    usePaymentIframe: () => MOCKpaymentIframe,
    useLineItems: () => MOCKlineItems,
    useDiscount: () => MOCKdiscount,
})).mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => ({ pathname: '/' })
}));

describe('Summary', () => {
    test('renders Summary component', () => {
        const { asFragment } = render( <Summary /> );

        expect(asFragment()).toMatchSnapshot();
    });
});
