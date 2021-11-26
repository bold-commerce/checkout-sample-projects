import React, { useEffect }  from 'react';
import { Route, Switch } from "react-router-dom";
import { useLocation, useHistory} from 'react-router';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useCheckoutStore, useLineItems } from '@boldcommerce/checkout-react-components';
import { Summary } from '../Summary';
import { Shipping } from '../Shipping';
import { useAnalytics, useInventory } from '../../../../hooks';
import { Inventory } from '../Inventory';
import { ProcessingOrder } from '../Processing';
import { Confirmation } from '../Confirmation';
import { IndexPage } from '../Index';

const CheckoutForm = () => {
  const { data: lineItems } = useLineItems();
  const { state } = useCheckoutStore();
  const orderStatus = state.orderInfo.orderStatus;
  const location = useLocation();
  const track = useAnalytics();
  const checkInventory = useInventory();
  const history = useHistory();
  console.log(location)

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
    } else if (orderStatus === 'completed') {
      history.push(`/confirmation?public_order_id=${state.publicOrderId}`);
    }
  }, [orderStatus]);

  return (
    <div className="Checkout__Form">
      <TransitionGroup>
        <CSSTransition
          timeout={1500}
          classNames="fade"
          key={location.key}
        >
          <Switch location={location}>
            <Route exact path="/confirmation" component={Confirmation} />
            <Route exact path="/processing" component={ProcessingOrder} />
            <Route exact path="/inventory" component={Inventory} />
            <Route exact path="/shipping" component={Shipping} />
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/summary" component={Summary} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  )};


export default CheckoutForm;
