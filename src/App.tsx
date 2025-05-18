import { useTranslation } from 'react-i18next'
import { DiscussionEmbed } from 'disqus-react'
import './i18n/config'
import './App.css'
import reviewsData from './data/reviews.json'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import { Header } from './components/Header/Header'
import { Reviews } from './components/Reviews/Reviews'
import { Activities } from './components/Activities/Activities'
import { Careers } from './components/Careers/Careers'
import { activities } from './constants/activities'

function AppContent() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { currentLanguage, changeLanguage } = useLanguage()

  // Set theme variables as CSS custom properties
  const style = {
    '--text-color': theme.text,
    '--background-color': theme.background,
    '--section-bg': theme.sectionBg
  } as React.CSSProperties

  return (
    <div className="app-container" style={style}>
      <Header onLanguageChange={changeLanguage} currentLanguage={currentLanguage} />
      <div className="main-content">
        <section className="section benefits-section">
          <h2>{t('benefits.title')}</h2>
          <h3>{t('benefits.subtitle')}</h3>
          <p>{t('benefits.description')}</p>
          <Activities activities={activities} />
        </section>

        <section className="section pricing-section">
          <h2>{t('pricing.title')}</h2>
          <p>{t('pricing.description')}</p>
        </section>

        <section className="section">
          <h2>{t('reviews.title')}</h2>
          <h3>{t('reviews.subtitle')}</h3>
          <Reviews reviews={reviewsData.reviews} />
        </section>

        <section className="section tagline-section">
          <p>{t('tagline')}</p>
        </section>

        <section className="section">
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
        </section>

        <Careers />
      </div>
    </div>
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
