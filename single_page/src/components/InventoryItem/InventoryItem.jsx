import React from "react";
import PropTypes from 'prop-types';
import { Product } from '../Product';
import { ArrowRightIcon, RemoveIcon } from "../Icons";
import './InventoryItem.css'

const InventoryItem = ({
  title, variants, orderQty, stockQty, onRemove, image
}) => (
  <div className="SummaryBlock InventoryItem" >
    <Product
      title={title}
      image={image}
      variants={variants}
    />
    <div className="InventoryItem__Wrapper">
      <div className="InventoryItem__RemoveItemWrapper">
        {stockQty !== 0 &&
        <button 
          aria-label="remove item"
          className="InventoryItem__RemoveItem" 
          onClick={onRemove}
        >
          <RemoveIcon />
        </button>
        }
      </div>
      <div className="InventoryItem__ProductQuantityWrapper">
      {
        stockQty === 0 ?
        <div className="SoldOut">Sold Out</div> :
        <>                        
          <div aria-label="ordered quantity" className="ProductQuantity"> 
            {orderQty} 
          </div>
          <div className="Arrow"> 
            <ArrowRightIcon />
          </div>
          <div aria-label="available quantity" className="ProductQuantity">
            {stockQty}
          </div>
        </>
      }
      </div>
    </div>
  </div>
);

InventoryItem.propTypes ={
    title: PropTypes.string.isRequired,
    variants: PropTypes.array,
    orderQty: PropTypes.number.isRequired,
    stockQty: PropTypes.number.isRequired,
    onRemove: PropTypes.func,
    image: PropTypes.string,
};

export default InventoryItem;