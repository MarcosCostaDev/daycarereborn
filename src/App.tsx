import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby, faStar, faLanguage, faCheck } from '@fortawesome/free-solid-svg-icons'
import { DiscussionEmbed } from 'disqus-react'
import './i18n/config'
import reviewsData from './data/reviews.json'
// import GoogleAd from './GoogleAd'
import headerImg from '/images/ads-header.png'
import headerBgImg from '/images/header-bg.png'
import { ThemeProvider, useTheme } from './ThemeContext'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'
import type { Theme } from './ThemeContext'

// Add DISQUS type declaration
declare global {
  interface Window {
    DISQUS?: {
      reset: (options: { reload: boolean; config: any }) => void;
    };
  }
}

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

const Header = styled.header`
  background: linear-gradient(135deg, #89CFF0 0%, #FFB6C1 100%), url(${headerBgImg});
  background-blend-mode: overlay;
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

const ThemeToggleButton = styled.button<{ theme: Theme }>`
  position: absolute;
  top: 20px;
  left: 20px;
  background: ${({ theme }) => theme.sectionBg};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.2s, color 0.2s;
  z-index: 100;

  &:hover {
    background: ${({ theme }) => theme.accent};
    color: #fff;
  }

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    padding: 8px;
    font-size: 0.9rem;
  }
`

const Section = styled.section<{ theme: Theme }>`
  margin: 2rem 0;
  padding: 2rem;
  background: ${({ theme }) => theme.sectionBg};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const ReviewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`

const ReviewCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`

const ReviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
  border: 3px solid var(--baby-pink);
`

const StarRating = styled.div`
  color: #FFD700;
  margin: 0.5rem 0;
  display: flex;
  gap: 0.2rem;
`

const ReviewDate = styled.small`
  color: #666;
  margin-top: 0.5rem;
`

const ReviewComment = styled.p`
  margin: 1rem 0;
  line-height: 1.6;
  color: #444;
`

const ReviewName = styled.h3`
  color: var(--baby-blue);
  margin: 0.5rem 0;
`

const HeroSection = styled(Section)<{ theme: Theme }>`
  background: ${({ theme }) => theme.headerBg};
  text-align: center;
  padding: 0;
  box-shadow: none;
  position: relative;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
    transition: transform 0.3s ease;

    @media (max-width: 768px) {
      transform: scale(0.9);
    }
  }
`

const ActivitiesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`

const ActivityItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  backdrop-filter: blur(5px);
  
  svg {
    color: var(--baby-pink);
  }
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

const CommentsSection = styled(Section)`
  margin-top: 3rem;
  text-align: center;
  padding: 2rem;
  background: ${({ theme }) => theme.sectionBg};
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Disqus container styling */
  .disqus-container {
    margin-top: 2rem;
    padding: 1rem;
    background: ${({ theme }) => theme.cardBg};
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  /* Override Disqus default styles */
  iframe {
    border-radius: 10px !important;
    background: ${({ theme }) => theme.cardBg} !important;
  }

  /* Dark theme specific overrides */
  .dark-theme & {
    .disqus-container {
      background: #1a1a1a;
    }

    iframe {
      background: #1a1a1a !important;
    }

    /* Override Disqus dark theme elements */
    :global {
      #disqus_thread {
        background: #1a1a1a !important;
      }

      .dark-theme {
        background: #1a1a1a !important;
        color: #f5f5f5 !important;
      }

      .dark-theme .post-message {
        color: #f5f5f5 !important;
      }

      .dark-theme .post-body {
        color: #f5f5f5 !important;
      }

      .dark-theme .textarea-wrapper textarea {
        background: #2a2a2a !important;
        color: #f5f5f5 !important;
        border-color: #3a3a3a !important;
      }

      .dark-theme .textarea-wrapper textarea:focus {
        border-color: #4a4a4a !important;
      }

      .dark-theme .textarea-wrapper .textarea {
        background: #2a2a2a !important;
        color: #f5f5f5 !important;
      }

      .dark-theme .textarea-wrapper .textarea:focus {
        border-color: #4a4a4a !important;
      }

      .dark-theme .textarea-wrapper .textarea:placeholder {
        color: #888 !important;
      }

      .dark-theme .textarea-wrapper .textarea:focus::placeholder {
        color: #aaa !important;
      }

      .dark-theme .textarea-wrapper .textarea:focus {
        background: #2a2a2a !important;
      }

      .dark-theme .textarea-wrapper .textarea:focus::placeholder {
        color: #aaa !important;
      }

      .dark-theme .textarea-wrapper .textarea:focus::-webkit-input-placeholder {
        color: #aaa !important;
      }

      .dark-theme .textarea-wrapper .textarea:focus::-moz-placeholder {
        color: #aaa !important;
      }

      .dark-theme .textarea-wrapper .textarea:focus:-ms-input-placeholder {
        color: #aaa !important;
      }

      .dark-theme .textarea-wrapper .textarea:focus:-moz-placeholder {
        color: #aaa !important;
      }
    }
  }

  /* Style the description text */
  p {
    color: ${({ theme }) => theme.text};
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`

const CommentsTitle = styled.h2<{ theme: Theme }>`
  color: ${({ theme }) => theme.text};
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
`

function AppContent() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme, isDark } = useTheme()
  const [reviews] = useState(reviewsData.reviews)

  const handleThemeToggle = () => toggleTheme()

  const activities = t('dailyActivities.activities', { returnObjects: true }) as string[]

  const disqusConfig = {
    url: window.location.href,
    identifier: 'daycarereborn',
    title: t('comments.title'),
    language: i18n.language === 'en' ? 'en' : 'pt_BR',
    theme: isDark ? 'dark' : 'light'
  }

  useEffect(() => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: disqusConfig
      });
    }
  }, [i18n.language]);

  return (
    <AppContainer theme={theme}>
      <MainContent>
        <LanguageButton theme={theme} onClick={() => {
          const newLang = i18n.language === 'en' ? 'pt' : 'en'
          i18n.changeLanguage(newLang)
        }}>
          <FontAwesomeIcon icon={faLanguage} />
          {i18n.language === 'en' ? t('language.pt') : t('language.en')}
        </LanguageButton>
        <ThemeToggleButton theme={theme} onClick={handleThemeToggle} title={isDark ? t('theme.light') : t('theme.dark')}>
          {isDark ? '🌙' : '☀️'}
        </ThemeToggleButton>
        <HeroSection theme={theme}>
          <img src={headerImg} alt={t('header.alt')} />
        </HeroSection>

        {/* <GoogleAd /> */}

        <Section theme={theme}>
          <h2>{t('dailyActivities.title')}</h2>
          <ActivitiesList>
            {activities.map((activity: string, index: number) => (
              <ActivityItem key={index}>
                <FontAwesomeIcon icon={faCheck} />
                {activity}
              </ActivityItem>
            ))}
          </ActivitiesList>
        </Section>

        <BenefitsSection theme={theme}>
          <h2>{t('benefits.title')}</h2>
          <h3>{t('benefits.subtitle')}</h3>
          <p>{t('benefits.description')}</p>
        </BenefitsSection>

        <PricingSection theme={theme}>
          <p>{t('pricing.text')}</p>
        </PricingSection>

        <TaglineSection theme={theme}>
          <p>{t('tagline.line1')}</p>
          <p>{t('tagline.line2')}</p>
        </TaglineSection>

        <Section theme={theme}>
          <h2>{t('reviewSection.title')}</h2>
          <ReviewsGrid>
            {reviews.map((review) => (
              <ReviewCard key={review.id}>
                <ReviewImage src={review.image} alt={review.name} />
                <ReviewName>{review.name}</ReviewName>
                <StarRating>
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon 
                      key={i} 
                      icon={faStar} 
                      style={{ opacity: i < review.rating ? 1 : 0.3 }}
                    />
                  ))}
                </StarRating>
                <ReviewComment>{review.comment}</ReviewComment>
                <ReviewDate>{new Date(review.date).toLocaleDateString()}</ReviewDate>
              </ReviewCard>
            ))}
          </ReviewsGrid>
        </Section>

        <CommentsSection theme={theme}>
          <CommentsTitle theme={theme}>{t('comments.title')}</CommentsTitle>
          <p>{t('comments.description')}</p>
          <div className="disqus-container">
            <DiscussionEmbed
              shortname="daycarereborn"
              config={disqusConfig}
            />
          </div>
        </CommentsSection>
      </MainContent>
    </AppContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContentWrapper />
    </ThemeProvider>
  )
}

function AppContentWrapper() {
  const { theme } = useTheme()
  return (
    <EmotionThemeProvider theme={theme}>
      <AppContent />
    </EmotionThemeProvider>
  )
}
