import '@testing-library/jest-dom';
import { renderHook } from '@testing-library/react-hooks'
import { useInventory } from '../../src/hooks';
import {setupServer} from 'msw/node';
import { allowBackorderInventoryHandler, noTrackingInventoryHandler, productInventoryHandler, variantInventoryHandler } from '../../__mocks__/api/inventoryHandler';

process.env.INVENTORY_URL = 'https://test.com/inventory';
const server = setupServer(...productInventoryHandler);

describe('tests useInventory', () => {
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('validates product level inventory', async () => {
    const { result } = renderHook(() => useInventory());
    const lineItems = [
      {
        product_data: {
          variant_id: '123',
          quantity: 5,
        }
      },
      {
        product_data: {
          variant_id: '456',
          quantity: 5,
        }
      },
    ];

    const data = await result.current(lineItems);
  
    expect(data).toBeNull();
  });

  test('validates product level inventory with insufficient inventory', async () => {
    const { result } = renderHook(() => useInventory());
    const lineItems = [
      {
        product_data: {
          variant_id: '123',
          quantity: 6,
        }
      },
      {
        product_data: {
          variant_id: '456',
          quantity: 5,
        }
      },
    ];

    const expected = {
      '123': {
        product_id: '116',
        quantity: 10,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'product',
        sku: 'ABC-123'
      },
      '456': {
        product_id: '116',
        quantity: 4,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'product',
        sku: 'ABC-456'
      }
    };

    const data = await result.current(lineItems);
  
    expect(data).toEqual(expected);
  });

  test('validates order with no tracking', async () => {
    server.use(...noTrackingInventoryHandler);
    const { result } = renderHook(() => useInventory());
    const lineItems = [
      {
        product_data: {
          variant_id: '123',
          quantity: 10,
        }
      },
      {
        product_data: {
          variant_id: '456',
          quantity: 10,
        }
      },
    ];

    const data = await result.current(lineItems);
  
    expect(data).toBeNull();
  });

  test('validates order with backorder enabled', async () => {
    server.use(...allowBackorderInventoryHandler);
    const { result } = renderHook(() => useInventory());
    const lineItems = [
      {
        product_data: {
          variant_id: '123',
          quantity: 10,
        }
      },
      {
        product_data: {
          variant_id: '456',
          quantity: 10,
        }
      },
    ];

    const data = await result.current(lineItems);
  
    expect(data).toBeNull();
  });

  test('validates variant level inventory', async () => {
    server.use(...variantInventoryHandler);
    const { result } = renderHook(() => useInventory());
    const lineItems = [
      {
        product_data: {
          variant_id: '123',
          quantity: 5,
        }
      },
      {
        product_data: {
          variant_id: '456',
          quantity: 5,
        }
      },
    ];

    const data = await result.current(lineItems);
  
    expect(data).toBeNull();
  });

  test('validates variant level inventory', async () => {
    server.use(...variantInventoryHandler);
    const { result } = renderHook(() => useInventory());
    const lineItems = [
      {
        product_data: {
          variant_id: '123',
          quantity: 12,
        }
      },
      {
        product_data: {
          variant_id: '456',
          quantity: 12,
        }
      },
    ];

    const data = await result.current(lineItems);

    const expected = {
      '123': {
        product_id: '116',
        quantity: 10,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'variant',
        sku: 'ABC-123'
      },
      '456': {
        product_id: '116',
        quantity: 10,
        allow_backorder: false,
        inventory_tracker: 'platform',
        tracking_level: 'variant',
        sku: 'ABC-456'
      }
    };
  
    expect(data).toEqual(expected);
  });
});
