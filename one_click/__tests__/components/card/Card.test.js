import React from "react";
import Card from '../../../client/components/OneClickLayout/components/Card'
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router";

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
        const { asFragment } = render(
            <Card 
                title={null} 
                description={null} 
                component="/shipping"
                overview={null} 
                action={null} 
                children={null} 
            />,
            {wrapper: MemoryRouter}
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