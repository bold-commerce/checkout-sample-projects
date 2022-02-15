import { Price } from '@boldcommerce/stacks-ui';
import React from 'react';
import { RemoveIcon } from '../../Icons';
import { useTranslation } from 'react-i18next';

const OrderSummaryItemLine = ({ description, amount, onRemove }) => {
  const { t } = useTranslation();
  return (
    <div className="OrderSummaryItem__Description">
      { onRemove && (
        <button className="OrderSummaryItem__Action" type="button" onClick={onRemove}><RemoveIcon /></button>
      )}
      <span className="OrderSummaryItem__Label">{description}</span>
      <span className="OrderSummaryItem__Amount">(<Price amount={amount} moneyFormatString={t('currency_format')}/>)</span>
    </div>
  );
};

export default OrderSummaryItemLine;
