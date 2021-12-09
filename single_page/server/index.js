require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const createCheckout = require('./helpers/createCheckout');
const getVariants = require('./helpers/getVariants');
const resumeCheckout = require('./helpers/resumeCheckout');
const shopifyHandler = require('./handlers/shopifyHandler');

const app = express();
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views','./server/views');
app.use(express.static('public'));
const port = 3000;

if (process.env.PLATFORM === 'shopify') {
  app.use('/', shopifyHandler);
} else {
  // app.use('/', customHandler);
}

// app.get('/', async (req, res) => {
//   let publicOrderId = req.query.public_order_id;

//   // TODO: Change this to get data from request instead
//   const exampleBody = {
//     customer: {
//       platform_id: "39459641884739",
//       platform_customer_id: "123",
//       email_address: "john.doe@email.com",
//       saved_addresses: [
//         {
//           id: 123,
//           first_name: "John",
//           last_name: "Doe",
//           business_name: "Bold",
//           address_line_1: "50 Fultz Boulevard",
//           address_line_2: "",
//           city: "Winnipeg",
//           province: "Manitoba",
//           country: "Canada",
//           postal_code: "R3Y 0L6",
//           phone_number: "+12042222222",
//           province_code: "MB",
//           country_code: "CA",
//           country_name: "Canada"
//         },
//         {
//           id: 456,
//           first_name: "Jane",
//           last_name: "Doe",
//           business_name: "Bold",
//           address_line_1: "100 Innovation Drive",
//           address_line_2: "",
//           city: "Winnipeg",
//           province: "Manitoba",
//           country: "Canada",
//           postal_code: "R3T 6A8",
//           phone_number: "+12042222222",
//           province_code: "MB",
//           country_code: "CA",
//           country_name: "Canada"
//         },
//       ],
//     },
//     cart_items: [{
//       platform_id: "66",
//       quantity: 1,
//       line_item_key: "abc123"
//     }, {
//       platform_id: "73",
//       quantity: 2,
//       line_item_key: "def345"
//     }],
//     resumable_link: process.env.ABANDONED_CHECKOUT_URL,
//   };

//   try {
//     let checkout;
//     if (publicOrderId) {
//       checkout = await resumeCheckout(publicOrderId);
//     } else {
//       checkout = await createCheckout(exampleBody);
//     }

//     const initialData = checkout.data.initial_data;
//     const jwtToken = checkout.data.jwt_token;
//     publicOrderId = checkout.data.public_order_id;
//     let applicationState = checkout.data.application_state;

//     res.render('checkout_example', {
//       layout: false,
//       publicOrderId,
//       jwtToken,
//       storeIdentifier: process.env.SHOP_IDENTIFIER,
//       applicationState: JSON.stringify(applicationState),
//       initialData: JSON.stringify(initialData),
//     });
//   } catch(e) {
//     res.status(e.status || 500);
//     res.json({
//       message: e.message,
//     });
//   }
// });

app.get('/processing', (req, res) => {
  res.redirect('/');
});

app.get('/inventory_issues', (req, res) => {
  res.redirect('/');
});

app.get('/confirmation', async (req, res) => {
  const publicOrderId = req.query.public_order_id;

  try {
    const checkout = await resumeCheckout(publicOrderId);
    const initialData = checkout.data.initial_data;
    const jwtToken = checkout.data.jwt_token;
    let applicationState = checkout.data.application_state;

    res.render('checkout_example', {
      layout: false,
      publicOrderId,
      jwtToken,
      storeIdentifier: process.env.SHOP_IDENTIFIER,
      applicationState: JSON.stringify(applicationState),
      initialData: JSON.stringify(initialData),
    });
  } catch(e) {
    res.status(e.status || 500);
    res.json({
      message: e.message,
    });
  }
});

app.get('/validate_inventory', async (req, res) => {
  const variants = req.query.variants;

  try {
    const response = await getVariants(variants);
    res.json({
      inventory: response.data.map((variant) => {
        return {
          platform_id: variant.platform_id,
          inventory_quantity: variant.inventory_quantity,
        };
      })
    });
  } catch(e) {
    res.status(e.status || 500);
    res.json({
      message: e.message,
    })
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
