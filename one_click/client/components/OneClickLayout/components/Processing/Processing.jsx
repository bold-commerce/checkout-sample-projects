import React from 'react';
import LoadingSpinner from '@boldcommerce/stacks-ui/lib/components/loadingspinner/LoadingSpinner';
import './Processing.scss'

const ProcessingOrder = ({}, ref) => {
    return (
        <div ref={ref} className="processing-page">
            <LoadingSpinner className="processing-spinner" />
            <h1 className="section__title processing-title">
                Processing order...
            </h1>
            <div className="processing-content">
                <p>This may take a few moments. Please remain on the the page until the process is complete.</p>
            </div>
        </div>
    )
}

const ProcessingOrderForwardedRef = React.forwardRef(ProcessingOrder);

export default ProcessingOrderForwardedRef;