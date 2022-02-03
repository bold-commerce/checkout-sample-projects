import React, { useContext } from "react";
import classNames from "classnames";
import { Header } from "../Header";
import { SummaryCondensed } from "../Summary";
import { PaymentMethod } from "../Payment";
import { CheckoutButton } from "../CheckoutButton";
import { AppContext } from "../../context/AppContext";
import './Billing.css';
import { useTranslation } from 'react-i18next';

const Billing = ({section, onSectionChange}, ref) => {
  const { websiteName } = useContext(AppContext);
  const { t } = useTranslation();

  return (
    <div ref={ref} className={classNames('Sidebar Billing', section === 'billing' ? 'Sidebar--Show' : (section === 'summaryB' ? 'IndexPage--Hide' : 'Sidebar--Hide'))}>
      <Header title={websiteName} />
      
      <SummaryCondensed onSectionChange={() => onSectionChange('summaryB')}/>

      <div className="Billing__Payment">
        <h2 className="IndexGuest__Title">{t('payment.method')}</h2>
        <PaymentMethod/>
      </div>

      <CheckoutButton className="CheckoutButton Billing__Checkout__Btn" />
      <div className="IndexGuest__Footer--login">
        <button className="link-btn" type="button" onClick={() => onSectionChange('/')}>{t('back_to_shipping')}</button>
      </div>          
        
    </div>
  )
}

const BillingForwardedRef = React.forwardRef(Billing);

export default BillingForwardedRef;