import React from "react";
import ReactDOM from "react-dom";
import './i18n/config';
import App from './App';

const open = () => {
  document.body.style.overflow = "hidden";

  const div = document.createElement("div");
  div.setAttribute('id', 'checkout-app');
  document.body.appendChild(div);

  ReactDOM.render(<App />, document.getElementById('checkout-app'));
}

const close = () => {
  const checkoutEl = document.getElementById('checkout-app')
  ReactDOM.unmountComponentAtNode(checkoutEl);
  checkoutEl.remove();

  document.body.style.overflow = "visible";
}

window.addEventListener("oneClick:open", () => {
  open();
});

window.addEventListener("oneClick:close", () => {
  close();
});

window.addEventListener("click", function(e){
  if(e.target.className === 'OneClick--Modal'){
    close();
  }
})
