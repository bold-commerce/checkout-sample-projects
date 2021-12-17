import React from "react";
import { render } from "@testing-library/react";
import EmptyState from "../../../client/components/EmptyState/EmptyState";

describe('EmptyState', () => {
  test('renders EmptyState component', () => {
    const { asFragment } = render( <EmptyState title="Test Title" /> )

    expect(asFragment()).toMatchSnapshot();
  })
})
