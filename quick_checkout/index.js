import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import './QuickCheckout/QuickCheckout.css';

// TODO: change one-click names to quick-checkout 
const quickCheckoutButton = document.querySelector('.quick-checkout');

if (quickCheckoutButton) {
    quickCheckoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    let event = {}; 

    // on product page
    if (e.target.id == 'quick-checkout-product') {
      const productSku = document.querySelectorAll('[data-product-sku]');
      event = new CustomEvent('quickCheckout:open', {detail: {sku: productSku[0].innerText, customer_id: e.target.dataset.customerId, customer_email: e.target.dataset.customerEmail }});
    } else {
      event = new Event('quickCheckout:open');
    }
    document.dispatchEvent(event);
  });

}

ReactDOM.render(<App />, document.getElementById('quick-checkout-app'));