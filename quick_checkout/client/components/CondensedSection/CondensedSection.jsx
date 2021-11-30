import React from 'react';
import './CondensedSection.scss';

const CondensedSection = ({ title, children }) => (
  <div className="CondensedSection">
    <span className="CondensedSection__Label">{title}</span>
    <div className="CondensedSection__Content">
      {children}
    </div>
  </div>
);

export default CondensedSection;
