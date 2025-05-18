import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../contexts/ThemeContext'
import type { Theme } from '../../contexts/ThemeContext'
import headerBgImg from '/images/header-bg.png'
import heroImg from '/images/ads-header.png'

const HeaderContainer = styled.header`
  background: url(${headerBgImg});
  background-size: cover;
  background-position: center;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 10px;
  }
`

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    transform: scale(0.9);
  }
`

const LanguageButton = styled.button<{ theme: Theme }>`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.sectionBg};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.2s, color 0.2s;
  z-index: 100;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: #fff;
  }

  @media (max-width: 768px) {
    top: 10px;
    right: 10px;
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`

interface HeaderProps {
  onLanguageChange: () => void;
  currentLanguage: string;
}

export const Header = ({ onLanguageChange, currentLanguage }: HeaderProps) => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <HeaderContainer>
      <LanguageButton onClick={onLanguageChange} theme={theme}>
        <FontAwesomeIcon icon={faLanguage} />
        {currentLanguage === 'pt' ? t('header.language.en') : t('header.language.pt')}
      </LanguageButton>
      <HeroImage src={heroImg} alt={t('header.title')} />
    </HeaderContainer>
  )
} 