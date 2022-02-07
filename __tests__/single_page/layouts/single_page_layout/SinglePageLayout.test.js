import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SinglePageLayout } from '../../../../single_page/src/layouts/SinglePageLayout';
import {
  exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
  exampleUseShippingAddress as MOCKshippingAddress,
  exampleUseBillingAddress as MOCKbillingAddress,
  exampleUseSavedAddresses as MOCKsavedAddresses,
  exampleUseLoadingStatus as MOCKloadingStatus,
  exampleUseCheckoutStore as MOCKcheckoutStore,
  exampleUsePaymentIframe as MOCKpaymentIframe,
  exampleUseShippingLines as MOCKshippingLines,
  exampleUseCountryInfo as MOCKcountryInfo,
  exampleUseLineItems as MOCKlineItems,
  exampleUseBreakdown as MOCKbreakdown,
  exampleUseCustomer as MOCKcustomers,
  exampleUseDiscount as MOCKdiscount,
  exampleUseErrors as MOCKerrors,
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
  useShippingAddress: () => MOCKshippingAddress,
  useBillingAddress: () => MOCKbillingAddress,
  useSavedAddresses: () => MOCKsavedAddresses,
  useCheckoutStore: () => MOCKcheckoutStore,
  useLoadingStatus: () => MOCKloadingStatus,
  useShippingLines: () => MOCKshippingLines,
  usePaymentIframe: () => MOCKpaymentIframe,
  useCountryInfo: () => MOCKcountryInfo,
  useLineItems: () => MOCKlineItems,
  useBreakdown: () => MOCKbreakdown,
  useCustomer: () => MOCKcustomers,
  useDiscount: () => MOCKdiscount,
  useErrors: () => MOCKerrors,
}));

describe('SinglePageLayout', () => {
  test('renders SinglePageLayout layout', () => {
    const { asFragment } = render(
      <SinglePageLayout />,
      {wrapper: MemoryRouter}      
    );

    expect(asFragment()).toMatchSnapshot();
  });
});