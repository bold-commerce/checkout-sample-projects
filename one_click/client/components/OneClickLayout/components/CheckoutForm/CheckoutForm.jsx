import React, { useEffect, useState }  from 'react';
import { Route, Switch } from "react-router-dom";
import { useLocation, useHistory} from 'react-router';
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
  const checkInventory = useInventory();
  const history = useHistory();
  const [openSection, setOpenSection] = useState(null);

  const getInventory = async () => {
    const inventory = await checkInventory(lineItems);
    if (inventory) {
      history.push('/inventory', inventory)
    }
  }

  useEffect(() => {
    getInventory();
  }, []);

  useEffect(() => {
    if (orderStatus === 'processing') {
      history.push('/processing');
      setOpenSection(null);
    } else if (orderStatus === 'completed') {
      history.push(`/confirmation?public_order_id=${state.publicOrderId}`);
    }
  }, [orderStatus]);

  return (
    <div className="Checkout__Form">
      <Switch location={location}>
        <Route exact path="/processing" component={ProcessingOrder} />
        <Route exact path="/confirmation" component={Confirmation} />
        <Route exact path="/inventory" component={Inventory} />
        <Route exact path="/">
          <IndexPage onSectionChange={setOpenSection} show={openSection===null}/>
        </Route>
      </Switch>
      <Shipping show={openSection==='shipping'} onBack={() => setOpenSection(null)} />
      <Summary show={openSection==='summary'}  onBack={() => setOpenSection(null)} />
    </div>
  )};


export default CheckoutForm;
