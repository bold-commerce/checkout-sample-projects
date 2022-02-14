import React, { useCallback } from 'react';
import './Header.css';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/config';
import logo from '../../../Logo.png';
import { SelectField } from '../SelectField';

const Header = () => {
  const { t } = useTranslation();
  const selectedLanguage = i18n.language;
  const languageList = Object.keys(i18n.services.resourceStore.data).map((language) => <option value={language} key={language}>{t(`languages.${language}`)}</option>);
  const websiteName = t("website_name");

  const changeLanguage = useCallback((e) => {
    i18n.changeLanguage(e.target.value)
  }, [])

  return (
    <div className="Header">
      <img className="Header__Logo" src={logo}/>
      <h1 className="Header__Title">{websiteName}</h1>
      <SelectField className="Header__LanguageSelect" 
        value={selectedLanguage}
        onChange={changeLanguage}>
        {languageList}
      </SelectField>
    </div>
  )
}

export default Header;