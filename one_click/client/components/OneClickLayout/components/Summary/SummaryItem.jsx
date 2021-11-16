import React from "react";
import TimesCircle from "../Icons/TimesCirlce";
import { Price } from "@boldcommerce/stacks-ui/lib";

const SummaryItem = ({ title, value, removable, removeItem }) => {
    return (    
        <div className="summary-line-child" >
            <div className="summary-child-title">
                { title }
                { removable &&
                <button
                    className="summary-child-remove"
                    onClick={() => removeItem(title)}
                >
                    <TimesCircle />
                </button>
                }
            </div>
            <Price className="summary-child-value" amount={value} />
        </div>
    )
}

export default SummaryItem;