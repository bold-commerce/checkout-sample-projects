import { useCallback } from "react";


const useInventory = () => {
    const checkInventory = useCallback(async (lineItems) => {        
        const lineIds = lineItems.map((item) => {
          return item.product_data.product_id;
        })
        
        const response = await fetch(`${process.env.INVENTORY_URL}?ids=${lineIds.join(',')}`);
        const inventory = await response.json();
        let inventoryIssues = null;

        lineItems.forEach(item => {
                
            const product = inventory.find(i => i.id === item.product_data.product_id);
            if ( product.tracking !== 'none' && product.stock < item.product_data.quantity) {                
                inventoryIssues = inventory;        
            }
        });
        return inventoryIssues;
    });
  
    return checkInventory;
};
  
export default useInventory;
