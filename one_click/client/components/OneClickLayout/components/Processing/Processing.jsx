import React from 'react';
import LoadingSpinner from '@boldcommerce/stacks-ui/lib/components/loadingspinner/LoadingSpinner';
import './Processing.scss'

const ProcessingOrder = () => {
    return (
        <div className="processing-page">
            <LoadingSpinner className="processing-spinner" />
            <h1 className="section__title processing-title">
                Processing order...
            </h1>
            <div className="processing-content">
                <p>This may take a few moments. Please remain on the the page until theprocess is complete.</p>
            </div>
        </div>
    )
}

export default ProcessingOrder;