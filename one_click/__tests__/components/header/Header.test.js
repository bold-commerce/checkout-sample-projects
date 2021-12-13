import React from "react";
import { render } from "@testing-library/react";
import { Header } from "../../../client/components/OneClickLayout/components/Header";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    setShowCheckout: () => {} 
  })
}));

describe('Header', () => {
  test('renders Header component', () => {
    const { asFragment } = render ( <Header title={'Test Store Name'}/> );

    expect(asFragment()).toMatchSnapshot();
  })
})