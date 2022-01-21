import React from "react";
import TimesCircle from "../Icons/TimesCircle";
import { Price } from "@boldcommerce/stacks-ui/lib";
import { useTranslation } from 'react-i18next';

const SummaryItem = ({ title, value, removeItem }) => {
    const { t } = useTranslation();
    return (    
        <div className="summary-line-child" >
            <div className="summary-child-title">
                { title }
                { removeItem &&
                <button
                    aria-label="remove item"
                    className="summary-child-remove"
                    onClick={() => removeItem(title)}
                >
                    <TimesCircle />
                </button>
                }
            </div>
            <Price className="summary-child-value" amount={value} moneyFormatString={t('currency_format')} />
        </div>
    )
}

export default SummaryItem;