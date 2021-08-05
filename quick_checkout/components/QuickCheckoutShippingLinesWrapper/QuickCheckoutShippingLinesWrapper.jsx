import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@boldcommerce/stacks-ui';
import { ShippingLines } from '../shipping_lines';
import { useShippingLines } from '../../hooks';
import { useEffect } from 'react';
import './QuickCheckoutShippingLinesWrapper.css';

const QuickCheckoutShippingLinesWrapper = ({ onIncrementStep, nextButtonText, isLoggedIn }) => {
  
  const { showShippingLines, selectedShippingLineIndex, shippingLinesLoadingStatus, shippingLinesFetching, getShippingLines } = useShippingLines();
  const showLoadingShippingLine = shippingLinesFetching && shippingLinesLoadingStatus != 'setting';

  // Needs to make call to get shipping lines if user is logged in because the shipping address will already be set in application state
  useEffect(() => {
    if ( showShippingLines && isLoggedIn && !selectedShippingLineIndex ) {
      getShippingLines(); 
    }
  },[]);

  const tryStepIncrement = () => {
    if (showShippingLines) {
      onIncrementStep();
    }
  };

  return (
    <>
      <ShippingLines />
      { showShippingLines && (
        <Button className="CheckoutStep__NextBtn" onClick={() => tryStepIncrement()} disabled={ selectedShippingLineIndex == NaN  || shippingLinesLoadingStatus === 'setting' } loading={ showLoadingShippingLine } >{nextButtonText}</Button>
      )
      
      }
    </>
  );

};

QuickCheckoutShippingLinesWrapper.propTypes = {
  onIncrementStep: PropTypes.func,
  nextButtonText: PropTypes.string,
};

export default React.memo(QuickCheckoutShippingLinesWrapper);