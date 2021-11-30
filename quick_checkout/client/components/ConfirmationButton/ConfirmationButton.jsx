import React from 'react';
import { Button } from '@boldcommerce/stacks-ui';
import './ConfirmationButton.scss';

const ConfirmationButton = ({ text, onClick, loading, disabled }) => (
  <Button type="button" onClick={onClick} className="ConfirmationButton" loading={loading} disabled={disabled}>
    {text}
  </Button>
);

export default ConfirmationButton;
