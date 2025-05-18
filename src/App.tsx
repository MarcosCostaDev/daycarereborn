import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import { DiscussionEmbed } from 'disqus-react'
import './i18n/config'
import reviewsData from './data/reviews.json'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import type { Theme } from './contexts/ThemeContext'
import { Header } from './components/Header/Header'
import { Reviews } from './components/Reviews/Reviews'
import { Activities } from './components/Activities/Activities'
import { activities } from './constants/activities'

const AppContainer = styled.div<{ theme: Theme }>`
  font-family: 'Comic Sans MS', 'Bubblegum Sans', cursive;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  width: 100vw;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
`

const Section = styled.section<{ theme: Theme }>`
  margin: 2rem 0;
  padding: 2rem;
  background: ${({ theme }) => theme.sectionBg};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const BenefitsSection = styled(Section)`
  background: white;
  text-align: center;
`

const PricingSection = styled(Section)`
  background: var(--baby-blue);
  color: white;
  text-align: center;
  font-size: 1.2rem;
`

const TaglineSection = styled(Section)`
  background: var(--baby-pink);
  color: white;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`

function AppContent() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { currentLanguage, changeLanguage } = useLanguage()

  return (
    <AppContainer theme={theme}>
      <Header onLanguageChange={changeLanguage} currentLanguage={currentLanguage} />
      <MainContent>
        <BenefitsSection theme={theme}>
          <h2>{t('benefits.title')}</h2>
          <h3>{t('benefits.subtitle')}</h3>
          <p>{t('benefits.description')}</p>
          <Activities activities={activities} />
        </BenefitsSection>

        <PricingSection theme={theme}>
          <h2>{t('pricing.title')}</h2>
          <p>{t('pricing.description')}</p>
        </PricingSection>

        <Section theme={theme}>
          <h2>{t('reviews.title')}</h2>
          <h3>{t('reviews.subtitle')}</h3>
          <Reviews reviews={reviewsData.reviews} />
        </Section>

        <TaglineSection theme={theme}>
          <p>{t('tagline')}</p>
        </TaglineSection>

        <Section theme={theme}>
          <h2>{t('discussion.title')}</h2>
          <p>{t('discussion.description')}</p>
          <DiscussionEmbed
            shortname="daycarereborn"
            config={{
              url: window.location.href,
              identifier: 'daycarereborn',
              title: t('header.title')
            }}
          />
        </Section>
      </MainContent>
    </AppContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}
