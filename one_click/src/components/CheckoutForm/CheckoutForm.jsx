import React, { useEffect, useRef, useState }  from 'react';
import { Route, Routes } from "react-router-dom";
import { useLocation, useNavigate } from 'react-router';
import { useCheckoutStore, useCustomer, useLineItems } from '@boldcommerce/checkout-react-components';
import { Summary } from '../Summary';
import { Shipping } from '../Shipping';
import { Billing } from '../Billing';
import { useErrorLogging, useInventory } from '../../hooks';
import { Inventory } from '../../pages/Inventory';
import { ProcessingOrder } from '../../pages/Processing';
import { Confirmation } from '../../pages/Confirmation';
import { CheckoutButton } from '../CheckoutButton';
import classNames from 'classnames';
import { LoadingState } from '../LoadingState';
import { IndexPageGuest, IndexPage } from '../../pages/IndexPage';

const CheckoutForm = () => {
  const { data: lineItems } = useLineItems();
  const { state } = useCheckoutStore();
  const { data: customer } = useCustomer();
  const orderStatus = state.orderInfo.orderStatus;
  const location = useLocation();
  const checkInventory = useInventory();
  const logError = useErrorLogging();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('/');
  const [loading, setLoading] = React.useState(true); // calling React.useState to be able to mock with snapshot tests.
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
    try{
      const inventory = await checkInventory(lineItems);
      if (inventory) {
        navigate('/inventory', inventory)
      }
    } catch (e) {
      logError('check_inventory', e);
    }
  }
  useEffect(() => {
    setOpenSection(location.pathname);
  }, [location.pathname]);

  useEffect(async () => {
    setLoading(true);
    await getInventory();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (orderStatus === 'processing') {
      navigate('/processing');
    } else if (orderStatus === 'completed') {
      navigate(`/confirmation?public_order_id=${state.publicOrderId}`);
    }
  }, [orderStatus]);

  useEffect(() => {
    let openEl = mainEl;
    switch(openSection){
      case "summary":
      case "summaryB":
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

    if (openEl.current) {
      resizeObserver.observe(openEl.current);
    }
  
    return () => {
      resizeObserver.disconnect();
    }
  }, [openSection, mainEl?.current]);

  const style = window.innerWidth > 768 ? {
    height: height? `${height}px` : null,
    overflowY: height > window.innerHeight ? 'scroll' : 'hidden',
  } : {}

  return (
    <div className="Checkout__Form" style={style}>
      { (loading && <LoadingState/>) || 
        <>
          <Routes location={location}>
            <Route exact path="/processing" element={<ProcessingOrder ref={processingEl} />} />
            <Route exact path="/confirmation" element={<Confirmation ref={confirmationEl}/>} />
            <Route exact path="/inventory" element={<Inventory ref={inventoryEl}/>} />
            {
              customer.platform_id ?
              <Route exact path="/" element={<IndexPage ref={mainEl} onSectionChange={setOpenSection} show={openSection==="/"}/>} /> :
              <Route exact path="/" element={<IndexPageGuest ref={mainEl} onSectionChange={setOpenSection} show={openSection==="/"}/>} />
            }
          </Routes>
          { renderSidebar ? 
            <>
              <Shipping ref={shippingEl} show={openSection==='shipping'} onBack={() => setOpenSection("/")} />
              <Summary ref={summaryEl} section={openSection} onSectionChange={setOpenSection}/>
              <Billing ref={billingEl} section={openSection} onSectionChange={setOpenSection}/>
            </>
            : null
          }
          <CheckoutButton ref={checkoutButtonEl} className={(classNames("CheckoutButton", "CheckoutButton__Desktop", showCheckoutButton ? "CheckoutButton__Show" : "CheckoutButton__Hide"))} />
        </>
      }
    </div>
  )};


export default CheckoutForm;
