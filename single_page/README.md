# Single Page Checkout Template
This project is intended to demonstrate the abilities of a headless checkout using the Bold Checkout APIs. It includes everything you need to create a single-page checkout, which is reached from the store’s cart page.

## About
This project uses the following resources and toolkits:
* [React](https://reactjs.org/)
* including [stacks-ui](https://www.npmjs.com/package/@boldcommerce/stacks-ui) component library
* [checkout-react-components](https://www.npmjs.com/package/@boldcommerce/checkout-react-components) component library
* [Webpack](https://webpack.js.org/)

## Prerequisites
* Create a store containing at least one product.
* Install Bold Commerce on your store. See [Getting Started with Bold Checkout](https://developer.boldcommerce.com/default/guides/checkout/checkout-getting-started) for more information.
* Have a backend application running that intializes the order via the init endpoint 

## Getting Started
1. Clone this project into your local environment
2. Run `yarn install`
2. Either run `yarn start` or `yarn build` and make sure the javascript files are available by a url
3. Add the javascript to the checkout page that is hosted by your backend application
4. Make sure the checkout page is injecting a window variable with the following data
```javascript
window.shopAlias = '{{shopAlias}}';
window.shopName = '{{shopName}}';
window.shopIdentifier = '{{shopIdentifier}}';
window.returnUrl = '{{returnUrl}}';
window.loginUrl = '{{{loginUrl}}}';
window.headerLogoUrl = '{{headerLogoUrl}}';
window.environment = {
  type: 'production',
};
window.initializedOrder = {
  data: {{{checkout}}} // All data that is returned via the checkout init endpoint
};
window.platformType = 'bigcommerce'
window.google_analytics_tracking_id = '{{gaTracking}}';
window.facebook_analytics_tracking_id = '{{fbTracking}}';
```

## Production Build
- Run `yarn start` or `npm run start`. This will run webpack dev server on port 8080 (https://localhost:8080). You may need to navigate to this url in your browser and allow the browser to navigate to the insecure url.
- Run `yarn build` or `npm run build`. This will run the node server on port 3000.

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

## Currency Formatting
The currency can be customized using the `currency_format` variable in the `i18n/en/translations.json` file. The available `amount` options are as follows:
* `amount`
* `amount_no_decimals`
* `amount_with_comma_separator`
* `amount_no_decimals_with_comma_separator`
* `amount_with_space_separator`
* `amount_no_decimals_with_space_separator`
* `amount_with_apostrophe_separator`

For step-by-step instructions on implementing a basic headless checkout example, refer to the [Build a Headless Checkout](https://developer.boldcommerce.com/default/guides/checkout/checkout-headless-guide) tutorial.
