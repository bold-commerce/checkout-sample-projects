import { caProvinces, countries, exampleAddress, exampleSavedAddresses } from './addressHelpers';
import { testApplicationState } from './applicationStateHelper';
import { exampleShippingState } from './shippingLinesHelper';
import { exampleLineItems } from './lineItemHelpers';

export const exampleUseSavedAddresses = { data: exampleSavedAddresses }
export const exampleUseShippingLines = { data: exampleShippingState }
export const exampleUsePaymentMethod = { showPaymentMethod: true }
export const exampleUseBillingAddress = { data: exampleAddress }
export const exampleUseCustomer = { data: { platform_id: 123 }}
export const exampleUseLineItems = { data: exampleLineItems }

export const exampleUseLoadingStatus = {
  shippingAddressLoadingStatus: 'complete',
  shippingLinesLoadingStatus: 'complete'
}

export const exampleUseShippingAddress = {
  data: exampleAddress,
  submitShippingAddress: () => {}
}

export const exampleUseBillingSameAsShipping = {
  data: false,
  setBillingSameAsShipping: () => {}
}

export const exampleUseDiscount = {
  data: 'discount_code',
  removeDiscount: () => {},
  applyDiscount: () => {}
}

export const exampleUsePaymentIframe = {
  data: {
    url: 'test.url',
    loadingStatus: 'fulfilled',
    paymentIframeOnLoaded: () => {}
  }
}

export const exampleUseCountryInfo = {
  data: {
    countries: countries,
    provinceLabel: "province",
    provinces: caProvinces,
    showPostalCode: true,
    showProvince: true
  }
}

export const exampleUseCheckoutStore = {
  state: {
    orderInfo: {
        billingSameAsShipping:true,
        orderStatus: ""
    },
    errors: { order: null },
    loadingStatus: { isLoading: false },
    applicationState: testApplicationState,
    orderTotals: {
        taxesTotal: 1200,
        subTotal: 23000,
        total: 24200
    }
  }
}
