import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import '@boldcommerce/checkout-react-components/dist/styles.css';

const quickCheckoutButton = document.getElementById('quick-checkout-product');

if (quickCheckoutButton) {
    quickCheckoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    let event = {}; 

    const sku = quickCheckoutButton.getAttribute('data-sku');
    event = new CustomEvent('quickCheckout:open', {detail: { sku }});

    document.dispatchEvent(event);
  });

}

ReactDOM.render(<App />, document.getElementById('quick-checkout-app'));
