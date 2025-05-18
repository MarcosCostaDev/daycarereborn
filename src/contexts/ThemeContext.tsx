import { createContext, useContext, useState, ReactNode } from 'react'
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react'

export interface Theme {
  background: string
  text: string
  sectionBg: string
  headerBg: string
  accent: string
}

const lightTheme: Theme = {
  background: '#f0f8ff',
  text: '#333',
  sectionBg: '#ffffff',
  headerBg: '#ffffff',
  accent: '#89CFF0'
}

const darkTheme: Theme = {
  background: '#1a1a1a',
  text: '#ffffff',
  sectionBg: '#2d2d2d',
  headerBg: '#2d2d2d',
  accent: '#FFB6C1'
}

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDark, setIsDark] = useState(false)
  const theme = isDark ? darkTheme : lightTheme

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <EmotionThemeProvider theme={theme}>
        {children}
      </EmotionThemeProvider>
    </ThemeContext.Provider>
  )
} 