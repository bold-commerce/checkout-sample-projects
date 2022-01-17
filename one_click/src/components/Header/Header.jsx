import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { Times } from "../Icons";
import './Header.css';

const Header = ({ title }) => {

  const close = useCallback(() => {
    const event = new CustomEvent("oneClick:close");
    window.dispatchEvent(event);
  }, []);

  return (
    <div className="Header">
      <h1 className="Header__Title">{title}</h1>
      <button aria-label="Close" className="Header__Times" onClick={close}>
        <Times />
      </button>
    </div>
  )
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header;