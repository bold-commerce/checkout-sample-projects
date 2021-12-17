export const exampleBreakdown = {
  subTotal: 1919,
  shippingTotal: 210,
  taxesTotal: 1111,
  total: 3240,
  payments: [
    {
      id: 123,
      friendly_brand: 'visa',
      lineText: 'test card',
      value: 100
    }
  ]
}

export const exampleShippingLines = [
  { id: '0', description: 'Standard Shipping', amount: 2000 },
  { id: '1', description: 'Expedited Shipping', amount: 4000 },
];

export const exampleShippingState = {
  shippingLines: exampleShippingLines,
  selectedShippingAmount: exampleShippingLines[0].amount,
  selectedShippingDescription: exampleShippingLines[0].description,
  selectedShippingIndex: 0
}
