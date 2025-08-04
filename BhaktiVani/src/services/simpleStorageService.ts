import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stotra } from '../types/stotra';
import { LanguageType } from '../constants/languages';
import { mockStotras } from '../data/mockStotras';

class SimpleStorageService {
  private static instance: SimpleStorageService;

  private constructor() {}

  static getInstance(): SimpleStorageService {
    if (!SimpleStorageService.instance) {
      SimpleStorageService.instance = new SimpleStorageService();
    }
    return SimpleStorageService.instance;
  }

  /**
   * Initialize the storage service
   */
  async init(): Promise<void> {
    try {
      // Test storage access
      await AsyncStorage.setItem('test', 'test');
      await AsyncStorage.removeItem('test');
      console.log('Simple storage service initialized successfully');
    } catch (error) {
      console.error('Simple storage initialization failed:', error);
      throw error;
    }
  }

  /**
   * Store a stotra in storage
   */
  async storeStotra(stotra: Stotra): Promise<void> {
    try {
      const key = `stotra_${stotra.id}`;
      await AsyncStorage.setItem(key, JSON.stringify(stotra));
    } catch (error) {
      console.error('Error storing stotra:', error);
      throw error;
    }
  }

  /**
   * Store multiple stotras in storage
   */
  async storeStotras(stotras: Stotra[]): Promise<void> {
    for (const stotra of stotras) {
      await this.storeStotra(stotra);
    }
  }

  /**
   * Get all stotras for a specific language
   */
  async getStotrasByLanguage(language: LanguageType): Promise<Stotra[]> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stotraKeys = keys.filter(key => key.startsWith('stotra_'));
      const stotras: Stotra[] = [];

      for (const key of stotraKeys) {
        const stotraData = await AsyncStorage.getItem(key);
        if (stotraData) {
          const stotra = JSON.parse(stotraData);
          if (stotra.language === language) {
            // Convert date strings back to Date objects
            stotra.createdAt = new Date(stotra.createdAt);
            stotra.updatedAt = new Date(stotra.updatedAt);
            if (stotra.lastReadAt) {
              stotra.lastReadAt = new Date(stotra.lastReadAt);
            }
            stotras.push(stotra);
          }
        }
      }

      return stotras.sort((a, b) => a.title.localeCompare(b.title));
    } catch (error) {
      console.error('Error getting stotras by language:', error);
      return [];
    }
  }

  /**
   * Get a stotra by ID
   */
  async getStotraById(id: string): Promise<Stotra | null> {
    try {
      const key = `stotra_${id}`;
      const stotraData = await AsyncStorage.getItem(key);
      if (stotraData) {
        const stotra = JSON.parse(stotraData);
        // Convert date strings back to Date objects
        stotra.createdAt = new Date(stotra.createdAt);
        stotra.updatedAt = new Date(stotra.updatedAt);
        if (stotra.lastReadAt) {
          stotra.lastReadAt = new Date(stotra.lastReadAt);
        }
        return stotra;
      }
      return null;
    } catch (error) {
      console.error('Error getting stotra by ID:', error);
      return null;
    }
  }

  /**
   * Get favorite stotras for a language
   */
  async getFavoriteStotras(language: LanguageType): Promise<Stotra[]> {
    const stotras = await this.getStotrasByLanguage(language);
    return stotras.filter(stotra => stotra.isFavorite);
  }

  /**
   * Search stotras by query
   */
  async searchStotras(language: LanguageType, query: string): Promise<Stotra[]> {
    const stotras = await this.getStotrasByLanguage(language);
    const lowercaseQuery = query.toLowerCase();
    
    return stotras.filter(stotra => 
      stotra.title.toLowerCase().includes(lowercaseQuery) ||
      stotra.nativeTitle.toLowerCase().includes(lowercaseQuery) ||
      stotra.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Update stotra reading progress
   */
  async updateReadingProgress(stotraId: string, progress: number): Promise<void> {
    try {
      const stotra = await this.getStotraById(stotraId);
      if (stotra) {
        stotra.readingProgress = Math.min(100, Math.max(0, progress));
        stotra.lastReadAt = new Date();
        stotra.updatedAt = new Date();
        await this.storeStotra(stotra);
      }
    } catch (error) {
      console.error('Error updating reading progress:', error);
      throw error;
    }
  }

  /**
   * Toggle favorite status
   */
  async toggleFavorite(stotraId: string): Promise<void> {
    try {
      console.log('simpleStorageService.toggleFavorite called with ID:', stotraId);
      const stotra = await this.getStotraById(stotraId);
      if (stotra) {
        console.log('Found stotra, current favorite status:', stotra.isFavorite);
        stotra.isFavorite = !stotra.isFavorite;
        stotra.updatedAt = new Date();
        console.log('New favorite status:', stotra.isFavorite);
        await this.storeStotra(stotra);
        console.log('Successfully stored updated stotra');
      } else {
        console.log('Stotra not found in storage, will store from mock data');
        // If not in storage, get from mock data and store it
        const mockStotra = mockStotras.find(s => s.id === stotraId);
        if (mockStotra) {
          mockStotra.isFavorite = !mockStotra.isFavorite;
          mockStotra.updatedAt = new Date();
          await this.storeStotra(mockStotra);
          console.log('Stored mock stotra with updated favorite status');
        } else {
          console.log('Stotra not found in mock data either');
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  /**
   * Check if language is downloaded
   */
  async isLanguageDownloaded(language: LanguageType): Promise<boolean> {
    try {
      const key = `language_download_${language}`;
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const downloadInfo = JSON.parse(data);
        return downloadInfo.isDownloaded === true;
      }
      return false;
    } catch (error) {
      console.error('Error checking language download status:', error);
      return false;
    }
  }

  /**
   * Get language download progress
   */
  async getLanguageDownloadProgress(language: LanguageType): Promise<{
    isDownloaded: boolean;
    progress: number;
    totalStotras: number;
    downloadedStotras: number;
  }> {
    try {
      const key = `language_download_${language}`;
      const data = await AsyncStorage.getItem(key);
      if (data) {
        const downloadInfo = JSON.parse(data);
        return {
          isDownloaded: downloadInfo.isDownloaded || false,
          progress: downloadInfo.progress || 0,
          totalStotras: downloadInfo.totalStotras || 0,
          downloadedStotras: downloadInfo.downloadedStotras || 0,
        };
      }
      return {
        isDownloaded: false,
        progress: 0,
        totalStotras: 0,
        downloadedStotras: 0,
      };
    } catch (error) {
      console.error('Error getting language download progress:', error);
      return {
        isDownloaded: false,
        progress: 0,
        totalStotras: 0,
        downloadedStotras: 0,
      };
    }
  }

  /**
   * Update language download progress
   */
  async updateLanguageDownloadProgress(
    language: LanguageType,
    progress: number,
    totalStotras: number,
    downloadedStotras: number
  ): Promise<void> {
    try {
      const key = `language_download_${language}`;
      const downloadInfo = {
        isDownloaded: progress === 100,
        progress,
        totalStotras,
        downloadedStotras,
        lastDownloadAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem(key, JSON.stringify(downloadInfo));
    } catch (error) {
      console.error('Error updating language download progress:', error);
      throw error;
    }
  }

  /**
   * Mark language as downloaded
   */
  async markLanguageAsDownloaded(language: LanguageType): Promise<void> {
    await this.updateLanguageDownloadProgress(language, 100, 0, 0);
  }

  /**
   * Get statistics for a language
   */
  async getLanguageStats(language: LanguageType): Promise<{
    totalStotras: number;
    favoriteStotras: number;
    completedStotras: number;
    totalReadingTime: number;
    averageProgress: number;
  }> {
    const stotras = await this.getStotrasByLanguage(language);
    const totalStotras = stotras.length;
    const favoriteStotras = stotras.filter(s => s.isFavorite).length;
    const completedStotras = stotras.filter(s => s.readingProgress === 100).length;
    const totalReadingTime = stotras.reduce((sum, s) => sum + s.estimatedReadingTime, 0);
    const averageProgress = stotras.length > 0 
      ? stotras.reduce((sum, s) => sum + s.readingProgress, 0) / stotras.length 
      : 0;

    return {
      totalStotras,
      favoriteStotras,
      completedStotras,
      totalReadingTime,
      averageProgress,
    };
  }

  /**
   * Clear all downloaded content for a language
   */
  async clearLanguageContent(language: LanguageType): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stotraKeys = keys.filter(key => key.startsWith('stotra_'));
      
      for (const key of stotraKeys) {
        const stotraData = await AsyncStorage.getItem(key);
        if (stotraData) {
          const stotra = JSON.parse(stotraData);
          if (stotra.language === language) {
            await AsyncStorage.removeItem(key);
          }
        }
      }

      // Clear language download info
      const downloadKey = `language_download_${language}`;
      await AsyncStorage.removeItem(downloadKey);
    } catch (error) {
      console.error('Error clearing language content:', error);
      throw error;
    }
  }

  /**
   * Get all keys from storage
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return [...await AsyncStorage.getAllKeys()];
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  /**
   * Remove an item from storage
   */
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing item:', error);
      throw error;
    }
  }

  /**
   * Close storage connection
   */
  async close(): Promise<void> {
    // AsyncStorage doesn't require explicit closing
  }
}

export const simpleStorageService = SimpleStorageService.getInstance(); 