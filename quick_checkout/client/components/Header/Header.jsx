import React from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from './components';
import './Header.scss';

const Header = ({ shopName, onClose }) => (
  <div className="Checkout__Header">
    <h1 className="Header__ShopName">{shopName}</h1>
    <button
      type="button"
      className="Header__CloseButton"
      onClick={onClose}
    >
      <CloseIcon />
    </button>
  </div>
);

Header.propTypes = {
  shopName: PropTypes.string.isRequired,
};

export default Header;
