import React from "react";
import PropTypes from 'prop-types';
import { Details, Image } from "@boldcommerce/stacks-ui/lib";
import './Inventory.css'
import { ArrowRight, TimesCircle } from "../Icons";

const InventoryItem = ({
    title, description, orderQty, stockQty, onRemove, image
}) => (
    <div className="SummaryBlock InventoryItem" >
        <div className="InventoryItem__ProductImageWrapper">
            <Image
                title={title}
                alt={title}
                src={image}
            />
        </div>
        <div className="InventoryItem__ProductDetails">
            <Details
                title={title}
                description={description}
            />
            <div className="InventoryItem__ProductQuantityWrapper">
                {
                    stockQty === 0 ?
                    <div className="SoldOut">Sold Out</div> :
                    <>                        
                        <div aria-label="ordered quantity" className="ProductQuantity"> 
                            {orderQty} 
                        </div>
                        <div 
                            className="Arrow"
                        >
                            <ArrowRight />
                        </div>
                        <div aria-label="available quantity" className="ProductQuantity">
                            {stockQty}
                        </div>
                    </>
                }
            </div>
        </div>
        <div className="InventoryItem__RemoveItemWrapper">
            {stockQty !== 0 &&
            <button 
                aria-label="remove item"
                className="InventoryItem__RemoveItem" 
                onClick={onRemove}
            >
                <TimesCircle />
            </button>
            }
        </div>
    </div>
);

InventoryItem.propTypes ={
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    orderQty: PropTypes.number.isRequired,
    stockQty: PropTypes.number.isRequired,
    onRemove: PropTypes.func,
    image: PropTypes.string,
};

export default InventoryItem;