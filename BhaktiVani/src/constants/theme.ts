import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { storageService } from '../services/storageService';

export const colors = {
  primary: {
    light: '#FF6B35',
    dark: '#FF8A65',
    sepia: '#A97142',
    highContrast: '#FF0000',
  },
  secondary: {
    light: '#4A90E2',
    dark: '#64B5F6',
    sepia: '#C9A66B',
    highContrast: '#00FF00',
  },
  background: {
    light: '#FFFFFF',
    dark: '#121212',
    sepia: '#F4ECD8',
    highContrast: '#000000',
  },
  surface: {
    light: '#F5F5F5',
    dark: '#1E1E1E',
    sepia: '#E9DFCA',
    highContrast: '#000000',
  },
  text: {
    light: '#212121',
    dark: '#FFFFFF',
    sepia: '#5B4636',
    highContrast: '#FFFFFF',
  },
  textSecondary: {
    light: '#757575',
    dark: '#B0B0B0',
    sepia: '#A97142',
    highContrast: '#FFFFFF',
  },
  accent: {
    light: '#FFD700',
    dark: '#FFEB3B',
    sepia: '#FFD180',
    highContrast: '#FFFF00',
  },
  error: {
    light: '#F44336',
    dark: '#EF5350',
    sepia: '#B85C38',
    highContrast: '#FF0000',
  },
  success: {
    light: '#4CAF50',
    dark: '#66BB6A',
    sepia: '#A3B18A',
    highContrast: '#00FF00',
  },
  warning: {
    light: '#FF9800',
    dark: '#FFB74D',
    sepia: '#FFB74D',
    highContrast: '#FFFF00',
  },
  info: {
    light: '#2196F3',
    dark: '#42A5F5',
    sepia: '#A1C6EA',
    highContrast: '#00FFFF',
  },
};

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    light: 'System',
    thin: 'System',
  },
  fontSize: {
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
    body1: 16,
    body2: 14,
    caption: 12,
    overline: 10,
  },
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 50,
};

export const shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6.27,
    elevation: 8,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10.32,
    elevation: 12,
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.light,
    secondary: colors.secondary.light,
    background: colors.background.light,
    surface: colors.surface.light,
    text: colors.text.light,
    onSurface: colors.text.light,
    onBackground: colors.text.light,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary.dark,
    secondary: colors.secondary.dark,
    background: colors.background.dark,
    surface: colors.surface.dark,
    text: colors.text.dark,
    onSurface: colors.text.dark,
    onBackground: colors.text.dark,
  },
};

export const sepiaTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary.sepia,
    secondary: colors.secondary.sepia,
    background: colors.background.sepia,
    surface: colors.surface.sepia,
    text: colors.text.sepia,
    onSurface: colors.text.sepia,
    onBackground: colors.text.sepia,
    accent: colors.accent.sepia,
  },
};

export const highContrastTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: colors.primary.highContrast,
    secondary: colors.secondary.highContrast,
    background: colors.background.highContrast,
    surface: colors.surface.highContrast,
    text: colors.text.highContrast,
    onSurface: colors.text.highContrast,
    onBackground: colors.text.highContrast,
    accent: colors.accent.highContrast,
    error: colors.error.highContrast,
    success: colors.success.highContrast,
    warning: colors.warning.highContrast,
    info: colors.info.highContrast,
  },
};

// Theme Context
type ThemeType = 'light' | 'dark' | 'sepia' | 'highContrast';

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (mode: ThemeType) => void;
  toggleTheme: () => void;
  isDark: boolean;
  isSepia: boolean;
  isHighContrast: boolean;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeType>('light');
  const [isLoading, setIsLoading] = useState(true);

  // Load theme settings from storage on mount
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const savedTheme = await storageService.getThemeSettings();
        if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'sepia' || savedTheme === 'highContrast') {
          setThemeState(savedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemeSettings();
  }, []);

  const setTheme = async (mode: ThemeType) => {
    setThemeState(mode);
    
    // Save to storage
    try {
      await storageService.saveThemeSettings(mode);
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  };

  // Cycles through light -> dark -> sepia -> highContrast -> light
  const toggleTheme = async () => {
    let newTheme: ThemeType;
    if (theme === 'light') newTheme = 'dark';
    else if (theme === 'dark') newTheme = 'sepia';
    else if (theme === 'sepia') newTheme = 'highContrast';
    else newTheme = 'light';
    await setTheme(newTheme);
  };

  const isDark = theme === 'dark';
  const isSepia = theme === 'sepia';
  const isHighContrast = theme === 'highContrast';

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark,
    isSepia,
    isHighContrast,
    isLoading,
  };

  return React.createElement(ThemeContext.Provider, { value }, children);
};

export const getCurrentTheme = (theme: ThemeType, isHighContrastEnabled: boolean = false) => {
  // If high contrast is enabled, use high contrast theme regardless of base theme
  if (isHighContrastEnabled) {
    return highContrastTheme;
  }
  
  if (theme === 'dark') return darkTheme;
  if (theme === 'sepia') return sepiaTheme;
  if (theme === 'highContrast') return highContrastTheme;
  return lightTheme;
}; 