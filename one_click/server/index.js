require('dotenv').config();
const fetch = require('node-fetch');
const express = require('express');
const handlebars = require('express-handlebars');

const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views','./server/views');
app.use(express.static('public'));
const port = 3000;

app.get('/', async (req, res) => {
  // TODO: Change to dynamic cart data
  const body = {
    "cart_items": [
      {
        "quantity": 1,
        "platform_id": "39459641884739",
        "line_item_key": "39459641884739:ddd1399553d2dedd0c6ab9d9abbc089e"
      }
    ],
  };

  const checkout = await fetch(`https://api.staging.boldcommerce.com/checkout/orders/${process.env.SHOP_IDENTIFIER}/init`, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });

  const response = await checkout.json();

  const {
    initial_data, application_state, jwt_token, public_order_id,
  } = response.data;

  res.render('checkout_example', {
    layout: false,
    publicOrderId: public_order_id,
    jwtToken: jwt_token,
    storeIdentifier: process.env.SHOP_IDENTIFIER,
    applicationState: JSON.stringify(application_state),
    initialData: JSON.stringify(initial_data),
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
