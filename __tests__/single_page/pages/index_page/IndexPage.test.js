import React from 'react';
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { IndexPage } from "../../../../single_page/src/pages/IndexPage";
import {
  exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
  exampleUseShippingAddress as MOCKshippingAddress,
  exampleUseSavedAddresses as MOCKsavedAddresses,
  exampleUseBillingAddress as MOCKbillingAddress,
  exampleUseCheckoutStore as MOCKcheckoutStore,
  exampleUseLoadingStatus as MOCKloadingStatus,
  exampleUseShippingLines as MOCKshippingLines,
  exampleUsePaymentIframe as MOCKpaymentIframe,
  exampleUseCountryInfo as MOCKcountryInfo,
  exampleUseLineItems as MOCKlineItems,
  exampleUseBreakdown as MOCKbreakdown,
  exampleUseCustomer as MOCKcustomer,
  exampleUseDiscount as MOCKdiscount,
  exampleUseErrors as MOCKerrors,
} from "../../../utils/hookHelpers";
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
  useShippingAddress: () => MOCKshippingAddress,
  useSavedAddresses: () => MOCKsavedAddresses,
  useBillingAddress: () => MOCKbillingAddress,
  useLoadingStatus: () => MOCKloadingStatus,
  useShippingLines: () => MOCKshippingLines,
  useCheckoutStore: () => MOCKcheckoutStore,
  usePaymentIframe: () => MOCKpaymentIframe,
  useCountryInfo: () => MOCKcountryInfo,
  useLineItems: () => MOCKlineItems,
  useBreakdown: () => MOCKbreakdown,
  useCustomer: () => MOCKcustomer,
  useDiscount: () => MOCKdiscount,
  useErrors: () => MOCKerrors,

}))

describe('IndexPage', () => {
  test('renders IndexPage Page', () => {
    const { asFragment } = render(
      <IndexPage/>,
      {wrapper: MemoryRouter}
    );

    expect(asFragment()).toMatchSnapshot();
  })
})