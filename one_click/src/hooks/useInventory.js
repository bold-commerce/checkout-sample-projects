import { useCallback } from "react";


const useInventory = () => {
  const checkInventory = useCallback(async (lineItems) => {        
    let inventoryIssues = false;
    let productInventory = {};
    const variants = lineItems.map((lineItem) => lineItem.product_data.variant_id).join(',');
    const response = await fetch(`${process.env.INVENTORY_URL}?variants=${variants}`);
    let inventory = await response.json();

    lineItems.forEach((lineItem) => {
      const variantId = lineItem.product_data.variant_id;
      const productId = inventory[variantId].product_id;

      if (!(inventory[variantId].allow_backorder || inventory[variantId].inventory_tracker === 'none')) {
        if (inventory[variantId].standard_tracking && inventory[variantId].quantity < lineItem.product_data.quantity) {
          inventoryIssues = true;
        } else if (!inventory[variantId].standard_tracking) {
          // If there are multiple variants of the same product that has inventory tracked at product level
          if (productInventory[productId]) {
            // If the product id already exists, set the inventory amount to it.
            inventory[variantId].quantity = productInventory[inventory[variantId].product_id];
          } else {
            // If the product id does not exists, set the amount to the quantity.
            productInventory[productId] = inventory[variantId].quantity;
          }

          productInventory[productId] = inventory[variantId].quantity - lineItem.product_data.quantity;
          
          if (productInventory[productId] < 0) {
            inventoryIssues = true;        
          }
        }
      }
    });
    
    return inventoryIssues ? inventory : null;
  });

  return checkInventory;
};
  
export default useInventory;
