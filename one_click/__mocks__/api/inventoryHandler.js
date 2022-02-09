import {rest} from 'msw';

export const productInventoryHandler = [
  rest.get('https://test.com/inventory', (req, res, ctx) => {
    return res(ctx.json({
      '123': {
        product_id: '116',
        quantity: 10,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'product',
        sku: 'ABC-123',
      },
      '456': {
        product_id: '116',
        quantity: 10,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'product',
        sku: 'ABC-456'
      }
    }), ctx.status(200));
  }),
];

export const noTrackingInventoryHandler = [
  rest.get('https://test.com/inventory', (req, res, ctx) => {
    return res(ctx.json({
      '123': {
        product_id: '116',
        quantity: -10,
        allow_backorder: false,
        inventory_tracker: 'none',
        tracking_level: 'product',
        sku: 'ABC-123',
      },
      '456': {
        product_id: '116',
        quantity: -10,
        allow_backorder: false,
        inventory_tracker: 'none',
        tracking_level: 'product',
        sku: 'ABC-456'
      }
    }), ctx.status(200));
  }),
];

export const allowBackorderInventoryHandler = [
  rest.get('https://test.com/inventory', (req, res, ctx) => {
    return res(ctx.json({
      '123': {
        product_id: '116',
        quantity: 10,
        allow_backorder: true,
        inventory_tracker: 'platform',
        tracking_level: 'product',
        sku: 'ABC-123',
      },
      '456': {
        product_id: '116',
        quantity: 10,
        allow_backorder: true,
        inventory_tracker: 'platform',
        tracking_level: 'product',
        sku: 'ABC-456'
      }
    }), ctx.status(200));
  }),
];

export const variantInventoryHandler = [
  rest.get('https://test.com/inventory', (req, res, ctx) => {
    return res(ctx.json({
      '123': {
        product_id: '116',
        quantity: 10,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'variant',
        sku: 'ABC-123',
      },
      '456': {
        product_id: '116',
        quantity: 10,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'variant',
        sku: 'ABC-456'
      }
    }), ctx.status(200));
  }),
];

export const failedServerRequestInventoryHandler = [
  rest.get('https://test.com/inventory', (req, res, ctx) => {
    ctx.status(500);
  })
];
