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
    // "customer": {
    //   "platform_id": "",
    // //  "platform_id": "39459641884739",
    //   "platform_customer_id": "123",
    //   "email_address": "john.doe@email.com",
    //   "saved_addresses": [
    //     {
    //       "id": 123,
    //       "first_name": "John",
    //       "last_name": "Doe",
    //       "company": "Bold",
    //       "address_line_1": "50 Fultz Boulevard",
    //       "address_line_2": "",
    //       "city": "Winnipeg",
    //       "province": "Manitoba",
    //       "country": "Canada",
    //       "postal_code": "R3Y 0L6",
    //       "phone_number": "+12042222222",
    //       "province_code": "MB",
    //       "country_code": "CA",
    //       "country_name": "Canada",
    //       "default": true
    //     },
    //     {
    //       "id": 456,
    //       "first_name": "Jane",
    //       "last_name": "Doe",
    //       "company": "Bold",
    //       "address_line_1": "100 Innovation Drive",
    //       "address_line_2": "",
    //       "city": "Winnipeg",
    //       "province": "Manitoba",
    //       "country": "Canada",
    //       "postal_code": "R3T 6A8",
    //       "phone_number": "+12042222222",
    //       "province_code": "MB",
    //       "country_code": "CA",
    //       "country_name": "Canada",
    //       "default": false
    //     },
    //   ],
    // },
    "cart_items": [{
      "sku": "ABS",
      "quantity": 1,
      "line_item_key": "abc123"
    },{    
      "sku":"CGLD-MO",
      "quantity": 3,
      "line_item_key": "SOAP"
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

  res.render('checkout_example', {
    layout: false,
    publicOrderId: public_order_id,
    jwtToken: jwt_token,
    storeIdentifier: process.env.SHOP_IDENTIFIER,
    applicationState: JSON.stringify(application_state),
    initialData: JSON.stringify(initial_data),
  });
});

app.get('/inventory', async ( req, res ) => {
  const invRequest = await fetch(`https://api.boldcommerce.com/products/v2/shops/${process.env.SHOP_IDENTIFIER}/products?filter=in(platform_id:${req.query.ids})`, {
  headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
  const invResult = await invRequest.json();
  const invList = invResult.data.map((item) => {
      return { id:        item.platform_id,
               stock:     item.inventory_quantity,
               tracking:  item.inventory_tracking_service
             }
    });
  return res.json(invList);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
