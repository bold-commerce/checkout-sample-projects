import React from 'react';
import PropTypes from 'prop-types';
import { Image } from '@boldcommerce/stacks-ui';
import './Product.css';

const Product = ({
  title, image, variants, children
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
        <div className="stx-details">          
          <div className="stx-details__title">
            {title}
          </div>
          <div className='stx-details__description'>          
            {variants.map((variant, i) => {
              return <div key={i}>{variant}</div>
            })}
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>    
  </>
);

Product.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  variants: PropTypes.array,
};

export default Product;
