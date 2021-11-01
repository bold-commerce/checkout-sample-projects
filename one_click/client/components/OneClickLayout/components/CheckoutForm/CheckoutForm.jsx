import React, { useEffect }  from 'react';
import { Route, useLocation, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BillingAddress, useLineItems } from '@boldcommerce/checkout-react-components';
import { Shipping } from '../Shipping';
import { useAnalytics, useInventory } from '../../../../hooks';
import { Inventory } from '../Inventory/Inventory';

const CheckoutForm = () => {
  const { lineItems } = useLineItems();
  const location = useLocation();
  const track = useAnalytics();
  const checkInventory = useInventory();

  useEffect(() => {
    track(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    checkInventory(lineItems);
  }, [])

  return (
    <>
      <TransitionGroup>
        <CSSTransition
          timeout={150}
          classNames="fade"
          key={location.key}
        >
          <Switch location={location}>
            <Route exact path="/shipping" component={Shipping} />
            <Route exact path="/billing" component={BillingAddress} />
            <Route exact path="/inventory" component={Inventory} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  )};


export default CheckoutForm;
