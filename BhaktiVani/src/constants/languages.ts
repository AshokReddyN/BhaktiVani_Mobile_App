export type LanguageType = 'kannada' | 'sanskrit' | 'telugu';

export interface Language {
  id: LanguageType;
  name: string;
  nativeName: string;
  code: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    id: 'kannada',
    name: 'Kannada',
    nativeName: 'ಕನ್ನಡ',
    code: 'kn',
    flag: '🇮🇳',
  },
  {
    id: 'sanskrit',
    name: 'Sanskrit',
    nativeName: 'संस्कृतम्',
    code: 'sa',
    flag: '🇮🇳',
  },
  {
    id: 'telugu',
    name: 'Telugu',
    nativeName: 'తెలుగు',
    code: 'te',
    flag: '🇮🇳',
  },
];

export const getLanguageById = (id: LanguageType): Language => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.id === id);
  if (!language) {
    throw new Error(`Language with id ${id} not found`);
  }
  return language;
};

export const getLanguageByCode = (code: string): Language => {
  const language = SUPPORTED_LANGUAGES.find(lang => lang.code === code);
  if (!language) {
    throw new Error(`Language with code ${code} not found`);
  }
  return language;
}; 