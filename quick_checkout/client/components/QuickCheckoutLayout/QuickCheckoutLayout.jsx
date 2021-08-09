import React, {
  useEffect, useState, useCallback, useMemo
} from 'react';
import { useCheckoutStore, LineItems, OrderProcessed, OrderProcessing, Accordion, ShippingAddress, PaymentMethod, BillingAddress, CheckoutButton } from '@boldcommerce/checkout-react-components';
import { QuickCheckoutSummary, QuickCheckoutBreakdown, QuickCheckoutEmail, QuickCheckoutShippingLinesWrapper, QuickCheckoutDiscount, CheckoutStep, MinimizedShippingAddress, MinimizedShippingMethod, MinimizedEmail } from '..';
import Button from '@boldcommerce/stacks-ui/lib/components/button/Button';
import './QuickCheckoutLayout.css';

const QuickCheckout = ({ closeQuickCheckout }) => {
  const { state } = useCheckoutStore();
  const { orderStatus } = state.orderInfo;
  const loggedIn = state.isAuthenticated;
  const isProcessing = orderStatus === 'processing';
  const orderIsProcessed = orderStatus === 'completed';
  const [openSummary, setOpenSummary] = useState(false);
  const [currStep, setCurrStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const handleStepChange = useCallback((newStep) => {
    setCurrStep(newStep);
  },[setCurrStep]);

  const handleIncrementStep = useCallback(() => {
    setCurrStep(currStep+1);
  },[currStep]);

  useEffect(() => {
    let startingStep = 1;

    if (loggedIn) {
      if (state?.applicationState?.customer.email_address) {
        startingStep += 1
        if (state?.applicationState?.addresses?.shipping && state?.applicationState?.shipping?.selected_shipping) {
          startingStep += 1
        }
      }
    }
    
    setCurrStep(startingStep);
  },[]);

  const SummaryAccordion = useMemo(() => {
    return (
      <Accordion open={openSummary || !isMobile} className="accordion__content">
        <div className="SummaryContent--wrapper">
          <LineItems readOnly={orderIsProcessed} />
        </div>
        <QuickCheckoutBreakdown isMobile={isMobile}/>
      </Accordion>
    )
  },[openSummary, isMobile, orderIsProcessed]);

  const QuickCheckoutStepWrapper = useMemo(() => {
    return (
      <>
        <CheckoutStep activeStep={currStep} step={1} stepTitle={"Contact Information"}  
          expandedForms={[<QuickCheckoutEmail onIncrementStep={handleIncrementStep} nextButtonText={'Continue to shipping'} isLoggedIn={loggedIn} handleLogin={closeQuickCheckout} />]} 
          minimizedForms={[<MinimizedEmail customerEmail={state?.applicationState?.customer.email_address} isLoggedIn={loggedIn} onChangeStep={ loggedIn ? closeQuickCheckout : handleStepChange} changeButtonText={loggedIn ? 'Log out' : 'Change'} step={1} />]}  
        />
        <CheckoutStep activeStep={currStep} step={2} stepTitle={"Shipping"}  
          expandedForms={[<ShippingAddress />, <QuickCheckoutShippingLinesWrapper onIncrementStep={handleIncrementStep} nextButtonText={'Continue to billing'} isLoggedIn={loggedIn} />]} 
          minimizedForms={[<MinimizedShippingAddress shippingAddress={state?.applicationState?.addresses?.shipping} onChangeStep={handleStepChange} changeButtonText={'Change'} step={2} />, <MinimizedShippingMethod selectedShippingDescription={state?.applicationState.shipping?.selected_shipping?.description} selectedShippingAmount={state?.applicationState.shipping?.selected_shipping?.amount} onChangeStep={handleStepChange} changeButtonText={'Change'} step={2} />]} 
        />
        <CheckoutStep activeStep={currStep} step={3} stepTitle={"Billing"} 
          expandedForms={[<PaymentMethod />, <BillingAddress />, <QuickCheckoutDiscount />, <CheckoutButton className={"CheckoutStep__NextBtn"} />]} 
          minimizedForms={[]}
        />
      </>
    )
  },[currStep, handleStepChange, handleIncrementStep, loggedIn, closeQuickCheckout, state?.applicationState?.customer.email_address, state?.applicationState?.addresses?.shipping, state?.applicationState.shipping?.selected_shipping?.description, state?.applicationState.shipping?.selected_shipping?.amount]);

  return (
    <div className="Checkout--Collapsed">
      {
        (isProcessing && <OrderProcessing />)
      }
      {
        (
          <>
            <div className={`Checkout__Main ${isProcessing || openSummary ? 'Checkout__Main--Hidden' : ''}`} key={orderIsProcessed}>
              {
                orderIsProcessed ? (
                  <>
                    <OrderProcessed />
                    <Button className="FieldSet CheckoutStep__NextBtn" onClick={closeQuickCheckout}>Continue shopping</Button>
                  </>
                ) : QuickCheckoutStepWrapper
              }
            </div>
            { 
              isMobile ? SummaryAccordion : null
            }
            <div className={`
            ${openSummary ? 'Checkout__Summary' : 'Checkout__Summary Checkout__Summary--Collapsed'}
            ${isProcessing ? 'Checkout__Summary--Hidden' : ''}
            `}
            >
              <QuickCheckoutSummary open={openSummary} setOpen={setOpenSummary} isMobile={isMobile} setIsMobile={setIsMobile} summaryAccordion={ isMobile ? null : SummaryAccordion }/>
            </div>
          </>
        )
      }
    </div>
  );
};

export default QuickCheckout;