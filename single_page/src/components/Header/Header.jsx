import React from 'react';
import './Header.css';
import { useTranslation } from 'react-i18next';
import logo from '../../../Logo.png';
import { SelectField } from '../SelectField';

const Header = () => {
  const { t } = useTranslation();
  const websiteName = t("website_name");

  return (
    <div className="Header">
      <img className="Header__Logo" src={logo}/>
      <h1 className="Header__Title">{websiteName}</h1>
      <SelectField className="Header__LanguageSelect" />
    </div>
  )
}

export default Header;