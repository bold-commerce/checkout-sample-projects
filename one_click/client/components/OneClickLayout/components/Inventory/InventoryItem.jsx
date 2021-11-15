import React from "react";
import PropTypes from 'prop-types';
import { Details, Image } from "@boldcommerce/stacks-ui/lib";
import './Inventory.css'

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
                        <div className="ProductQuantity"> 
                            {orderQty} 
                        </div>
                        <div className="Arrow" style={{padding:'5'}}>→</div>
                        <div className="ProductQuantity">
                            {stockQty}
                        </div>
                    </>
                }
            </div>
        </div>
        <div className="InventoryItem__RemoveItemWrapper">
            {stockQty !== 0 &&
            <button className="InventoryItem__RemoveItem" onClick={onRemove}>X</button>
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