import React from 'react';
import { useLineItems, useBreakdown } from '@boldcommerce/checkout-react-components';
import { Price } from '@boldcommerce/stacks-ui';
import { ChevronIcon } from '../../Icons';
import { useTranslation } from 'react-i18next';

const OrderSummaryCollapseButton = ({ onClick, summaryOpen }) => {
  const { data } = useBreakdown();
  const { t } = useTranslation();
  const { total } = data;

  return (
    <button type="button" className="CollapseButton" onClick={onClick} aria-controls="OrderSummary">
      <span className="CollapseButton__title">
        <ChevronIcon />
        {t('summary.title')}
      </span>
      <span className="CollapseButton__description">
        <Price amount={total} moneyFormatString={t('currency_format')}/>
      </span>
    </button>
  );
};

export default OrderSummaryCollapseButton;
