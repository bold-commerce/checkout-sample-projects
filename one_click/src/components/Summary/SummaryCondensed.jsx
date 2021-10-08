import React from "react";
import { useCheckoutStore } from "@boldcommerce/checkout-react-components";
import { ChevronRight } from "../Icons";
import { Price } from "@boldcommerce/stacks-ui/lib";
import { useTranslation } from 'react-i18next';

const SummaryCondensed = ({ onSectionChange }) => {
  const { state } = useCheckoutStore();
  const { t } = useTranslation();

  return (
    <div className="IndexGuest__Summary">
      <button
        className="IndexGuest__Summary__Btn"
        onClick={onSectionChange}
      >
        <ChevronRight className="IndexGuest__Chevron"/>
        <h2>{t('summary.title')}</h2>
        <Price amount={state.applicationState.order_total} moneyFormatString={t('currency_format')} />
      </button>
    </div>
  )
}

export default SummaryCondensed;