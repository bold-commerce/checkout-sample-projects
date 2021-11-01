import React from 'react';

const RedactedCreditCard = ({ brand, lineText }) => (
  <span className="RedactedCard">
    <span className="RedactedCard__Brand">{brand}</span>
    <span className="RedactedCard__Number">
      {' '}
      &bull;&bull;&bull;&bull;
      {' '}
      &bull;&bull;&bull;&bull;
      {' '}
      &bull;&bull;&bull;&bull;
      {' '}
      {lineText}
    </span>
  </span>
);

export default RedactedCreditCard;
