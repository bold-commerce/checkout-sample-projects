import React from 'react';
import PropTypes from 'prop-types';
import LoadingState from '../LoadingState/LoadingState';
import { usePaymentIframe } from '@boldcommerce/checkout-react-components';

const PaymentIframe = ({
  paymentIframeLoadingStatus, paymentIframeUrl, paymentIframeHeight, paymentIframeOnLoaded, hide,
}) => {
  const style = {
    height: `${paymentIframeHeight}px`,
    display: (paymentIframeLoadingStatus === 'fetching' || hide) ? 'none' : '',
  };

  const iframe = (
    <iframe
      title="payments"
      data-bold-pigi-iframe
      src={paymentIframeUrl}
      style={style}
      onLoad={paymentIframeOnLoaded}
    />
  );

  return (
    <>
      { (paymentIframeLoadingStatus === 'fetching' && !hide) && <LoadingState /> }
      { iframe }
    </>
  );
};

PaymentIframe.propTypes = {
  paymentIframeLoadingStatus: PropTypes.string,
  paymentIframeUrl: PropTypes.string,
  paymentIframeHeight: PropTypes.number,
  paymentIframeOnLoaded: PropTypes.func,
  hide: PropTypes.bool,
};

const MemoizedPaymentIframe = React.memo(PaymentIframe);

const PaymentIframeContainer = ({ hide }) => {
  const { data, loadingStatus, paymentIframeOnLoaded } = usePaymentIframe();

  return (
    <MemoizedPaymentIframe
      paymentIframeLoadingStatus={loadingStatus}
      paymentIframeUrl={data.url}
      paymentIframeHeight={data.height}
      paymentIframeOnLoaded={paymentIframeOnLoaded}
      hide={hide}
    />
  );
};

PaymentIframeContainer.propTypes = {
  hide: PropTypes.bool,
};

export default PaymentIframeContainer;
