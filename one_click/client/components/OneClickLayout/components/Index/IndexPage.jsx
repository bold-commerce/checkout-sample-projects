import React  from 'react';
import Card from '../Card';
import { LineItems } from '../LineItems';
import { useCheckoutStore } from '@boldcommerce/checkout-react-components';


const IndexPage = () => {
  const { state } = useCheckoutStore();
  return (
    <>
      <LineItems />
      {
        // TODO: Remove hardcoded value
      }
      <Card
        title={"Summary"}
        component={"/summary"}
        overview={"$23.80"}
      />
      { state.applicationState?.customer?.email_address && (
        <Card
        description={state.applicationState.customer.email_address}
        action={{label: "Not you?"}}
      />
      )}
      <Card
        title={"Shipping"}
        component={"/shipping"}
        description={"Jane Doe"}
      >
        {
          <>
            <div>1234 Somewhere Street, Winnipeg, Manitoba, A1B 2C3, Canada</div>
            <div>Canada Post Expedited Parcel — $7.00</div>
          </>
        }
      </Card>
      {
        // TODO: Remove hardcoded value
      }
      <Card
        title={"Payment"}
        description={"Visa **** 1234"}
        type={"paymentCard"}
      >
        <div>Billing address same as shipping address.</div>
      </Card>

    </>
  )
};

export default IndexPage;
