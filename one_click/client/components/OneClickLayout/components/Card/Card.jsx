import React  from 'react';
import { Link } from "react-router-dom";
import './Card.scss';

/**
 *
 * @param {{
 *  title?: string;
 *  description?: string;
 *  component?: string;
 *  overview?: string;
 *  action?: {{
 *   label: string;
 *   onClick?: void();
 * }}
 * }} props
 * @returns
 */
const Card = ({title, description, component, overview, action, children}) => {
  return (
    <div className="Card">
      <div className="Card__Title">
        {component ?
          <Link to={component}>{title}</Link>
        : title
        }
      </div>
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
        {children}
      </div>
    </div>
  );
};

export default Card;
