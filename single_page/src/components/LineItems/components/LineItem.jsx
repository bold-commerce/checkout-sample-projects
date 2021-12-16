import React from 'react';
import PropTypes from 'prop-types';
import { Button, Price, Details, Image } from '@boldcommerce/stacks-ui';
import { SoldOut } from '../../Icons'
import LineItemQuantity from './LineItemQuantity';
import LineItemInventoryAdjustment from './LineItemInventoryAdjustment';
import { useTranslation } from 'react-i18next';

const LineItem = ({
  title,
  image,
  quantity,
  originalQuantity,
  totalPrice,
  lineItemKey,
  description,
  onChange,
  onRemove,
  readOnly = false,
}) => {
  const { t } = useTranslation();
  return (
  <div className="LineItem" key={lineItemKey}>
    <div className="LineItem__ImageDescriptionWrapper">
      <div className="LineItem__ProductImageWrapper">
        <Image
          title={title}
          alt={title}
          src={image}
        />
      </div>
      <div className="LineItem__ProductDetails">
        <Details
          title={title}
          description={description}
        />
        { !readOnly && (
          <Button
            secondary
            onClick={() => onRemove(lineItemKey)}
          >
            {t('line_item.remove')}
          </Button>
        )}
      </div>
    </div>
    <div className="LineItem__QuantityPriceWrapper">
      {
        originalQuantity ? (
          quantity > 0 ? (
            <LineItemInventoryAdjustment
            originalQuantity={originalQuantity}
            quantity={quantity}
            readOnly={readOnly}
            /> 
          ) : ( 
            <SoldOut />
          )
        ) : (
          <LineItemQuantity
            readOnly={readOnly}
            defaultValue={quantity}
            onChange={(value) => onChange(lineItemKey, value)}
          />
        )
      }
      <div className="LineItem__ProductPrice">
        <Price amount={totalPrice} />
      </div>
    </div>
  </div>
)};

LineItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  quantity: PropTypes.number,
  price: PropTypes.number,
  totalPrice: PropTypes.number,
  lineItemKey: PropTypes.string,
  description: PropTypes.string,
  onQuantityChange: PropTypes.func,
  onRemove: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default LineItem;
