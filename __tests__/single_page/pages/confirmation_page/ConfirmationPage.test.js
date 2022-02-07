import React from 'react';
import { render } from "@testing-library/react";
import { ConfirmationPage } from "../../../../single_page/src/pages/ConfirmationPage";
import '../../../../single_page/src/i18n/config';
import {
  exampleUseCheckoutStore as MOCKcheckoutStore,
  exampleUseBreakdown as MOCKbreakdown,
  exampleUseLineItems as MOCKlineItems,
  exampleUseDiscount as MOCKdiscount,
} from "../../../utils/hookHelpers";
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useCheckoutStore: () => MOCKcheckoutStore,
  useBreakdown: () => MOCKbreakdown,
  useLineItems: () => MOCKlineItems,
  useDiscount: () => MOCKdiscount,
}));

describe('ConfirmationPage', () => {
  test('renders ConfirmationPage page', () => {
    const { asFragment } = render( <ConfirmationPage /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
