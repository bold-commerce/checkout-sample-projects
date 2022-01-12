import React from 'react';
import { render } from '@testing-library/react';
import LoadingState from '../../../src/components/LoadingState/LoadingState';
import RadioItem from '../../../src/components/RadioItem/RadioItem';

describe('RadioItem', () => {
    test('renders RadioItem component', () => {
        const { asFragment } = render(<RadioItem 
            name={null}
            id={null}
            checked={null}
            onChange={null}
            disabled={null}
            children={null}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders RadioItem component with data', () => {
        const { asFragment } = render(<RadioItem 
            name="testRadio"
            id="1"
            checked
            onChange={ () => {} }
            disabled={false}
            children={null}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders RadioItem component disabled', () => {
        const { asFragment } = render(<RadioItem 
            name={null}
            id={null}
            checked={null}
            onChange={null}
            disabled
            children={null}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders RadioItem component with children', () => {
        const { asFragment } = render(<RadioItem 
            name={null}
            checked={null}
            onChange={null}
            disabled={null}
            children={<LoadingState />}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    }); 
});