import React, { useContext }  from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { PaymentMethod } from '../Payment';
import classnames from 'classnames';
import './Card.scss';
import { LayoutContext } from '../../context/LayoutContext';

/**
 *
 * @param {{
 *  title?: string;
 *  description?: string;
 *  component?: string;
 *  overview?: node;
 *  childComponent?: string;
 *  action?: {{
 *   label: string;
 *   onClick?: void();
 * }}
 * type?: string;
 * }} props
 * @returns
 */
const Card = ({title, description, handleClick, overview, action, children, type}) => {

  const {openModal, setOpenModal} = useContext(LayoutContext);
  const paymentCard = type === 'paymentCard';

  return (
    <div className={classnames({
      'Card': true,
      'Card--Payment': paymentCard,
    })}>
      <div className="Card__Title">
        {paymentCard ?
          <span onClick={() => setOpenModal(s => !s) }>{title}</span>
        : (title ? <button type="button" onClick={handleClick}>{title}</button> : null)
        }
      </div>
      {(!paymentCard || !openModal) && (
      <>
        <div className="Card__Overview">
          {overview}
        </div>
        <div className="Card__Description">
          {description}
        </div>
        <div className="Card__Action">
          {action && action.label && (action.label)}
        </div>
        <div className="Card__Content">
          <div>{children}</div>
        </div>
      </>)}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  onChangeSection: PropTypes.func,
  overview: PropTypes.node,
  description: PropTypes.string,
  action: PropTypes.shape({
    label: PropTypes.string,
    onClick: PropTypes.func
  })
};

export default Card;
