import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

export const colors = {
  primary: {
    light: '#FF6B35',
    dark: '#FF8A65',
  },
  secondary: {
    light: '#4A90E2',
    dark: '#64B5F6',
  },
  background: {
    light: '#FFFFFF',
    dark: '#121212',
  },
  surface: {
    light: '#F5F5F5',
    dark: '#1E1E1E',
  },
  text: {
    light: '#212121',
    dark: '#FFFFFF',
  },
  textSecondary: {
    light: '#757575',
    dark: '#B0B0B0',
  },
  accent: {
    light: '#FFD700',
    dark: '#FFEB3B',
  },
  error: {
    light: '#F44336',
    dark: '#EF5350',
  },
  success: {
    light: '#4CAF50',
    dark: '#66BB6A',
  },
  warning: {
    light: '#FF9800',
    dark: '#FFB74D',
  },
  info: {
    light: '#2196F3',
    dark: '#42A5F5',
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

export const theme = lightTheme; // Default to light theme 