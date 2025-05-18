import { createContext, useContext, useState, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

interface LanguageContextType {
  currentLanguage: string
  changeLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || 'pt')

  const changeLanguage = () => {
    const newLang = currentLanguage === 'pt' ? 'en' : 'pt'
    i18n.changeLanguage(newLang)
    setCurrentLanguage(newLang)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
} 