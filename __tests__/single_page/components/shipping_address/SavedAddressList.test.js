import React from "react";
import { render } from "@testing-library/react";
import { SavedAddressList } from '../../../../single_page/src/components/ShippingAddress';
import { exampleSavedAddresses as MOCKaddresses } from '../../../utils/addressHelpers';
import '../../../../single_page/src/i18n/config';

describe('ShippingAddress', () => {
  test('renders ShippingAddress component', () => {
    const { asFragment } = render(
      <SavedAddressList 
        savedAddresses={MOCKaddresses}
      /> );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders ShippingAddress component with selected address', () => {
    const { asFragment } = render(
      <SavedAddressList 
        savedAddresses={MOCKaddresses}
        selectedAddress={2}
      /> );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders ShippingAddress component disabled', () => {
    const { asFragment } = render(
      <SavedAddressList 
        savedAddresses={MOCKaddresses}
        disabled
      /> );

    expect(asFragment()).toMatchSnapshot();
  });
});
