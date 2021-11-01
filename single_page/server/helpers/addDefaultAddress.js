const fetch = require('node-fetch');

async function addDefaultAddress(savedAddress, jwtToken, publicOrderId) {
  const response = await fetch(`https://api.boldcommerce.com/checkout/storefront/${process.env.SHOP_IDENTIFIER}/${publicOrderId}/addresses/shipping`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(savedAddress),
  });

  if (response.status !== 200) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

module.exports = addDefaultAddress;