import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../contexts/LanguageContext';

export const useLocalization = () => {
  const { t } = useTranslation();
  const { selectedLanguage, setSelectedLanguage, currentLanguage } = useLanguageContext();

  return {
    t,
    selectedLanguage,
    setSelectedLanguage,
    currentLanguage,
  };
}; 