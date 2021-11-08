const testApplicationState = {
  customer: {
    platform_id: null, public_id: '123456789', first_name: '', last_name: '', email_address: 'john.doe@email.com', saved_addresses: [],
  },
  addresses: {
    shipping: {
      id: null, first_name: 'John', last_name: 'Doe', address_line_1: '123 Fake Street', address_line_2: '', country: 'Canada', city: 'Winnipeg', province: 'Manitoba', country_code: 'CA', province_code: 'MB', postal_code: 'R3T 1B8', business_name: 'Bold Innovation Group', phone_number: '2048784038',
    },
    billing: {
      id: null, first_name: 'John', last_name: 'Doe', address_line_1: '123 Fake Street', address_line_2: '', country: 'Canada', city: 'Winnipeg', province: 'Manitoba', country_code: 'CA', province_code: 'MB', postal_code: 'R3T 1B8', business_name: 'Bold Innovation Group', phone_number: '2048784038',
    },
  },
  line_items: [{
    product_data: {
      id: '66', title: 'Default Title', image_url: 'https://cdn11.bigcommerce.com/s-2d5ces7lbx/products/86/images/286/ablebrewingsystem4.1588871241.386.513.jpg?c=1', properties: [], description: '', quantity: 1, price: 22500, total_price: 22500, visible: 1, line_item_key: 'abc123', barcode: '', compare_at_price: 22500, weight: 1000, weight_unit: 'g', product_id: '86', variant_id: '66', requires_shipping: true, sku: 'ABS', taxable: true, tags: '', vendor: '',
    },
    taxes: [{ value: 1125, name: 'GST', is_included: false }, { value: 1575, name: 'PST', is_included: false }],
    fees: [],
    discounts: [],
  }],
  taxes: [{ value: 1125, name: 'GST', is_included: false }, { value: 1575, name: 'PST', is_included: false }],
  discounts: [],
  payments: [{
    value: 26200, amount: 262, lineText: '1111', tag: 'Credit', driver: 'spreedly', merchant_account: 'Test Gateway', gateway_id: 34966, step: 'preAuthed', token: '123456789', currency: 'CAD', id: '66', transaction_token: '123456789', brand: 'visa', is_customer: false, public_payment_method_id: null, key: 'PaymentByCreditCard:PaymentService;Final:91000', status: 'succeeded', transactions: [], is_eligible_for_app_fee: true, has_app_fee_been_collected: false, application_fee_charged: 0, application_fee_tier_id: 22, order_to_bold_exchange_rate: 1.28259, order_to_bold_currency_id: 1, tier_id: 0, order_payment_type_id: 1, additional_information: '', initial_recurring_charge: false, recurring_charge: false, bold_customer_id: 20946761, sequence_number: 1, successful_preauth: true, message: '', error_details: [], created_at: '2021-08-20 20:19:18.072971', single_use_token: '', is_3ds_enabled: false, client_secret: '', idempotent_key: '', first_four_digits: '', bin: '411111', expiry: '', gateway_transaction_no: '', avs_result: '', cvd_result: '', transaction_time: '201918', transaction_date: '20210820', reference_num: '', txn_time: '', authorization_code: '', extra_payment_data: [],
  }],
  order_total: 26200,
  order_meta_data: {
    cart_parameters: [], note_attributes: [], notes: '', tags: [],
  },
  shipping: {
    selected_shipping: { id: '0', description: 'Standard', amount: 1000 }, available_shipping_lines: [{ id: '0', description: 'Standard', amount: 1000 }, { id: '1', description: 'Expedited', amount: 1125 }], taxes: [], discounts: [],
  },
};

export default testApplicationState;
