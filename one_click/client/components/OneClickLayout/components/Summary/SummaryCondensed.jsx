import React from "react";
import { useCheckoutStore } from "@boldcommerce/checkout-react-components";
import { ChevronRight } from "../Icons";
import { Price } from "@boldcommerce/stacks-ui/lib";

const SummaryCondensed = ({ onSectionChange }) => {
  const { state } = useCheckoutStore();

  return (
    <div className="IndexGuest__Summary">
      <button
        className="IndexGuest__Summary__Btn"
        onClick={() => onSectionChange('summary')}
      >
        <ChevronRight className="IndexGuest__Chevron"/>
        <h2>Summary</h2>
        <Price amount={state.applicationState.order_total} />
      </button>
    </div>
  )
}

export default SummaryCondensed;