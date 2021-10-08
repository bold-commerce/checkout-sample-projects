import React  from 'react';
import Card from '../Card';

const IndexPage = () => {
  return (
    <>
      <Card
        title={"Summary"}
        component={"/summary"}
        overview={"$23.80"}
      />
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
      <Card
        title={"Payment"}
        component={"/payment"}
        description={"Visa **** 1234"}
      >
            <div>Billing address same as shipping address.</div>
      </Card>
    </>
  )
};

export default IndexPage;
