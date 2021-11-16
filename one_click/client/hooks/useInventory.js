import { useCallback } from "react";
import { useHistory } from 'react-router';


const useInventory = () => {
    const history = useHistory();

    const checkInventory = useCallback(async (lineItems) => {        
        const lineIds = lineItems.map((item) => {
          return item.product_data.product_id;
        })
        
        const response = await fetch(`/inventory?ids=${lineIds.join(',')}`);
        const inventory = await response.json();

        lineItems.map((item) => {
            const product = inventory.find(i => i.id === item.product_data.product_id);
            if (product.stock < item.product_data.quantity) {
                history.push('/inventory', inventory );
            }
        })
    });
  
    return checkInventory;
  };
  
  export default useInventory;