import React from 'react';
import PropTypes from 'prop-types';
import {
  Price, Details, Image,
} from '@boldcommerce/stacks-ui';
import './Product.css';

const Product = ({
  title, image, quantity, description, totalPrice,
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
          description={description.map((variant) => {
            return <div>{variant}</div>
          })}
        />
      </div>
    </div>
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
