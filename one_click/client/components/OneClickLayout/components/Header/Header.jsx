import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Times } from "../Icons";
import './Header.css';
import { AppContext } from '../../context/AppContext';

const Header = ({ title }) => {

  const { setShowCheckout } = useContext(AppContext);

  return (
    <div className="Header">
      <h1 className="Header__Title">{title}</h1>
      <button aria-label="Close" className="Header__Times" onClick={() => setShowCheckout(false)}>
        <Times />
      </button>
    </div>
  )
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header;