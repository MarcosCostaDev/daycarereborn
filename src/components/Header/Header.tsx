import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import heroImg from '/images/ads-header.png'
import './Header.scss'

interface HeaderProps {
  onLanguageChange: () => void;
  currentLanguage: string;
}

export const Header = ({ onLanguageChange, currentLanguage }: HeaderProps) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  // Set theme variables as CSS custom properties
  const style = {
    '--section-bg': theme.sectionBg,
    '--text-color': theme.text,
    '--accent-color': theme.accent
  } as React.CSSProperties

  return (
    <header className="header-container" style={style}>
      <button className="language-button" onClick={onLanguageChange}>
        <FontAwesomeIcon icon={faLanguage} />
        {currentLanguage === 'pt' ? t('header.language.en') : t('header.language.pt')}
      </button>
      <img src={heroImg} alt={t('header.title')} className="hero-image" />
    </header>
  )
} 