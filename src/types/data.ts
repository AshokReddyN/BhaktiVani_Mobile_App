export type LanguageId = 'kannada' | 'sanskrit' | 'telugu';
export type CategoryId = 'stotras' | 'mantras' | 'ashtottaras' | 'vratas';

export interface Language {
  id: LanguageId;
  name: string; // e.g., "ಕನ್ನಡ", "संस्कृतम्", "తెలుగు"
}

export interface Category {
  id: CategoryId;
  name: string; // The name of the category in its respective language
}

export interface Stotra {
  id: string; // A unique ID, e.g., "shiva-tandava-stotram"
  title: string;
  content: string; // The full text of the stotra
  languageId: LanguageId;
  categoryId: CategoryId;
  isFavorite?: boolean;
  lastReadPosition?: number; // To store the scroll position
}
