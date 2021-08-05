/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Price } from '@boldcommerce/stacks-ui';
import { useDiscount, useBreakdown } from '../../hooks';
import './QuickCheckoutBreakdown.css';
import { RedactedCreditCard } from '../redacted_credit_card';

const QuickCheckoutBreakdown = ({
  subTotal, shippingTotal, discountTotal, total, remainingBalance, taxesTotal, payments, hasPayments, taxesIncluded, taxes, discountApplied, discountCode, removeDiscount, totalItems, isMobile, shippingDescription,
}) => {
  const paymentMethods = payments.map((payment, index) => (
    <div
      className="Payment__Applied"
      key={
        index
      }
    >
      <div className="Payment__Remove">
        <RedactedCreditCard brand={payment.brand} lineText={payment.lineText} />
      </div>
      <Price amount={
        payment.value
      }
      />
    </div>
  ));

  const readOnly = (hasPayments) ?? false;


  return (
    <div className="Summary__Breakdown">
      <div className="SummaryBlock">
        <span className="Summary__Subtotal--Title">Subtotal</span>
        <div className="Summary__Subtotal">
          <div className="SummaryItem__Label">Items ({totalItems})</div>
          <div className="SummaryItem__Value">
            <Price amount={subTotal} />
          </div>
        </div>
        {
            discountApplied && (
              <div className="Discount__Applied">
                <div className="Discount__Remove">
                  <div className="circle-times-close-button"onClick={() => {removeDiscount(discountCode)}}>&#8855;&nbsp;</div>
                  <div>
                    {discountCode} 
                  </div>
                </div>
                <div className="Discount__Amount">
                    <Price amount={discountTotal*-1} />
                </div>
              </div>
            )
          }
        { taxesTotal ? (
            <>
                <span className="Summary__Taxes--Title">Taxes</span>
                { taxes.map( tax => (
                  <div className="Summary__Taxes" key={tax.name}>
                      <div className="SummaryItem__Label">{tax.name}</div>
                      <div className="SummaryItem__Value">
                          {
                            <Price amount={tax.value} />
                          }
                      </div>
                  </div>
                ))}
            </>
        ): null}
        
        { shippingTotal ? ( 
            <>
                <span className="Summary__Shipping--Title">Shipping</span>
                <div className="Summary__Shipping">
                    <div className="SummaryItem__Label">{shippingDescription}</div>
                    <div className="SummaryItem__Value">
                        <Price amount={shippingTotal} />
                    </div>
                </div>
            </>
        ): null}
        
      </div>
      <div className="SummaryBlock" style={{display: isMobile ? 'none' : 'block'}}>
        <div className="SummaryBlock Summary__Total">
            <div>
                <div className="Summay__Total--Title">Summary</div>
                <span className="SummaryItem__Label">{totalItems} item(s)</span>
            </div>
            <div className="SummaryItem__Value">
            <Price amount={total} />
            </div>
        </div>
      </div>
    </div>
  );
};

QuickCheckoutBreakdown.propTypes = {
  subTotal: PropTypes.number,
  shippingTotal: PropTypes.number,
  discountTotal: PropTypes.number,
  total: PropTypes.number,
  remainingBalance: PropTypes.number,
  taxesTotal: PropTypes.number,
  payments: PropTypes.array,
  hasPayments: PropTypes.bool,
  taxesIncluded: PropTypes.bool,
  taxes: PropTypes.array,
  discountApplied: PropTypes.bool,
  discountCode: PropTypes.string,
  removeDiscount: PropTypes.func,
  totalItems: PropTypes.number,
  isMobile: PropTypes.bool,
  shippingDescription: PropTypes.string,
};

const MemoizedQuickCheckoutBreakdown = React.memo(QuickCheckoutBreakdown);

const QuickCheckoutBreakdownContainer = ({ isMobile }) => {
  const {
    subTotal, shippingTotal, discountTotal, total, remainingBalance, taxesTotal, payments, hasPayments, taxesIncluded, taxes, totalItems, shippingDescription,
  } = useBreakdown();
  const { discountApplied, discountCode, removeDiscount } = useDiscount();

  return (
    <MemoizedQuickCheckoutBreakdown
      subTotal={subTotal}
      shippingTotal={shippingTotal}
      discountTotal={discountTotal}
      total={total}
      remainingBalance={remainingBalance}
      taxesTotal={taxesTotal}
      payments={payments}
      hasPayments={hasPayments}
      taxesIncluded={taxesIncluded}
      taxes={taxes}
      discountApplied={discountApplied}
      discountCode={discountCode}
      removeDiscount={removeDiscount}
      totalItems={totalItems}
      isMobile={isMobile}
      shippingDescription={shippingDescription}
    />
  );
};

QuickCheckoutBreakdownContainer.propTypes = {
  isMobile: PropTypes.bool,
};

export default QuickCheckoutBreakdownContainer;