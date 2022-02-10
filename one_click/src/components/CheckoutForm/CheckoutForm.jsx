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

const CheckoutForm = ({ banners }) => {
  const { data: lineItems } = useLineItems();
  const { state } = useCheckoutStore();
  const { data: customer } = useCustomer();
  const orderStatus = state.orderInfo.orderStatus;
  const location = useLocation();
  const checkInventory = useInventory();
  const logError = useErrorLogging();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState('/');
  const [modalHeight, setModalHeight] = useState('100%')
  const [loading, setLoading] = useState(true);
  const [height, setHeight] = useState(null);
  const [overflow, setOverflow] = useState(null)
  const mainEl = useRef(null);
  const summaryEl = useRef(null);
  const shippingEl = useRef(null);
  const billingEl = useRef(null);
  const processingEl = useRef(null);
  const confirmationEl = useRef(null);
  const inventoryEl = useRef(null);
  const checkoutButtonEl = useRef(null);
  const checkoutFormEl = useRef(null);

  const showCheckoutButton = (openSection === 'summary' || openSection === '/') && customer.platform_id;
  const renderSidebar = openSection === '/' || openSection.indexOf('/') === -1;
  
  const getInventory = async () => {
    try{
      const inventory = await checkInventory(lineItems);
      if (inventory) {
        navigate('/inventory', { state: inventory });
      }
    } catch (e) {
      logError('check_inventory', e);
    }
  }

  useEffect(() => {
    if (banners) {
      setModalHeight( `${checkoutFormEl.current.clientHeight - checkoutFormEl.current.offsetTop}px`)
    } else {
      setModalHeight('100%')
    }
  }, [banners]);

  useEffect(() => {
    setOpenSection(location.pathname);
  }, [location.pathname]);

  useEffect(async () => {
    setLoading(true);
    await getInventory();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (orderStatus === 'error') {
      navigate('/');
    } else if (orderStatus === 'processing') {
      navigate('/processing');
    } else if (orderStatus === 'error') {
      navigate('/')
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

  useEffect(() => {
    const resize = new ResizeObserver(() => {
      if(height > window.innerHeight)
        setOverflow("scroll");
      else {
        setOverflow('hidden');
      }
    });

    if(checkoutFormEl.current){
      resize.observe(checkoutFormEl.current);
    }
    else {
      resizeObserver.disconnect();
    }
  }, [height])

  const style = window.innerWidth > 768 ? {
    height: height? `${height}px` : null,
    overflowY: overflow,
  } : { 
    height: modalHeight 
  }

  return (
    <div className="Checkout__Form" style={style} bold-one-click-form="true" ref={checkoutFormEl}>
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
              <Summary ref={summaryEl} section={openSection} onSectionChange={setOpenSection}/>
              {/* only used on the IndexPage, hide otherwise to prevent autofilling hidden fields */}
              { customer.platform_id && <Shipping ref={shippingEl} show={openSection==='shipping'} onBack={() => setOpenSection("/")} /> }
              {/* only used on the IndexGuestPage, hide otherwise to prevent autofilling hidden fields */}
              { !customer.platform_id && <Billing ref={billingEl} section={openSection} onSectionChange={setOpenSection}/> }
            </>
            : null
          }
          <div className="CheckoutButton__Desktop__Wrapper" >
            <CheckoutButton ref={checkoutButtonEl} className={(classNames("CheckoutButton", "CheckoutButton__Desktop", showCheckoutButton ? "CheckoutButton__Show" : "CheckoutButton__Hide"))} />
          </div>
        </>
      }
    </div>
  )};

export default CheckoutForm;
