import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReaderSettings } from '../contexts/ReaderContext';

class StorageService {
  private static instance: StorageService;
  private initialized = false;

  private constructor() {}

  static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    
    try {
      // Initialize storage if needed
      await AsyncStorage.getItem('initialized');
      this.initialized = true;
    } catch (error) {
      console.error('Storage initialization failed:', error);
    }
  }

  // Reader Settings
  async saveReaderSettings(settings: ReaderSettings): Promise<void> {
    try {
      await this.init();
      await AsyncStorage.setItem('readerSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save reader settings:', error);
    }
  }

  async getReaderSettings(): Promise<ReaderSettings | null> {
    try {
      await this.init();
      const settings = await AsyncStorage.getItem('readerSettings');
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Failed to get reader settings:', error);
      return null;
    }
  }

  // Language Settings
  async saveLanguageSettings(language: string): Promise<void> {
    try {
      await this.init();
      await AsyncStorage.setItem('selectedLanguage', language);
    } catch (error) {
      console.error('Failed to save language settings:', error);
    }
  }

  async getLanguageSettings(): Promise<string | null> {
    try {
      await this.init();
      return await AsyncStorage.getItem('selectedLanguage');
    } catch (error) {
      console.error('Failed to get language settings:', error);
      return null;
    }
  }

  // Theme Settings
  async saveThemeSettings(theme: 'light' | 'dark' | 'sepia'): Promise<void> {
    try {
      await this.init();
      await AsyncStorage.setItem('selectedTheme', theme);
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  }

  async getThemeSettings(): Promise<'light' | 'dark' | 'sepia' | null> {
    try {
      await this.init();
      return await AsyncStorage.getItem('selectedTheme') as 'light' | 'dark' | 'sepia' | null;
    } catch (error) {
      console.error('Failed to get theme settings:', error);
      return null;
    }
  }

  // Reading Progress
  async saveReadingProgress(stotraId: string, progress: number): Promise<void> {
    try {
      await this.init();
      const key = `readingProgress_${stotraId}`;
      await AsyncStorage.setItem(key, progress.toString());
    } catch (error) {
      console.error('Failed to save reading progress:', error);
    }
  }

  async getReadingProgress(stotraId: string): Promise<number> {
    try {
      await this.init();
      const key = `readingProgress_${stotraId}`;
      const progress = await AsyncStorage.getItem(key);
      return progress ? parseInt(progress, 10) : 0;
    } catch (error) {
      console.error('Failed to get reading progress:', error);
      return 0;
    }
  }

  // Language-specific Reading Position
  async saveReadingPosition(stotraId: string, language: string, position: number): Promise<void> {
    try {
      await this.init();
      const key = `readingPosition_${language}_${stotraId}`;
      await AsyncStorage.setItem(key, position.toString());
    } catch (error) {
      console.error('Failed to save reading position:', error);
    }
  }

  async getReadingPosition(stotraId: string, language: string): Promise<number> {
    try {
      await this.init();
      const key = `readingPosition_${language}_${stotraId}`;
      const position = await AsyncStorage.getItem(key);
      return position ? parseInt(position, 10) : 0;
    } catch (error) {
      console.error('Failed to get reading position:', error);
      return 0;
    }
  }

  // Get all reading positions for a language
  async getLanguageReadingPositions(language: string): Promise<Record<string, number>> {
    try {
      await this.init();
      const keys = await AsyncStorage.getAllKeys();
      const languagePositionKeys = keys.filter(key => key.startsWith(`readingPosition_${language}_`));
      
      const positions: Record<string, number> = {};
      
      for (const key of languagePositionKeys) {
        const stotraId = key.replace(`readingPosition_${language}_`, '');
        const position = await AsyncStorage.getItem(key);
        if (position) {
          positions[stotraId] = parseInt(position, 10);
        }
      }
      
      return positions;
    } catch (error) {
      console.error('Failed to get language reading positions:', error);
      return {};
    }
  }

  // Favorites
  async saveFavorites(favorites: string[]): Promise<void> {
    try {
      await this.init();
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  }

  async getFavorites(): Promise<string[]> {
    try {
      await this.init();
      const favorites = await AsyncStorage.getItem('favorites');
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Failed to get favorites:', error);
      return [];
    }
  }

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await this.init();
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }
}

export const storageService = StorageService.getInstance(); 