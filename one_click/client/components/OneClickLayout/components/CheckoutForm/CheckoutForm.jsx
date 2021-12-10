import React, { useEffect, useRef, useState }  from 'react';
import { Route, Switch } from "react-router-dom";
import { useLocation, useHistory } from 'react-router';
import { useCheckoutStore, useCustomer, useLineItems } from '@boldcommerce/checkout-react-components';
import { Summary } from '../Summary';
import { Shipping } from '../Shipping';
import { Billing } from '../Billing';
import { useInventory } from '../../../../hooks';
import { Inventory } from '../Inventory';
import { ProcessingOrder } from '../Processing';
import { Confirmation } from '../Confirmation';
import { CheckoutButton } from '../CheckoutButton';
import classNames from 'classnames';
import { IndexGuest, IndexPage } from '../Index';

const CheckoutForm = () => {
  const { data: lineItems } = useLineItems();
  const { state } = useCheckoutStore();
  const { data: customer } = useCustomer();
  const orderStatus = state.orderInfo.orderStatus;
  const location = useLocation();
  const checkInventory = useInventory();
  const history = useHistory();
  const [openSection, setOpenSection] = useState("/");
  const [height, setHeight] = useState(null);
  const mainEl = useRef(null);
  const summaryEl = useRef(null);
  const shippingEl = useRef(null);
  const billingEl = useRef(null);
  const processingEl = useRef(null);
  const confirmationEl = useRef(null);
  const inventoryEl = useRef(null);
  const checkoutButtonEl = useRef(null);

  const showCheckoutButton = openSection === 'summary' || (openSection === '/' && customer.platform_id);
  const renderSidebar = openSection === '/' || openSection.indexOf('/') === -1;

  const getInventory = async () => {
    const inventory = await checkInventory(lineItems);
    if (inventory) {
      history.push('/inventory', inventory)
    }
  }
  useEffect(() => {
    setOpenSection(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    if (orderStatus === 'processing') {
      history.push('/processing');
    } else if (orderStatus === 'completed') {
      history.push(`/confirmation?public_order_id=${state.publicOrderId}`);
    }
  }, [orderStatus]);

  useEffect(() => {
    let openEl = mainEl;
    switch(openSection){
      case "summary":
        openEl = summaryEl;
        break;
      case "shipping":
        openEl = shippingEl;
        break;
      case "billing":
        openEl = billingEl;
        break;
      case "/processing":
        openEl = processingEl;
        break;
      case "/confirmation":
        openEl = confirmationEl;
        break;
      case "/inventory":
        openEl = inventoryEl;
        break;
    }

    const resizeObserver = new ResizeObserver(() => {  
      if(showCheckoutButton){    
        setHeight(openEl.current?.clientHeight + checkoutButtonEl.current?.clientHeight);
      }
      else {
        setHeight(openEl.current?.clientHeight);
      }
    });
    resizeObserver.observe(openEl.current);
  
    return () => {
        resizeObserver.disconnect();
    }
  }, [openSection]);

  const style = window.innerWidth > 768 ? {
    height: height? `${height}px` : null,
    overflowY: height > window.innerHeight ? 'scroll' : 'hidden',
  } : {}

  return (
    <div className="Checkout__Form" style={style}>
      <Switch location={location}>
        <Route exact path="/processing" >
          <ProcessingOrder ref={processingEl} />
        </Route>
        <Route exact path="/confirmation">
          <Confirmation ref={confirmationEl}/>
        </Route>
        <Route exact path="/inventory">
          <Inventory ref={inventoryEl}/>
        </Route>
        <Route exact path="/">
        { customer.platform_id ?
          <IndexPage ref={mainEl} onSectionChange={setOpenSection} show={openSection==="/"}/> :
          <IndexGuest ref={mainEl} onSectionChange={setOpenSection} show={openSection==="/"}/>
        }
        </Route>
      </Switch>
      { renderSidebar ? 
        <>
          <Shipping ref={shippingEl} show={openSection==='shipping'} onBack={() => setOpenSection("/")} />
          <Summary ref={summaryEl} section={openSection}  onSectionChange={setOpenSection} />
          <Billing ref={billingEl} section={openSection} onSectionChange={setOpenSection}/>
        </>
        : null
      }
      <CheckoutButton ref={checkoutButtonEl} className={(classNames("CheckoutButton", "CheckoutButton__Desktop", showCheckoutButton ? "CheckoutButton__Show" : "CheckoutButton__Hide"))} />
    </div>
  )};


export default CheckoutForm;
