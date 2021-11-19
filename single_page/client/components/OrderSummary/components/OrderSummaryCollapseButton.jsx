import React from 'react';

const OrderSummaryCollapseButton = ({ onClick, summaryOpen }) => {
  return (
    <button type="button" className="CollapseButton" onClick={onClick} aria-controls="OrderSummary">
      <span className="CollapseButton__title">{summaryOpen ? 'v' : '^'} View order summary</span>
      <span className="CollapseButton__description">(3 items) $36.00</span>
    </button>
  );
};

export default OrderSummaryCollapseButton;
