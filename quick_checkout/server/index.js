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
  res.render('checkout_example', {
    layout: false,
  });
});

app.get('/init', async (req, res) => {
  const sku = req.query.sku;
  const body = {
    cart_items: [{
      sku,
      quantity: 2,
      line_item_key: "12345",
    }],
  };

  const checkout = await fetch(`https://api.boldcommerce.com/checkout/orders/${process.env.SHOP_IDENTIFIER}/init`, {
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

  const store_identifier = process.env.SHOP_IDENTIFIER;

  res.json({
    initial_data: initial_data,
    application_state: application_state,
    jwt_token,
    public_order_id,
    store_identifier,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
