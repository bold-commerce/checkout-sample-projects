export const exampleLineItems = [
    {
        discounts: [],
        fees: [],
        product_data: {
            id: "1",
            product_title: "Test title",
            title: "Size Large / Colour Blue",
            image_url: "",
            properties: [],
            description: "",
            quantity: 1,
            price: 1400,
            total_price: 1400,
            visible: 1,
            barcode: "",
            line_item_key: "test1key",
            compare_at_price: 4900,
            weight: 1000,
            weight_unit: "g",
            variant_id: "1",
            product_id: "2",
            requires_shipping: true,
            sku: "test-1",
            taxable: true,
            tags: "",
            vendor: ""
        },
        taxes: []
    },{
        discounts: [],
        fees: [],
        product_data: {
            id: "2",
            product_title: "Test title 2, Revenge of the title",
            title: "Number Two",
            image_url: "",
            properties: [],
            description: "",
            quantity: 2,
            price: 1600,
            total_price: 3200,
            visible: 1,
            barcode: "",
            line_item_key: "test2key",
            compare_at_price: 4100,
            weight: 1000,
            weight_unit: "g",
            variant_id: "3",
            product_id: "4",
            requires_shipping: true,
            sku: "test-2",
            taxable: true,
            tags: "",
            vendor: ""
        },
        taxes: []
    },{
        discounts: [],
        fees: [],
        product_data: {
            id: "3",
            product_title: "Test title 3, the search for more money",
            title: "Default Title",
            image_url: "",
            properties: [],
            description: "",
            quantity: 3,
            price: 1230,
            total_price: 12300,
            visible: 1,
            barcode: "",
            line_item_key: "test3key",
            compare_at_price: 9001,
            weight: 1000,
            weight_unit: "g",
            variant_id: "5",
            product_id: "6",
            requires_shipping: false,
            sku: "test-3",
            taxable: true,
            tags: "",
            vendor: ""
        },
        taxes: []
    }
]

export const exampleLineItem = exampleLineItems[0];

export const exampleInventory = {
    1: {
        platform_id: 2,
        quantity: 1,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'none',
        sku: 'skusku'
    },
    3: {
        platform_id: 4,
        quantity: 1,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'none',
        sku: 'skutwo'
    },
    5: {
        platform_id: 6,
        quantity: 0,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'none',
        sku: 'skudew'
    }    
}