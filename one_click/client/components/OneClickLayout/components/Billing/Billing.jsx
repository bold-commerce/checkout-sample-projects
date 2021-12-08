import React, { useContext, useEffect, useState } from "react";
import { Price } from "@boldcommerce/stacks-ui/lib";
import { useCheckoutStore } from "@boldcommerce/checkout-react-components";
import classNames from "classnames";
import { ChevronRight } from "../Icons";
import { Header } from "../Header";
import { PaymentMethod } from "../Payment";
import { CheckoutButton } from "../CheckoutButton";
import { AppContext } from "../../context/AppContext";
import './Billing.css';

const Billing = ({show, onBack}, ref) => {
  const { websiteName } = useContext(AppContext);
  const { state } = useCheckoutStore();

  return (
    <div ref={ref} className={classNames('Sidebar Billing', show ? 'Sidebar--Show' : 'Sidebar--Hide')}>
      <Header title={websiteName} />
      
      <div className="IndexGuest-summary">
        <button
          className="IndexGuest-summary-btn"
          onClick={() => onSectionChange('summary')}
        >
          <ChevronRight className="IndexGuest-chevron"/>
          <h2 className="IndexGuest-title">Summary</h2>
          <Price amount={state.applicationState.order_total} />
        </button>
      </div>

      <div className="IndexGuest-payment">
        <h2 className="IndexGuest-title">Payment method</h2>
      </div>
      <PaymentMethod/>

      <div className="IndexGuest-footer">

        <CheckoutButton className="CheckoutButton" />
        <div className="IndexGuest-footer-login">
          <button className="link-btn" type="button" onClick={onBack}>Back to shipping</button>
        </div>          
        <div className="IndexGuest-rights">{`All right reserved ${websiteName}`}</div>
      </div>
    </div>
  )
}

const BillingForwardedRef = React.forwardRef(Billing);

export default BillingForwardedRef;