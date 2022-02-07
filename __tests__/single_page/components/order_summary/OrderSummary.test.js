import React from 'react';
import { render } from "@testing-library/react";
import { OrderSummary } from '../../../../single_page/src/components/OrderSummary';
import {
  exampleUseLineItems as MOCKlineItems,
  exampleUseDiscount as MOCKdiscount,
  exampleUseBreakdown as MOCKbreakdown
} from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  useLineItems: () => MOCKlineItems,
  useDiscount: () => MOCKdiscount,
  useBreakdown: () => MOCKbreakdown
}));

describe('OrderSummary', () => {
  test('renders OrderSummary component', () => {
    const { asFragment } = render( <OrderSummary /> );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders OrderSummary component with summary open', () => {
    const { asFragment } = render( <OrderSummary summaryOpen/> );

    expect(asFragment()).toMatchSnapshot();
  });
});
