import React from "react";
import ReactDOM from "react-dom";
import './i18n/config';
import App from './App';

window.addEventListener("openOneClickCheckout", () => {
  const div = document.createElement("div");
  div.setAttribute('id', 'checkout-app');
  document.body.appendChild(div);

  ReactDOM.render(<App />, document.getElementById('checkout-app'));
});
