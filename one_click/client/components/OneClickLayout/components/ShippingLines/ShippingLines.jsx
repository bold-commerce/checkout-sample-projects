/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import RadioField from '@boldcommerce/stacks-ui/lib/components/radiofield/RadioField';
import { Price } from '@boldcommerce/stacks-ui';
import EmptyState from '../EmptyState/EmptyState';
import LoadingState from '../LoadingState/LoadingState';
import { useShippingLines } from '@boldcommerce/checkout-react-components';
import './ShippingLines.css';

export const ShippingLines = ({
  showShippingLines, shippingLinesFetching, shippingLinesLoadingStatus, shippingLines, selectedShippingLineIndex, setSelectedShippingLine,
}) => {
  if (!showShippingLines) {
    return (
      <section className="FieldSet FieldSet--ShippingMethod">
        <div className="FieldSet__Header">
          <h3 className="FieldSet__Heading">Shipping method</h3>
        </div>
        <div className="FieldSet__Content"><EmptyState title="To view shipping options, complete filling in your address" /></div>
      </section>
    );
  }

  return (
    <section className="FieldSet FieldSet--ShippingMethod">
      <div className="FieldSet__Header">
        <div className="FieldSet__Heading">Shipping method</div>
      </div>
      {
        shippingLinesFetching ? <LoadingState />
          : (
            <div className="FieldSet__Content">
              {shippingLines && shippingLines.map((method, index) => (
                <div className="RadioButton" key={index}>
                  <RadioField
                    label={method.description}
                    name="shipping-method"
                    checked={selectedShippingLineIndex === parseInt(method.id, 10)}
                    className="RadioField"
                    disabled={shippingLinesLoadingStatus === 'setting'}
                    onChange={() => setSelectedShippingLine(index)}
                  />
                  <Price className="ShippingMethod__Price" amount={method.amount} />
                </div>
              ))}
            </div>
          )
      }
    </section>
  );
};

ShippingLines.propTypes = {
  showShippingLines: PropTypes.bool,
  shippingLinesFetching: PropTypes.bool,
  shippingLinesLoadingStatus: PropTypes.string,
  shippingLines: PropTypes.array,
  selectedShippingLineIndex: PropTypes.number,
  setSelectedShippingLine: PropTypes.func,
};

const MemoizedShippingLines = React.memo(ShippingLines);

const ShippingLinesContainer = () => {
  const {
    showShippingLines, shippingLinesFetching, shippingLinesLoadingStatus, shippingLines, selectedShippingLineIndex, setSelectedShippingLine,
  } = useShippingLines();

  return (
    <MemoizedShippingLines
      showShippingLines={showShippingLines}
      shippingLinesFetching={shippingLinesFetching}
      shippingLinesLoadingStatus={shippingLinesLoadingStatus}
      shippingLines={shippingLines}
      selectedShippingLineIndex={selectedShippingLineIndex}
      setSelectedShippingLine={setSelectedShippingLine}
    />
  );
};

export default ShippingLinesContainer;
