import React, { useContext }  from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { LayoutContext } from '../../context/LayoutContext';
import './Card.scss';

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
  const shippingCard = type === 'shippingCard';

  return (
    <div className={classnames({
      'Card': true,
      'Card--Payment': paymentCard,
      'Card--Shipping': shippingCard
    })}>
      <div className="Card__Title">
        {paymentCard ?
          <button onClick={() => setOpenModal(s => !s) }>{title}</button>
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
          {
            action && action.label && 
            (
              action.onClick ? 
              <button type="button" onClick={action.onClick}>{action.label}</button> :
              action.label              
            )
          }
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
