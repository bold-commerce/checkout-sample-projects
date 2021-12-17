import React from "react";
import { render } from "@testing-library/react";
import LoadingState from '../../../client/components/LoadingState/LoadingState'

describe('LoadingState', () => {
  test('renders LoadingState component', () => {
    const { asFragment } = render ( <LoadingState />)
    
    expect(asFragment()).toMatchSnapshot();
  })
})
