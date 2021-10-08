import React from 'react';
import LoadingSpinner from '@boldcommerce/stacks-ui/lib/components/loadingspinner/LoadingSpinner';
import './Processing.scss'
import { useTranslation } from 'react-i18next';

const ProcessingOrder = ({}, ref) => {
    const { t } = useTranslation();
    return (
        <div ref={ref} className="processing-page">
            <LoadingSpinner className="processing-spinner" />
            <h1 className="section__title processing-title">
                {t('processing.order')}
            </h1>
            <div className="processing-content">
                <p>{t('processing.description')}</p>
            </div>
        </div>
    )
}

const ProcessingOrderForwardedRef = React.forwardRef(ProcessingOrder);

export default ProcessingOrderForwardedRef;