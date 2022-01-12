import React, { useState } from "react";
import { Price } from "@boldcommerce/stacks-ui/lib";
import { CaretRight } from "../Icons";

const SummaryLine = ({ title, value, items }) => {
    const [hidden, setHidden] = useState(true);
    if (!items || items.length < 1) {
        return (
            <div className="summary-line" >
                <div className="summary-line-head">
                    <div className="summary-line-title">
                        <div className="summary-line-icon"></div>
                        {title}
                    </div>
                    <Price className="summary-line-value" amount={value} />
                </div>
            </div>
        );
    }

    return (
        <div className="summary-line">
            <div className="summary-line-head">
                <button
                    className="summary-btn"
                    id={'summary-line-' + title }
                    onClick={() => {setHidden(!hidden)}}
                >
                    <div className="Accordion-title summary-line-title">
                        <div className="summary-line-icon"
                            style={{ transform : "rotate(" + (hidden ? "0" : "90")+ "deg)" }}
                        >
                            <CaretRight />
                        </div>
                        {title}
                    </div>
                    <Price className="summary-line-value" hidden={!hidden} amount={value} />
                </button>
            </div>
            <div
                className="summary-line-content"
                id={'summary-line-' + title + '-div'}
                role="region"
                aria-labelledby={'summary-line-' + title}
                hidden={hidden}
            >
            {items}
            </div>
        </div>
    );
}

export default SummaryLine;