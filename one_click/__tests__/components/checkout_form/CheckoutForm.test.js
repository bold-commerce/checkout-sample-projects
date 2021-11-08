import React from "react";
import CheckoutForm from '../../../client/components/OneClickLayout/components/CheckoutForm/CheckoutForm'
import { render } from '@testing-library/react';
import { Router } from "express";
import { createMemoryHistory } from 'history'
import { MemoryRouter } from "react-router";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router"),
    useLocation: () => ({
        hash: "",
        key: "testkey",
        pathname: "/",
        search: "",
        state: undefined
    })
}));

describe('CheckoutForm', () => {
    test('renders CheckoutForm', () => {        
        // const history = createMemoryHistory();
        // history.push("/");
        // <CheckoutForm> requires to be wrapped in <Router> because it contains useLocation
        const { asFragment } = render(
            <CheckoutForm />,
            {wrapper: MemoryRouter});
            // <Router history={history}>
                // <CheckoutForm />
            // </Router>
        //);
        expect(asFragment()).toMatchSnapshot();
    });
});