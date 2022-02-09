import { useErrors } from "@boldcommerce/checkout-react-components";
import { useCallback } from "react";

const useInventory = () => {
  const { setOrderError } = useErrors();

  const checkInventory = useCallback(async (lineItems) => {  
    let inventoryIssues = false;
    let productInventory = {};
    let inventory = {};
    
    try {
      const variants = lineItems.map((lineItem) => lineItem.product_data.variant_id).join(',');
      const response = await fetch(`${process.env.INVENTORY_URL}?variants=${variants}`);

      if(!response.success){
        setOrderError();
      } else {
        inventory = await response.json();

        lineItems.forEach((lineItem) => {
          const variantId = lineItem.product_data.variant_id;
          const inventoryItem = inventory[variantId];
          const productId = inventoryItem.product_id;

          if (!inventoryItem.allow_backorder && inventoryItem.inventory_tracker !== 'none') {
            if (inventoryItem.tracking_level !== 'product' && inventoryItem.quantity < lineItem.product_data.quantity) {
              inventoryIssues = true;
            } else if (inventoryItem.tracking_level === 'product') {
              if (productInventory[productId]) {
                inventoryItem.quantity = productInventory[productId] > 0 ? productInventory[productId] : 0;
              } else {
                productInventory[productId] = inventoryItem.quantity;
              }

              productInventory[productId] -= lineItem.product_data.quantity;

              if (productInventory[productId] < 0) {
                inventoryIssues = true;
              }
            }
          }
        });
      }
    } catch(e) {
      inventoryIssues = true;
      setOrderError();
    }
    
    return inventoryIssues ? inventory : null;
  });

  return checkInventory;
};
  
export default useInventory;
