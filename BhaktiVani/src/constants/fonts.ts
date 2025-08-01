import { Platform } from 'react-native';

export interface FontConfig {
  family: string;
  weight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';
  style?: 'normal' | 'italic';
}

export interface ReaderFonts {
  kannada: FontConfig;
  sanskrit: FontConfig;
  telugu: FontConfig;
  english: FontConfig;
}

// Font configurations optimized for Indian scripts
export const readerFonts: ReaderFonts = {
  kannada: {
    family: Platform.OS === 'ios' ? 'Noto Serif Kannada' : 'NotoSerifKannada-Regular',
    weight: 'normal',
  },
  sanskrit: {
    family: Platform.OS === 'ios' ? 'Noto Serif Devanagari' : 'NotoSerifDevanagari-Regular',
    weight: 'normal',
  },
  telugu: {
    family: Platform.OS === 'ios' ? 'Noto Serif Telugu' : 'NotoSerifTelugu-Regular',
    weight: 'normal',
  },
  english: {
    family: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    weight: 'normal',
  },
};

export const getFontForLanguage = (language: string): FontConfig => {
  switch (language) {
    case 'kannada':
      return readerFonts.kannada;
    case 'sanskrit':
      return readerFonts.sanskrit;
    case 'telugu':
      return readerFonts.telugu;
    default:
      return readerFonts.english;
  }
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
};

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2.0,
};

export const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 2,
}; 