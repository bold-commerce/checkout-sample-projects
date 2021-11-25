import React, { memo, useCallback, useEffect, useState } from 'react';
import { useShippingLines, useLoadingStatus, useErrors, useShippingAddress } from '@boldcommerce/checkout-react-components';
import { LoadingState } from '../LoadingState';
import { ShippingLineList, EmptyShippingLines } from './components';
import { Message } from '@boldcommerce/stacks-ui';
import './ShippingLines.css';
import { useAnalytics, useErrorLogging } from '../../hooks';

const ShippingLines = ({ applicationLoading }) => {
  const { data, updateShippingLine, getShippingLines } = useShippingLines();
  const { data: shippingAddress } = useShippingAddress(); 
  const { data: loadingStatus } = useLoadingStatus();
  const { data: errors } = useErrors();
  const shippingAddressErrors = errors.shippingAddress;
  const selectedCountryCode = shippingAddress?.country_code;
  const shippingAddressLoadingStatus = loadingStatus.shippingAddress;
  const showShippingLines = selectedCountryCode && !shippingAddressErrors && shippingAddressLoadingStatus !== 'incomplete';
  const loading = loadingStatus.shippingAddress === 'setting' || loadingStatus.shippingLines === 'fetching' || applicationLoading;

  return (
    <MemoizedShippingLines
      shippingLines={data.shippingLines}
      selectedShippingLine={data.selectedShippingLineIndex}
      updateShippingLine={updateShippingLine}
      getShippingLines={getShippingLines}
      showShippingLines={showShippingLines}
      appLoading={loading}
    />
  );
};

const MemoizedShippingLines = memo(({
  shippingLines,
  selectedShippingLine,
  updateShippingLine,
  getShippingLines,
  showShippingLines,
  appLoading,
}) => {
  const trackEvent = useAnalytics();
  const logError = useErrorLogging();
  const [shippingLineIndex, setShippingLineIndex] = useState(selectedShippingLine);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshShippingLines = useCallback(async () => {
    if (showShippingLines) {
      try {
        await getShippingLines();
        trackEvent('set_shipping_line');
        setErrors(null);
      } catch(e) {
        logError('shipping_lines', e);
        setErrors(e.body.errors);
      }
    }
  }, [showShippingLines]);

  /** 
   * If this component rendered and shipping address is already selected.
   * This usually means that a shipping address was preselected on the server and therefor we need to fetch shipping lines manually.
   */
  useEffect(() => {
    refreshShippingLines();  
  }, []);

  // Keep local state for selected shipping line in sync with server app state
  useEffect(() => {
    setShippingLineIndex(selectedShippingLine);
  }, [selectedShippingLine]);

  const handleChange = useCallback(async (index) => {
    setShippingLineIndex(index);
    setLoading(true);
    try {
      await updateShippingLine(index);
      setErrors(null);
    } catch(e) {
      // If there was an error, reset the selected shipping line to the previous selected shipping line.
      setShippingLineIndex(selectedShippingLine);
      setErrors(e.body.errors);
    }
    setLoading(false);
  }, []);

  let content = null;

  if (appLoading) {
    content = <LoadingState />;
  } else if (!showShippingLines) {
    content = <EmptyShippingLines title="To view shipping options, complete filling in your address" />;
  } else if (shippingLines.length === 0) {
    content = <EmptyShippingLines title="No available shipping options for your shipping address" />;
  } else {
    content = <ShippingLineList 
      shippingLines={shippingLines}
      selectedShippingLine={shippingLineIndex}
      onChange={handleChange}
      disabled={loading}
    />;
  }

  return (
    <section className="FieldSet FieldSet--ShippingMethod">
      {
        errors && <Message type="alert">{ errors[0].message }</Message>
      }
      <div className="FieldSet__Header">
        <h2 className="FieldSet__Heading">Shipping method</h2>
      </div>
      { content }
    </section>
  );
});

export default ShippingLines;
