import React, { useState, useContext } from "react";
import InventoryItem from "./InventoryItem";
import { useHistory, useLocation } from "react-router";
import { Button } from "@boldcommerce/stacks-ui"
import { Link } from "react-router-dom";
import { useLineItems } from "@boldcommerce/checkout-react-components";
import { useVariants } from "../../../../hooks";
import { AppContext } from '../../context/AppContext';
import { Header } from "../Header";
import './Inventory.css';

export const Inventory = ({}, ref) => {
    const { data: lineItems, updateLineItemQuantity, removeLineItem } = useLineItems();
    const [loading, setLoading] = useState(false);
    const { websiteName } = useContext(AppContext);
    const handleVariants = useVariants();
    const history = useHistory();
    const location = useLocation();
    const inventory = location.state;

    let invItems = lineItems.map((item) => {
        const product = inventory.find(i => i.id === item.product_data.product_id);
        item.product_data.stock = product.stock;
        item.product_data.inventory_issue = product.tracking !== 'none' && item.product_data.quantity > item.product_data.stock;
        if (item.product_data.inventory_issue) {
            return (
                <InventoryItem
                    key={item.product_data.line_item_key} 
                    title={item.product_data.product_title}
                    description={handleVariants(item.product_data.title)}
                    orderQty={item.product_data.quantity}
                    stockQty={item.product_data.stock}
                    image={item.product_data.image_url}
                    onRemove={() => removeLineItem(item.product_data.line_item_key) }
                />);
        }
    })

    async function handleUpdateQuantities() {
        setLoading(true);
        const results = [];

        for (let i = 0; i < lineItems.length; i++) {
            const item = lineItems[i];
            if ( item.product_data.inventory_issue ) {
                if ( item.product_data.stock > 0 ) {
                    results.push(updateLineItemQuantity(item.product_data.line_item_key, item.product_data.stock));
                } else {
                    results.push(removeLineItem(item.product_data.line_item_key));
                }
            }
        }

        await Promise.all(results);
        setLoading(false);
        history.push("/");
    }

    return (
        <div ref={ref} className="Inventory__Main">
            <Header title={websiteName} />
            <div className="Inventory__Message">
                <div className="Inventory__Title">
                    Inventory issues
                </div>                
                <div className="Inventory__Description">
                    Some Products became unavailable and your cart has been updated, We're sorry for the inconvenience.
                </div>
            </div>
            {invItems}
            <div className="Inventory__footer">
                <Link className="ReturnLink" to="/">Return to cart</Link>
                <Button
                    onClick={handleUpdateQuantities}
                    className="CheckoutButton"
                    disabled={loading}
                >
                    Continue with changes
                </Button>
            </div>
        </div>
    )
}

const InventoryForwardedRef = React.forwardRef(Inventory);

export default InventoryForwardedRef;