import React from "react";
import { render } from "@testing-library/react";
import { exampleAddress as MOCKaddress } from '../../../utils/addressHelpers';
import SavedAddress from "../../../../single_page/src/components/ShippingAddress/components/SavedAddress";

describe('SavedAddress', () => {
  test('renders SavedAddress component', () => {
    const { asFragment } = render(
      <SavedAddress addressInfo={MOCKaddress} /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
