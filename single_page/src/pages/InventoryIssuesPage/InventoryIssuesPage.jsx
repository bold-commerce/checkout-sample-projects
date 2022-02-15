import React, { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useLineItems } from '@boldcommerce/checkout-react-components';
import { CheckoutSection, Header, InventoryItem, OrderSummary } from '../../components';
import { useErrorLogging, useVariants } from '../../hooks'; 
import './InventoryIssuesPage.css';
import { Button } from '@boldcommerce/stacks-ui';
import { useTranslation } from 'react-i18next';

const InventoryIssuesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logError = useErrorLogging();
  const { data: lineItems, updateLineItemQuantity, removeLineItem } = useLineItems();
  const inventory = location.state;
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const handleVariants = useVariants();

  const lineItemList = lineItems.map((item) => {
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
  });

  const handleChanges = useCallback(async () => {
    setLoading(true);
    try {
      let results = [];
  
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
      navigate('/');
    } catch(e) {
      setLoading(false);
      logError('inventory_issues', e);
    }
  }, [lineItems]);

  return (
    <div className="Checkout__Layout Checkout__InventoryIssues" role="main">
      <Header />
      <OrderSummary readOnly/>
      <CheckoutSection
        className="InventoryIssues__Section"
        title={t('inventory.issues')}
      >
        <p>{t('inventory.issues_description')}</p>
      </CheckoutSection>
      <div className="InventoryIssues__List">
        <div className="InventoryIssues__List__Header">
          <h3>{t('inventory.product_name')}</h3>
          <h3>{t('inventory.quantity')}</h3>
        </div>
        {lineItemList}
      </div>
      <div className="Checkout__Navigation">
        <Button
          type="button"
          className="Checkout__ConfirmButton"
          onClick={handleChanges}
          loading={loading}
          disabled={loading}
        >
          {t('inventory.continue')}
        </Button>
        <a className="Checkout__ReturnLink" href={process.env.CART_URL}>{t('return_to_cart')}</a>
      </div>
      <div className="Checkout__Footer">
        <p className="Checkout__Rights">{`All rights reserved ${t('website_name')}`}</p>
      </div>
      
    </div>
  );
};

export default InventoryIssuesPage;
