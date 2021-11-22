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
- Run `yarn build` or `npm run build`
- Run `yarn start` or `npm run start`. This will run the node server on port 3000

## Additional Notes
This is only meant to be a starting point project. You will need to edit `server/index.js` to authenticate logged in users with your given platform and initialize your checkout with dynamic data.

## Analytics
To add analytics tracking to the app, you can edit the custom hook called useAnalytics that can be found in `client/hooks/useAnalytics.js`.

**Usage**:
```javascript
import { useAnalytics } from './client/hooks/useAnalytics.js' // Change this to the correct path to the hooks folder

const CustomComponent = () => {
  const trackEvent = useAnalytics();

  trackEvent('event_type');
}
```

## Error Logging
To add error logging to the app, you can edit the custom hook called useErrorLogging that can be found in `client/hooks/useErrorLogging.js`

**Usage**
```javascript
import { useErrorLogging } from './client/hooks/useErrorLogging.js'; // Change this to the correct path to the hooks folder

const CustomComponent = () => {
  const logError = useErrorLogging();

  logError('type', new Error('error message'));
}
```
