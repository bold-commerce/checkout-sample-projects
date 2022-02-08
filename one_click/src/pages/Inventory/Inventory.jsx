import React, { useState, useContext } from "react";
import { InventoryItem } from "../../components/InventoryItem";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@boldcommerce/stacks-ui"
import { useLineItems } from "@boldcommerce/checkout-react-components";
import { useVariants } from "../../hooks";
import { AppContext } from '../../context/AppContext';
import { Header } from "../../components/Header";
import './Inventory.css';
import { useTranslation } from 'react-i18next';

export const Inventory = ({}, ref) => {
    const { data: lineItems, updateLineItemQuantity, removeLineItem } = useLineItems();
    const [loading, setLoading] = useState(false);
    const { websiteName } = useContext(AppContext);
    const handleVariants = useVariants();
    const navigate = useNavigate();
    const location = useLocation();
    const inventory = location.state;
    const { t } = useTranslation();

    let invItems = lineItems.map((item) => {
        const variantId = item.product_data.variant_id;
        item.product_data.stock = inventory[variantId].quantity;
        item.product_data.inventory_issue = inventory[variantId].inventory_tracker !== 'none' && item.product_data.quantity > item.product_data.stock;
        if (item.product_data.inventory_issue) {
            return (
                <InventoryItem
                    key={item.product_data.line_item_key} 
                    title={item.product_data.product_title}
                    variants={handleVariants(item.product_data.title)}
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
        navigate("/");
    }

    return (
        <div ref={ref} className="Inventory__Main">
            <Header title={websiteName} />
            <div className="Inventory__Message">
                <div className="Inventory__Title">
                    {t('inventory.issues')}
                </div>                
                <div className="Inventory__Description">
                    {t('inventory.issues_description')}
                </div>
            </div>
            {invItems}
            <div className="Inventory__footer">
                <Link to="/" className="ReturnLink" >{t('inventory.return_to_cart')}</Link>
                <Button
                    onClick={handleUpdateQuantities}
                    className="CheckoutButton"
                    disabled={loading}
                >
                    {t('inventory.continue')}
                </Button>
            </div>
        </div>
    )
}

const InventoryForwardedRef = React.forwardRef(Inventory);

export default InventoryForwardedRef;