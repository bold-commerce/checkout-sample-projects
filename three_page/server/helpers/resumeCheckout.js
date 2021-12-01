const fetch = require('node-fetch');
const ResponseError = require('./responseError');

async function resumeCheckout(publicOrderId) {
  const response = await fetch(`https://api.boldcommerce.com/checkout/orders/${process.env.SHOP_IDENTIFIER}/resume`, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      public_order_id: publicOrderId,
    }),
  });

  if (response.status !== 200) {
    throw new ResponseError(response.statusText, response.status);
  }

  return await response.json();
}

module.exports = resumeCheckout;
