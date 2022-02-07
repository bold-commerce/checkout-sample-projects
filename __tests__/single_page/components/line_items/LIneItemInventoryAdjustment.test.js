import React from "react";
import { render } from "@testing-library/react";
import LineItemInventoryAdjustment from '../../../../single_page/src/components/LineItems/components/LineItemInventoryAdjustment';
import {
  exampleUseBillingSameAsShipping as MOCKbillingSameAsShipping,
  exampleUseBillingAddress as MOCKbillingAddress,
  exampleUsePaymentIframe as MOCKpaymentIframe,
  exampleUseCheckoutStore as MOCKcheckoutStore,
  exampleUseCountryInfo as MOCKcountryInfo,
  exampleUseLineItems as MOCKlineItems
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useBillingSameAsShipping: () => MOCKbillingSameAsShipping,
  useBillingAddress: () => MOCKbillingAddress,
  usePaymentIframe : () => MOCKpaymentIframe,
  useCheckoutStore: () => MOCKcheckoutStore,
  useCountryInfo: () => MOCKcountryInfo,
  useLineItems: () => MOCKlineItems
}))

describe('LineItemInventoryAdjustment', () => {
  test('renders LineItemInventoryAdjustment component', () => {
    const { asFragment } = render(
      <LineItemInventoryAdjustment
        originalQuantity={2}
        quantity={1}
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })

  test('renders LineItemInventoryAdjustment component sold out', () => {
    const { asFragment } = render(
      <LineItemInventoryAdjustment
        originalQuantity={2}
        quantity={0}
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })
  test('renders LineItemInventoryAdjustment component that is read only', () => {
    const { asFragment } = render(
      <LineItemInventoryAdjustment
        originalQuantity={2}
        quantity={1}
        readOnly
      />
    )

    expect(asFragment()).toMatchSnapshot();
  })
})
