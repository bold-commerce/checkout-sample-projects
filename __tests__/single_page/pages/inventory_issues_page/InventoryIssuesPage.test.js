import React from 'react';
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { InventoryIssuesPage } from "../../../../single_page/src/pages/InventoryIssuesPage";
import { exampleUseLineItems as MOCKlineItems } from "../../../utils/hookHelpers";
import '../../../../single_page/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
  ...jest.requireActual('@boldcommerce/checkout-react-components'),
  useLineItems: () => MOCKlineItems,
})).mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockImplementation(() => {
    return { state: [] }
  }),
  useNavigate: jest.fn().mockImplementation(() => {
    return { pathname: {}}
  })
}));

describe('InventoryIssuesPage', () => {
  test('renders InventoryIssuesPage page', () => {
    const { asFragment } = render(
      <InventoryIssuesPage/>,
      {wrapper: MemoryRouter}
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
