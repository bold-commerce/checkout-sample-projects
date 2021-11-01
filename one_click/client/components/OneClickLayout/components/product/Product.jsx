import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Price, Details, Image,
} from '@boldcommerce/stacks-ui';
import ProductQuantityInput from '../ProductQuantity/ProductQuantityInput';
import './Product.css';

const Product = ({
  title, image, quantity, lineItemKey, description, onQuantityChange, totalPrice, onRemove, readOnly = false,
}) => (
  <>
    <div className="CartItem__ImageDescriptionWrapper">
      <div className="CartItem__ProductImageWrapper">
        <Image
          title={title}
          alt={title}
          src={image}
        />
      </div>
      <div className="CartItem__ProductDetails">
        <Details
          title={title}
          description={description}
        />
      </div>
    </div>
    <div className="CartItem__QuantityPriceWrapper">
      <div className="CartItem__ProductQuantityWrapper">
        <div className="ProductQuantity">
          {quantity}
        </div>
      </div>
      <div className="CartItem__ProductPrice">
        <Price amount={totalPrice} />
      </div>
    </div>
  </>
);

Product.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  lineItemKey: PropTypes.string.isRequired,
  description: PropTypes.string,
  onQuantityChange: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

export default Product;
