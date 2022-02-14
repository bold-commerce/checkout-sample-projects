import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import { Price } from '@boldcommerce/stacks-ui';
import { useTranslation } from 'react-i18next';

const LineItem = ({
  title,
  image,
  quantity,
  totalPrice,
  variants
}) => {
  const { t } = useTranslation();
  return(
    <div className="SummaryBlock CartItem" >
      <Product
        title={title}
        image={image}
        variants={variants}
      />
      <div className="CartItem__QuantityPriceWrapper">
        <div className="CartItem__ProductQuantityWrapper">
          <div className="ProductQuantity" aria-label="product quantity">
            {quantity}
          </div>
        </div>
        <div className="CartItem__ProductPrice">
          <Price amount={totalPrice} moneyFormatString={t('currency_format')} />
        </div>
      </div>
    </div>
  );}
  
  LineItem.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
    quantity: PropTypes.number,
    lineItemKey: PropTypes.string,
    variants: PropTypes.array,
  };
  
  export default LineItem;