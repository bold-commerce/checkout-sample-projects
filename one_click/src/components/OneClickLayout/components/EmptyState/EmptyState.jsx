import React from 'react';
import PropTypes from 'prop-types';
import './EmptyState.css';
import Logo from './EmptyStateLogo';

const EmptyState = ({ title }) => (
  <div className="FieldSet--EmptyState">
    <Logo />
    { title }
  </div>
);

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EmptyState;
