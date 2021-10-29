import React, { useEffect }  from 'react';
import { Route, useLocation, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BillingAddress } from '@boldcommerce/checkout-react-components';
import { Shipping } from '../Shipping';
import { useAnalytics } from '../../../../hooks';

const CheckoutForm = () => {
  const location = useLocation();
  const track = useAnalytics();

  useEffect(() => {
    track(location.pathname);
  }, [location.pathname]);

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
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  )};


export default CheckoutForm;
