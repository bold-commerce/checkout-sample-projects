import React from "react";
import { render } from '@testing-library/react';
import { Address } from '../../../client/components/Address';
import {
  caProvinces as MOCKprovinces,
  countries as MOCKcountries,
  exampleAddress as MOCKaddress,
  exampleRequiredFields as MOCKrequiredFields
} from '../../utils/addressHelpers';

describe('Address', () => {
  test('renders Address component without data', () => {
    const { asFragment } = render(
      <Address
        countries={MOCKcountries}
        provinces={MOCKprovinces}
      />
    )
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Address component with data', () => {
    const { asFragment } = render(
      <Address
        address={MOCKaddress}
        countries={MOCKcountries}
        provinces={MOCKprovinces}
      />
    )
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Address component with required fields', () => {
    const { asFragment } = render(
      <Address
        address={MOCKaddress}
        countries={MOCKcountries}
        provinces={MOCKprovinces}
        requiredAddressFields={MOCKrequiredFields}
      />
    )
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders Address component with required fields missing', () => {
    const { asFragment } = render(
      <Address
        countries={MOCKcountries}
        provinces={MOCKprovinces}
        requiredAddressFields={MOCKrequiredFields}
      />
    )
    expect(asFragment()).toMatchSnapshot();
  });
});
