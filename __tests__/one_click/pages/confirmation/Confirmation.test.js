import React from 'react';
import { render } from '@testing-library/react';
import { AppContext } from '../../../../one_click/src/context/AppContext';
import { Confirmation } from '../../../../one_click/src/pages/Confirmation';
import { exampleUseCheckoutStore as MOCKcheckoutStore } from '../../../utils/hookHelpers';
import '../../../../one_click/src/i18n/config';

jest.mock('@boldcommerce/checkout-react-components', () => ({
    ...jest.requireActual('@boldcommerce/checkout-react-components'),
    useCheckoutStore: () => MOCKcheckoutStore

}));

describe('Confirmation', () => {
    test('renders Confirmation component', () => {
        const { asFragment } = render(
            <AppContext.Provider value={{ websiteName: "app.test" }}>
                <Confirmation />
            </AppContext.Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
