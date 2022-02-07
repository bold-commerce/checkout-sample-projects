import React from 'react';
import { render } from "@testing-library/react";
import { ShippingLineList } from "../../../../single_page/src/components/ShippingLines/components";
import { exampleShippingLines as MOCKshippingLines } from '../../../utils/shippingLinesHelper';
import '../../../../single_page/src/i18n/config';

describe('ShippingLineList', () => {
  test('renders ShippingLineList component', () => {
    const { asFragment } = render(
      <ShippingLineList
        shippingLines={MOCKshippingLines}
        selectedShippingLine={0}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders ShippingLineList component disabled', () => {
    const { asFragment } = render(
      <ShippingLineList
        shippingLines={MOCKshippingLines}
        selectedShippingLine={0}
        disabled
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
