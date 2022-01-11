import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useLineItems } from '@boldcommerce/checkout-react-components';
import { CheckoutSection, LineItem } from '../../components';
import { useErrorLogging } from '../../hooks'; 
import './InventoryIssuesPage.css';
import { Button } from '@boldcommerce/stacks-ui';

const InventoryIssuesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logError = useErrorLogging();
  const { data: lineItems, updateLineItemQuantity, removeLineItem } = useLineItems();
  const inventoryIssues = location.state;
  const [loading, setLoading] = useState(false);

  // Only run this when the component mounts since we don't want the list of items to change as it adjusts quantities
  const updatedLineItems = useMemo(() => {
    const adjustedLineItems = []
    lineItems.map((lineItem) => {
      const index = lineItem.product_data.variant_id;
      let orderQuantity = lineItem.product_data.quantity;
      if (!(inventoryIssues[index].allow_backorder || inventoryIssues[index].inventory_tracker === 'none')) {
        const variantInventory = inventoryIssues[index].quantity;

        if (orderQuantity > variantInventory) {
          lineItem.product_data.quantity = variantInventory;
          lineItem.product_data.originalQuantity = orderQuantity;
          adjustedLineItems.push(lineItem)
        }
      }
    });

    return adjustedLineItems;
  }, []);

  const lineItemList = updatedLineItems.map((lineItem) => (
    <LineItem
      title={lineItem.product_data.title}
      image={lineItem.product_data.image_url}
      quantity={lineItem.product_data.quantity}
      originalQuantity={lineItem.product_data.originalQuantity}
      price={lineItem.product_data.price}
      totalPrice={lineItem.product_data.total_price}
      lineItemKey={lineItem.product_data.line_item_key}
      readOnly
      key={lineItem.product_data.line_item_key}
    />
  ));

  const handleChanges = useCallback(async () => {
    setLoading(true);
    try {
      let results = [];
      for (let i = 0; i < updatedLineItems.length; i++) {
        const item = updatedLineItems[i];
        if (item.product_data.quantity > 0) {
          results.push(updateLineItemQuantity(item.product_data.line_item_key, item.product_data.quantity));
        } else {
          results.push(removeLineItem(item.product_data.line_item_key));
        }
      }
  
      await Promise.all(results);
      setLoading(false);
      navigate('/');
    } catch(e) {
      setLoading(false);
      logError('inventory_issues', e);
    }
  }, [updatedLineItems]);

  return (
    <div className="Checkout__InventoryIssues" role="main">
      <CheckoutSection
        className="InventoryIssues__Section"
        title="Inventory issues"
      >
        <p>Some products became unavailable and your cart has been updated. We're sorry for the inconvenience.</p>
      </CheckoutSection>
      <div className="InventoryIssues__List">
        {lineItemList}
      </div>
      <Button
        type="button"
        className="Checkout__ConfirmButton"
        onClick={handleChanges}
        loading={loading}
        disabled={loading}
      >
        Continue with changes
      </Button>
    </div>
  );
};

export default InventoryIssuesPage;
