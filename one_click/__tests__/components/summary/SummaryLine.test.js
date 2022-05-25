import React from 'react';
import { render } from '@testing-library/react';
import SummaryLine from '../../../src/components/Summary/SummaryLine';
import SummaryItem from '../../../src/components/Summary/SummaryItem'

describe('SummaryLine', () => {
    test('renders SummaryLine component without items', () => {
        const { asFragment } = render(
            <SummaryLine
                title='test title'
                value={1111}                
            /> 
        )
        expect(asFragment()).toMatchSnapshot();
    })

    test('renders SummaryLine component with items', () => {
        const { asFragment } = render(
            <SummaryLine
                title='test title'
                value={1111}
                items={
                    <SummaryItem tite='test item' value={123} />
                }
            /> 
        )
        expect(asFragment()).toMatchSnapshot();
    })

    test('renders SummaryLine component with removable items', () => {
        const { asFragment } = render(
            <SummaryLine
                title='test title'
                value={1111}
                items={
                    <SummaryItem 
                        tite='test item'
                        value={123}
                        removeItem={() => {}}
                    />
                }
            /> 
        )
        expect(asFragment()).toMatchSnapshot();
    })
})