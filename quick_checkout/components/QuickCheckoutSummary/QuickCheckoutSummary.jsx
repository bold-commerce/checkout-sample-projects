import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Price,
} from '@boldcommerce/stacks-ui';
import useDiscount from '../../hooks/useDiscount';
import DollarCircleOutline from '../dollar_circle_outline/DollarCircleOutline';
import useBreakdown from '../../hooks/useBreakdown';
import './QuickCheckoutSummary.css';


const QuickCheckoutSummary = ({ open, setOpen, isMobile, setIsMobile, summaryAccordion, total, totalItems }) => {
  const { discountApplied } = useDiscount();

  useEffect(() => {
    let resize;
    window.addEventListener('resize', resize = () => {
      setIsMobile(window.innerWidth < 900);
    });

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);


  useEffect(() =>{
    if (!isMobile) {
      setOpen(false);
    }
  },[isMobile]);

  return (
    <>
      {summaryAccordion}
      {isMobile
      && (
          <div className="SummaryBlock Summary__Total" onClick={() => setOpen(!open)}>
              <div className="SummaryBlockLeft">
                  <div className="Summay__Total--Title">Summary</div>
                  <span className="SummaryItem__Label">{totalItems} item(s)</span>
              </div>
              <div className="SummaryItem__Value SummaryBlockRight">
                <div className="SummaryBlockRight__PriceWrapper">
                  <Price amount={total} />
                  { discountApplied && (<div className="SummaryBlockRight__DiscountWrapper"><DollarCircleOutline/> <span className="SummaryItem__Label">&nbsp;Discounts applied</span></div>) }
                </div>
                <div className={open ? "ChevronWrapper--Down" : "ChevronWrapper--Up"}>
                  { open ? (<div className="ChevronDown"></div>) : (<div className="ChevronUp"></div>) }
                </div>
              </div>
          </div>
      )}
    </>
  );
};

QuickCheckoutSummary.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  isMobile: PropTypes.bool,
  setIsMobile: PropTypes.func,
  summaryAccordion: PropTypes.object,
  totalItems: PropTypes.number,
  totalItems: PropTypes.number,
};

const MemoizedQuickCheckoutSummary = React.memo(QuickCheckoutSummary);

const QuickCheckoutSummaryContainer = ({ open, setOpen, isMobile, setIsMobile, summaryAccordion }) => {
  const { total, totalItems } = useBreakdown();

  return (
    <MemoizedQuickCheckoutSummary
      open={open}
      setOpen={setOpen}
      isMobile={isMobile}
      setIsMobile={setIsMobile}
      total={total}
      totalItems={totalItems}
      summaryAccordion={summaryAccordion}
    />
  )
};

QuickCheckoutSummaryContainer.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  isMobile: PropTypes.bool,
  setIsMobile: PropTypes.func,
  summaryAccordion: PropTypes.object,
};

export default QuickCheckoutSummaryContainer;