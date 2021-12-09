import React, { useContext } from "react";
import classNames from "classnames";
import { Header } from "../Header";
import { SummaryCondensed } from "../Summary";
import { PaymentMethod } from "../Payment";
import { CheckoutButton } from "../CheckoutButton";
import { AppContext } from "../../context/AppContext";
import './Billing.css';

const Billing = ({section, onSectionChange}, ref) => {
  const { websiteName } = useContext(AppContext);

  return (
    <div ref={ref} className={classNames('Sidebar Billing', section === 'billing' ? 'Sidebar--Show' : (section === 'summaryB' ? 'IndexPage--Hide' : 'Sidebar--Hide'))}>
      <Header title={websiteName} />
      
      <SummaryCondensed onSectionChange={onSectionChange}/>

      <div className="Billing__Payment">
        <h2 className="IndexGuest__Title">Payment method</h2>
        <PaymentMethod/>
      </div>

      <div className="IndexGuest-__Footer">
        <CheckoutButton className="CheckoutButton Billing__Checkout__Btn" />
        <div className="IndexGuest__Footer--login">
          <button className="link-btn" type="button" onClick={() => onSectionChange('/')}>Back to shipping</button>
        </div>          
        <div className="IndexGuest__Rights">{`All right reserved ${websiteName}`}</div>
      </div>
    </div>
  )
}

const BillingForwardedRef = React.forwardRef(Billing);

export default BillingForwardedRef;