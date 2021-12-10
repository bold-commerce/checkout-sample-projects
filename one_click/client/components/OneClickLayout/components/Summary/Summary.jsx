import React from 'react';
import { useShippingLines, useDiscount, useCheckoutStore } from '@boldcommerce/checkout-react-components';
import { Price } from '@boldcommerce/stacks-ui';
import SummaryLine from './SummaryLine';
import SummaryItem from './SummaryItem';
import { BackButton } from '../BackButton';
import { Header } from '../Header';
import classNames from 'classnames';
import { CheckoutButton } from '../CheckoutButton';
import { useAnalytics, useErrorLogging } from '../../../../hooks';
import './Summary.scss';

const Summary = ({ section, onSectionChange }, ref) => {
  const { data: shipping } = useShippingLines();
  const { data: discount, removeDiscount } = useDiscount();
  const { state } = useCheckoutStore();
  const orderTotals =  state.orderTotals;
  const taxes = state.applicationState.taxes;
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const show = section === 'summary' || section === 'summaryB'
  const backLocation = section === 'summaryB' ? 'billing' : '/';

  const handleRemoveDiscount = async () => {
    try {
      await removeDiscount();
      trackEvent('remove_discount_code');
    } catch(e) {
      logError('discount_code', e);
    }
  };

  let shippingItems = null;
  let discountItems = null;
  let taxItems = null;
  
  if ( shipping.selectedShippingDescription && shipping.selectedShippingAmount){
  shippingItems = <SummaryItem
                    title={shipping.selectedShippingDescription}
                    value={shipping.selectedShippingAmount}
                  />;
  }

  if (discount.discountApplied) {
    discountItems = <SummaryItem 
                      title={discount.discountCode}
                      value={(discount.discountTotal * -1)}
                      removeItem={handleRemoveDiscount}
                    />;
  }

  if (taxes.length > 0) {
    taxItems = taxes.map( (taxline) => {
      return(                
        <SummaryItem
          key={taxline.name}
          title={taxline.name}
          value={taxline.value}
        />
      );
    });
  }

  return(
    <div ref={ref} className={classNames('Sidebar Summary', show ? 'Sidebar--Show' : 'Sidebar--Hide')}>
      <Header title={"Summary"} />
      <BackButton onClick={() => onSectionChange(backLocation)} />
      <section className="Summary__OrderSummary">
        <div className="Summary__Lines SummaryBlock" data-allow-multiple id="accordianGroup">
          <SummaryLine
            title="Subtotal"
            value={orderTotals.subTotal}
          />
          <SummaryLine
            title="Shipping"
            value={shipping.selectedShippingAmount}
            items={shippingItems}
          />
          <SummaryLine
            title="Discount"
            value={( discount.discountApplied ? discount.discountTotal * -1 : undefined )}
            items={discountItems}
          />
          <SummaryLine
            title="Taxes"
            value={( orderTotals.taxesTotal !== 0 ? orderTotals.taxesTotal : undefined )}
            items={taxItems}
          />
        </div>                
        <div className="Summary__Total SummaryBlock">
          <div>Total</div>
          <Price className="summary-total-price" amount={orderTotals.total} />
        </div>
      </section>
      <CheckoutButton className="CheckoutButton CheckoutButton__Mobile" />
    </div>
  );
};

const SummaryForwardedRef = React.forwardRef(Summary);

export default SummaryForwardedRef;