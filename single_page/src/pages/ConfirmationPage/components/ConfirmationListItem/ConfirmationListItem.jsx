import React from 'react';

const ConfirmationListItem = ({ title, children }) => (
  <div className="Confirmation__ListItem">
    <strong>{ title }</strong>
    { children }
  </div>
);

export default ConfirmationListItem;
