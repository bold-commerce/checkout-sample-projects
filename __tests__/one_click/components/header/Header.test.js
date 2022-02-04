import React from "react";
import { render } from "@testing-library/react";
import { Header } from "../../../../one_click/src/components/Header";

describe('Header', () => {
  test('renders Header component', () => {
    const { asFragment } = render ( <Header title={'Test Store Name'}/> );

    expect(asFragment()).toMatchSnapshot();
  })
})
