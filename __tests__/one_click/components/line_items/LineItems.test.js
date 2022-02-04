import React from 'react';
import { render } from '@testing-library/react';
import { LineItems } from '../../../../one_click/src/components/LineItems/LineItems'
import { exampleLineItems } from '../../../utils/lineItemHelpers';
import '../../../../one_click/src/i18n/config'

describe('LineItems', () => {
  test('renders LineItems component with editable quantity', () => {
    const { asFragment } = render(
      <LineItems
        readOnly={false}
        lineItems={exampleLineItems}
        updateLineItemQuantity={() => {}}
        removeLineItem={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders read only LineItems component', () => {
    const { asFragment } = render(
      <LineItems
        readOnly
        lineItems={exampleLineItems}
        updateLineItemQuantity={() => {}}
        removeLineItem={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
