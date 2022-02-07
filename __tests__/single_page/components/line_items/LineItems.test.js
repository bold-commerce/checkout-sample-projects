import React from 'react';
import { render } from "@testing-library/react";
import { LineItems } from '../../../../single_page/src/components/LineItems';
import { exampleUseLineItems as MOCKlineItems } from '../../../utils/hookHelpers';
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useLineItems: () => MOCKlineItems
}));

describe('LineItems', () => {
  test('renders LineItems component',  () => {
    const { asFragment } = render ( <LineItems /> );    

    expect(asFragment()).toMatchSnapshot();
  });
});
