import React, { useEffect }  from 'react';
import { Route, Switch } from "react-router-dom";
import { useLocation, useHistory} from 'react-router';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { BillingAddress, useCheckoutStore, useLineItems } from '@boldcommerce/checkout-react-components';
import { Summary } from '../Summary';
import { Shipping } from '../Shipping';
import { useAnalytics, useInventory } from '../../../../hooks';
import { Inventory } from '../Inventory';
import { ProcessingOrder } from '../Processing';

const CheckoutForm = () => {
  const { lineItems } = useLineItems();
  const { state } = useCheckoutStore();
  const orderStatus = state.orderInfo.orderStatus;
  const location = useLocation();
  const track = useAnalytics();
  const checkInventory = useInventory();
  const history = useHistory();

  const getInventory = async () => {
    const inventory = await checkInventory(lineItems);
    if (inventory) {
      history.push('/inventory', inventory)
    }
  }
  
  useEffect(() => {
    track(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    if (orderStatus === 'processing') {
      history.push('/processing');
    } else if (orderStatus === 'complete') {
      history.push(`/confirmation?public_order_id=${state.publicOrderId}`);
    }
  }, [orderStatus]);

  return (
    <>
      <TransitionGroup>
        <CSSTransition
          timeout={150}
          classNames="fade"
          key={location.key}
        >
          <Switch location={location}>
            <Route exact path="/processing" component={ProcessingOrder} />
            <Route exact path="/summary" component={Summary} />
            <Route exact path="/billing" component={BillingAddress} />
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/shipping" component={Shipping} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </>
  )};


export default CheckoutForm;
