import React from 'react';
import PropTypes from 'prop-types';
import Product from '../Product/Product';
import { Price } from '@boldcommerce/stacks-ui'

const LineItem = ({
  title,
  image,
  quantity,
  totalPrice,
  variants,
}) => (
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
        <Price amount={totalPrice} />
      </div>
    </div>
  </div>
);

LineItem.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  quantity: PropTypes.number,
  lineItemKey: PropTypes.string,
  variants: PropTypes.array,
};

export default LineItem;
