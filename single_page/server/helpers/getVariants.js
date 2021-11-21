const fetch = require('node-fetch');
const { default: ResponseError } = require('./responseError');

async function getVariants(variants) {
  const response = await fetch(`https://api.boldcommerce.com/products/v2/shops/${process.env.SHOP_IDENTIFIER}/variants?filter=in(platform_id:${variants})`, {
    headers: {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new ResponseError(response.statusText, response.status);
  }

  return await response.json();
}

module.exports = getVariants;
