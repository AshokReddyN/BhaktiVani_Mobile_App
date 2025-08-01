import { LanguageType } from '../constants/languages';

export interface Stotra {
  id: string;
  title: string;
  nativeTitle: string;
  language: LanguageType;
  category: StotraCategory;
  author?: string;
  description: string;
  content: string;
  isFavorite: boolean;
  readingProgress: number;
  estimatedReadingTime: number; // in minutes
  lastReadAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type StotraCategory = 
  | 'bhakti' 
  | 'stotra' 
  | 'mantra' 
  | 'sloka' 
  | 'prayer' 
  | 'scripture';

export interface StotraCategoryInfo {
  id: StotraCategory;
  name: string;
  nativeName: string;
  description: string;
  icon: string;
}

export const STOTRA_CATEGORIES: StotraCategoryInfo[] = [
  {
    id: 'bhakti',
    name: 'Bhakti',
    nativeName: 'भक्ति',
    description: 'Devotional hymns and prayers',
    icon: 'heart',
  },
  {
    id: 'stotra',
    name: 'Stotra',
    nativeName: 'स्तोत्र',
    description: 'Hymns of praise',
    icon: 'music-note',
  },
  {
    id: 'mantra',
    name: 'Mantra',
    nativeName: 'मन्त्र',
    description: 'Sacred chants and mantras',
    icon: 'volume-high',
  },
  {
    id: 'sloka',
    name: 'Sloka',
    nativeName: 'श्लोक',
    description: 'Verses from scriptures',
    icon: 'book-open',
  },
  {
    id: 'prayer',
    name: 'Prayer',
    nativeName: 'प्रार्थना',
    description: 'Daily prayers and rituals',
    icon: 'hands-praying',
  },
  {
    id: 'scripture',
    name: 'Scripture',
    nativeName: 'शास्त्र',
    description: 'Sacred texts and scriptures',
    icon: 'book-multiple',
  },
];

export const getCategoryInfo = (category: StotraCategory): StotraCategoryInfo => {
  const categoryInfo = STOTRA_CATEGORIES.find(cat => cat.id === category);
  if (!categoryInfo) {
    throw new Error(`Category ${category} not found`);
  }
  return categoryInfo;
}; 