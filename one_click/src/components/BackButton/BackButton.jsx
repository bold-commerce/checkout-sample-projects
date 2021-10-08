import React from 'react';
import './BackButton.css';
import { useTranslation } from 'react-i18next';

const BackButton = ({ onClick }) => {
  const { t } = useTranslation();
  return (
    <div>
      <button className="back-btn" type="button" onClick={onClick}>{t('back')}</button>
    </div>
  );
};

export default BackButton;
