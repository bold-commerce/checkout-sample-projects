import React from "react";
import { useCheckoutStore } from "@boldcommerce/checkout-react-components";
import { Price } from "@boldcommerce/stacks-ui/lib";
import { useTranslation } from 'react-i18next';
import Card from '../Card';

const SummaryCondensed = ({ handleClick }) => {
  const { state } = useCheckoutStore();
  const { t } = useTranslation();

  return (
    <Card
      title={t('summary.title')}
      handleClick={handleClick}
      component={"/summary"}
      overview={<Price amount={state.applicationState.order_total} moneyFormatString={t('currency_format')} />}
    />
  )
}

export default SummaryCondensed;