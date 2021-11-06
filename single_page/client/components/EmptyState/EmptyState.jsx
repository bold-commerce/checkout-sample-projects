import React from 'react';
import PropTypes from 'prop-types';
import EmptyStateIcon from './EmptyStateIcon';
import './EmptyState.css';

const EmptyState = ({ title }) => (
  <div className="FieldSet--EmptyState">
    <EmptyStateIcon />
    { title }
  </div>
);

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EmptyState;