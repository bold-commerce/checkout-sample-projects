import i18n from 'i18next';
import enTranslation from './en/translation.json';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
      skipOnVariables: true //needed to escape currency_format curly braces
    }
  });

export default i18n; 