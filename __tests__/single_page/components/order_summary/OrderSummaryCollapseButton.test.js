import React from "react";
import { render } from "@testing-library/react";
import OrderSummaryCollapseButton from '../../../../single_page/src/components/OrderSummary/components/OrderSummaryCollapseButton';
import {
  exampleUseBreakdown as MOCKbreakdown,
  exampleUseLineItems as MOCKlineItems,
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useLineItems: () => MOCKlineItems,
  useBreakdown: () => MOCKbreakdown
}))

describe('OrderSummaryCollapseButton', () => {
  test('renders OrderSummaryCollapseButton component', () => {
    const { asFragment } = render ( <OrderSummaryCollapseButton /> );

    expect(asFragment()).toMatchSnapshot();
  })
})