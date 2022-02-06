# Checkout Sample Projects
This is a collection of pre-built checkout templates using the [checkout-react-components](https://www.npmjs.com/package/@boldcommerce/checkout-react-components) library. This is a list of the examples included in this project:
* [Single Page Checkout](single_page)
  * This is a single page checkout template that has the order breakdown listed in a sidebar on desktop
* [One Click Checkout](one_click)
  * This is a one click checkout template that displays the condensed checkout within a modal.

## Getting Started
1. Clone this project locally
3. Duplicate `.env.example` and rename it to `.env`.
4. Populate the `.env` file with your inventory url, and login url. See [ENV Configuration](#env-configuration) for more information.
5. In `server/index.js`, locate the `exampleBody` variable. Change the `platform_id` to be a `platform_id` that exists in your product catalog for the store that Checkout is integrated with.
6. Run `yarn` or `npm install`.
7. Run `yarn start` or `npm run start` to run webpack-dev-server on port 8080

## Production Build
- Run `yarn build` or `npm run build`
- Run `yarn start` or `npm run start`. This will run the node server on port 3000.

## ENV Configuration
* INVENTORY_URL
  * This is a custom endpoint that the React app will make a request to in order to fetch inventory information about the current order. This check happens at the beginning of the checkout and before processing the order. The response of this custom endpoint should be in the following format:

  ```json
    {
      "{VARIANT_ID}": {
        "product_id": "123456789",
        "quantity": 99,
        "allow_backorder": true,
        "inventory_tracker": "none",
        "tracking_level": "variant"
      }
    }
  ```
  * Needs to be an object with the key being the variant id
  * **product_id:** The id of the product that the variant is associated with.
  * **quantity:** The stock available for the specific variant.
  * **allow_backorder:** If the variant is allowed to be oversold.
  * **inventory_tracker:** Possible values are `none` or `platform`. If `none`, then the variant does not track inventory
  * **tracking_level:** If the product tracks inventory at the product or variant level.

* LOGIN_URL
  * The url that the user should be redirected to when they click the login link in the checkout.
* LOGOUT_URL
  * The url that the user should be redirected to when they click the logout link in the checkout.
* CONTACT_URL
  * The url that the user should be redirected to when they click the contact us link in the checkout

## Integrating with a backend
* In order to use the frontend, you need to populate the `CheckoutProvider` with information that you recieve from the [Bold Commerce Order Init endpoint](https://developer.boldcommerce.com/default/documentation/orders#/Orders/post-init)
* You will need to create a backend application that will integrate a platforms shopping cart and make a request to the above API. The information received can then be passed to the `CheckoutProvider`.
* There are example backend applications for [Shopify](https://github.com/bold-commerce/headless-checkout-shopify) and [Bigcommerce](https://github.com/bold-commerce/headless-checkout-bigcommerce) that you can use instead if you'd like.

## Analytics
To add analytics tracking to the app, you can edit the custom hook called `useAnalytics` that can be found in `client/hooks/useAnalytics.js`.

**Usage**:
```javascript
import { useAnalytics } from './client/hooks/useAnalytics.js' // Change this to the correct path to the hooks folder

const CustomComponent = () => {
  const trackEvent = useAnalytics();

  trackEvent('event_type');
}
```

## Error Logging
To add error logging to the app, you can edit the custom hook called `useErrorLogging` that can be found in `client/hooks/useErrorLogging.js`

**Usage**
```javascript
import { useErrorLogging } from './client/hooks/useErrorLogging.js'; // Change this to the correct path to the hooks folder

const CustomComponent = () => {
  const logError = useErrorLogging();

  logError('type', new Error('error message'));
}
```
