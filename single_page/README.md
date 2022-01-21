# Single Page Checkout Template
This project is intended to demonstrate the abilities of a headless checkout using the Bold Checkout APIs. It includes everything you need to create a single-page checkout, which is reached from the store’s cart page.

## About
This project uses the following resources and toolkits:
| Client | Server |
| :---   | :---   |
| [React](https://reactjs.org/), including [stacks-ui](https://www.npmjs.com/package/@boldcommerce/stacks-ui) component library and [checkout-react-components](https://www.npmjs.com/package/@boldcommerce/checkout-react-components) component library | [Node.js](https://nodejs.org/) |
| [Webpack](https://webpack.js.org/) | [Express](https://expressjs.com/) |
| | [Handlebars](https://handlebarsjs.com/) |

## Prerequisites
* Create a store containing at least one product.
* Install Bold Commerce on your store. See [Getting Started with Bold Checkout](https://developer.boldcommerce.com/default/guides/checkout/checkout-getting-started) for more information.

## Getting Started
1. Clone this project into your local environment
2. Create an account and an API access token in the Bold Account Center using the instructions in the [Quick Start](https://developer.boldcommerce.com/default/guides/getting-started/quick-start). 
3. Duplicate `.env.example` and rename it to `.env`.
4. Populate the `.env` file with your API access token, shop identifier, and abandoned checkout url.
5. In `server/index.js`, locate the `exampleBody` variable. Change the `platform_id` to be a `platform_id` that exists in your product catalog for the store that Checkout is integrated with.
6. Run `yarn` or `npm install`.
7. Run `yarn dev` or `npm run dev` to start both the Node.js server and the webpack watcher.

## Production Build
- Run `yarn build` or `npm run build`
- Run `yarn start` or `npm run start`. This will run the node server on port 3000.

## Analytics
To add analytics tracking to the app, you can edit the custom hook called `useAnalytics` that can be found in `src/hooks/useAnalytics.js`.

**Usage**:
```javascript
import { useAnalytics } from './src/hooks/useAnalytics.js' // Change this to the correct path to the hooks folder

const CustomComponent = () => {
  const trackEvent = useAnalytics();

  trackEvent('event_type');
}
```

## Error Logging
To add error logging to the app, you can edit the custom hook called `useErrorLogging` that can be found in `src/hooks/useErrorLogging.js`

**Usage**
```javascript
import { useErrorLogging } from './src/hooks/useErrorLogging.js'; // Change this to the correct path to the hooks folder

const CustomComponent = () => {
  const logError = useErrorLogging();

  logError('type', new Error('error message'));
}
```

**Inventory**
example response
```json
{
  "data" : [
    {
      "platform_id": "string",
      "inventory_quantity" : 0
    }
  ]
}
```
## Currency Formatting
The currency can be customized using the `CURRENCY_FORMAT` variable in the `.env` file. The available `amount` options are as follows:
* `amount`
* `amount_no_decimals`
* `amount_with_comma_separator`
* `amount_no_decimals_with_comma_separator`
* `amount_with_space_separator`
* `amount_no_decimals_with_space_separator`
* `amount_with_apostrophe_separator`

## Additional Notes
This is only meant to be a starting point for building your own headless checkout project. In order to enable this example to be a fully-functioning checkout, you must:
* Edit `server/index.js` to authenticate logged in users with your given platform.
* Edit `server/index.js` to initialize your checkout with dynamic data.

For step-by-step instructions on implementing a basic headless checkout example, refer to the [Build a Headless Checkout](https://developer.boldcommerce.com/default/guides/checkout/checkout-headless-guide) tutorial.
