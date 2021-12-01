const fetch = require('node-fetch');
const ResponseError = require('./responseError');

async function createCheckout(body) {
  const response = await fetch(`https://api.boldcommerce.com/checkout/orders/${process.env.SHOP_IDENTIFIER}/init`, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  });

  if (response.status !== 200) {
    throw new ResponseError(response.statusText, response.status);
  }

  return await response.json();
}

module.exports = createCheckout;
