# Single Page Checkout Template
This is a pre-built checkout template using the [checkout-react-components](https://www.npmjs.com/package/@boldcommerce/checkout-react-components) library.

## About
This project is a starting point for a single page layout. This project uses [Node.js](https://nodejs.org) with [Express](https://expressjs.com) and [React](https://reactjs.org).

## Getting Started
- Duplicate .env.example and rename it to .env.
- Populate with API credentials obtained through [Bold Account Center](https://apps.boldapps.net/accounts/login)
- In server/views/checkout_example.handlebars, change the sku on the data attribute of the buy now button to be a sku that exists in your product catalogue for the store that Checkout is integrated with.
- Run `yarn` or `npm install`
- Run `yarn dev` or `npm run dev` to start both the Node.js server and the webpack watcher.

## Production Build
- Run `yarn build`
- Run `yarn start`. This will run the node server on port 3000

## Additional Notes
This is only meant to be a starting point project. You will need to edit `server/index.js` to authenticate logged in users with your given platform and initialize your checkout with dynamic data.
