import React from "react";
import Card from '../../../client/components/OneClickLayout/components/Card'
import { render } from '@testing-library/react';
import { Router } from "express";
import { createMemoryHistory } from 'history'

describe('Card', () => {
    test('renders Card component', () => {
        const { asFragment } = render(
            <Card 
                title={null} 
                description={null} 
                component={null} 
                overview={null} 
                action={null} 
                children={null} 
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders Card component with child component', () => {
        const history = createMemoryHistory();
        // This <Card> component requires to be wrapped in <Router> because it contains <Link>
        const { asFragment } = render(
            <Router history={history}>
                <Card 
                    title={null} 
                    description={null} 
                    component="/shipping"
                    overview={null} 
                    action={null} 
                    children={null} 
                    />
            </Router>    
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders Card component with action', () => {
        const action = { label: "Action Label" };
        
        const { asFragment } = render(
            <Card 
                title={null} 
                description={null} 
                component={null} 
                overview={null} 
                action={action} 
                children={null}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
})