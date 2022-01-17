import { useCallback } from "react";


const useInventory = () => {
  const checkInventory = useCallback(async (lineItems) => {        
    let inventoryIssues = false;
    let productInventory = {};
    const variants = lineItems.map((lineItem) => lineItem.product_data.variant_id).join(',');
    const response = await fetch(`${process.env.INVENTORY_URL}?variants=${variants}`);
    let inventory = await response.json();

    lineItems.forEach((lineItem) => {
      const index = lineItem.product_data.variant_id;
      const product_id = inventory[index].product_id;

      if (!(inventory[index].allow_backorder || inventory[index].inventory_tracker === 'none')) {
        if (inventory[index].standard_tracking && inventory[index].quantity < lineItem.product_data.quantity) {
          inventoryIssues = true;
        } else if (!inventory[index].standard_tracking) {
          // If there are multiple variants of the same product that has inventory tracked at product level
          if (productInventory[product_id]) {
            // If the product id already exists, set the inventory amount to it.
            inventory[index].quantity = productInventory[inventory[index].product_id];
          } else {
            // If the product id does not exists, set the amount to the quantity.
            productInventory[product_id] = inventory[index].quantity;
          }

          productInventory[product_id] = inventory[index].quantity - lineItem.product_data.quantity;
          
          if (productInventory[product_id] < 0) {
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
