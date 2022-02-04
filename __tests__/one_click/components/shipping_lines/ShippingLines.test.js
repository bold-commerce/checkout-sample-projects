import React from 'react';
import { render } from '@testing-library/react';
import { ShippingLines } from '../../../../one_click/src/components/ShippingLines/ShippingLines';
import { exampleShippingLines } from '../../../utils/shippingLinesHelper';
import '../../../../one_click/src/i18n/config';

describe('ShippingLines', () => {
    test('renders ShippingLines component', () => {
        const { asFragment } = render(
            <ShippingLines
                showShippingLines
                shippingLinesFetching={false}
                shippingLinesLoadingStatus=""
                shippingLines={exampleShippingLines}
                selectedShippingLineIndex={0}
                setSelectedShippingLine={() => {}}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders ShippingLines component when shipping lines should be hidden', () => {
        const { asFragment } = render(
            <ShippingLines
                showShippingLines={false}
                shippingLinesFetching={false}
                shippingLinesLoadingStatus=""
                shippingLines={[]}
                selectedShippingLineIndex={0}
                setSelectedShippingLine={() => {}}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
    test('renders ShippingLines component while shipping lines are being set', () => {
        const { asFragment } = render(
            <ShippingLines
                showShippingLines
                shippingLinesFetching={false}
                shippingLinesLoadingStatus="setting"
                shippingLines={exampleShippingLines}
                selectedShippingLineIndex={0}
                setSelectedShippingLine={() => {}}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    test('renders ShippingLines component while shipping lines are fetching', () => {
        const { asFragment } = render(
            <ShippingLines
                showShippingLines
                shippingLinesFetching
                shippingLinesLoadingStatus=""
                shippingLines={exampleShippingLines}
                selectedShippingLineIndex={0}
                setSelectedShippingLine={() => {}}
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
