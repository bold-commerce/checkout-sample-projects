import React from 'react';
import { render } from '@testing-library/react';
import SummaryItem from '../../../client/components/OneClickLayout/components/Summary/SummaryItem';

describe('SummaryItem', () => {
    test('renders SummaryItem component', () => {
        const { asFragment } = render (
            <SummaryItem
                title='test title'
                value={1991}
            />
        )

        expect(asFragment()).toMatchSnapshot();
    });

    test('renders SummaryItem component that is removable', () => {
        const { asFragment } = render(
            <SummaryItem
                title='test title two'
                value={2121}
                removeItem={() => {}}
            />
        )
        expect(asFragment()).toMatchSnapshot();
    });
});