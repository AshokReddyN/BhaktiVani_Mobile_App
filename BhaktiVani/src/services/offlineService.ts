import { Stotra } from '../types/stotra';
import { LanguageType } from '../constants/languages';
import { simpleStorageService } from './simpleStorageService';
import { productionStotras } from '../data/productionStotras';

class OfflineService {
  private static instance: OfflineService;
  private downloadInProgress = false;

  private constructor() {}

  static getInstance(): OfflineService {
    if (!OfflineService.instance) {
      OfflineService.instance = new OfflineService();
    }
    return OfflineService.instance;
  }

  /**
   * Initialize the offline service
   */
  async init(): Promise<void> {
    try {
      await simpleStorageService.init();
      console.log('Offline service initialized successfully');
    } catch (error) {
      console.error('Offline service initialization failed:', error);
      throw error;
    }
  }

  /**
   * Download all stotras for a specific language
   */
  async downloadLanguageContent(language: LanguageType, onProgress?: (progress: number) => void): Promise<void> {
    if (this.downloadInProgress) {
      throw new Error('Download already in progress');
    }

    this.downloadInProgress = true;

    try {
      // Get all stotras for the language from production data
      const languageStotras = productionStotras.filter(stotra => stotra.language === language);
      const totalStotras = languageStotras.length;

      if (totalStotras === 0) {
        throw new Error(`No stotras available for language: ${language}`);
      }

      // Initialize download progress
      await simpleStorageService.updateLanguageDownloadProgress(language, 0, totalStotras, 0);

      // Download stotras one by one
      for (let i = 0; i < languageStotras.length; i++) {
        const stotra = languageStotras[i];
        
        // Simulate network delay for realistic download experience
        await this.simulateDownloadDelay();
        
        // Store stotra in storage
        await simpleStorageService.storeStotra(stotra);
        
        // Update progress
        const progress = ((i + 1) / totalStotras) * 100;
        await simpleStorageService.updateLanguageDownloadProgress(
          language, 
          progress, 
          totalStotras, 
          i + 1
        );
        
        // Call progress callback
        onProgress?.(progress);
      }

      // Mark language as downloaded
      await simpleStorageService.markLanguageAsDownloaded(language);
      
      console.log(`Successfully downloaded ${totalStotras} stotras for ${language}`);
    } catch (error) {
      console.error(`Failed to download language content for ${language}:`, error);
      throw error;
    } finally {
      this.downloadInProgress = false;
    }
  }

  /**
   * Get stotras for a language (from storage if available, otherwise from mock data)
   */
  async getStotrasByLanguage(language: LanguageType): Promise<Stotra[]> {
    try {
      // Check if language is downloaded
      const isDownloaded = await simpleStorageService.isLanguageDownloaded(language);
      
      if (isDownloaded) {
        // Get from storage
        return await simpleStorageService.getStotrasByLanguage(language);
      } else {
        // Fallback to production data
        console.log(`Language ${language} not downloaded, using fallback data`);
        return productionStotras.filter(stotra => stotra.language === language);
      }
    } catch (error) {
      console.error(`Error getting stotras for ${language}:`, error);
      // Fallback to production data
      return productionStotras.filter(stotra => stotra.language === language);
    }
  }

  /**
   * Get a specific stotra (from storage if available, otherwise from mock data)
   */
  async getStotraById(id: string): Promise<Stotra | null> {
    try {
      // Try to get from storage first
      const stotra = await simpleStorageService.getStotraById(id);
      if (stotra) {
        return stotra;
      }

      // Fallback to production data
      return productionStotras.filter(s => s.id === id)[0] || null;
    } catch (error) {
      console.error(`Error getting stotra ${id}:`, error);
      // Fallback to production data
      return productionStotras.filter(s => s.id === id)[0] || null;
    }
  }

  /**
   * Get favorite stotras for a language
   */
  async getFavoriteStotras(language: LanguageType): Promise<Stotra[]> {
    try {
      // Check if language is downloaded
      const isDownloaded = await simpleStorageService.isLanguageDownloaded(language);
      
      if (isDownloaded) {
        // Get from storage
        return await simpleStorageService.getFavoriteStotras(language);
      } else {
        // Fallback to production data
        return productionStotras.filter(stotra => 
          stotra.language === language && stotra.isFavorite
        );
      }
    } catch (error) {
      console.error(`Error getting favorite stotras for ${language}:`, error);
      // Fallback to production data
      return productionStotras.filter(stotra => 
        stotra.language === language && stotra.isFavorite
      );
    }
  }

  /**
   * Search stotras for a language
   */
  async searchStotras(language: LanguageType, query: string): Promise<Stotra[]> {
    try {
      // Check if language is downloaded
      const isDownloaded = await simpleStorageService.isLanguageDownloaded(language);
      
      if (isDownloaded) {
        // Search in storage
        return await simpleStorageService.searchStotras(language, query);
      } else {
        // Search in mock data
        const languageStotras = mockStotras.filter(stotra => stotra.language === language);
        const lowercaseQuery = query.toLowerCase();
        
        return languageStotras.filter(stotra => 
          stotra.title.toLowerCase().includes(lowercaseQuery) ||
          stotra.nativeTitle.toLowerCase().includes(lowercaseQuery) ||
          stotra.description.toLowerCase().includes(lowercaseQuery)
        );
      }
    } catch (error) {
      console.error(`Error searching stotras for ${language}:`, error);
      // Fallback to mock data search
      const languageStotras = mockStotras.filter(stotra => stotra.language === language);
      const lowercaseQuery = query.toLowerCase();
      
      return languageStotras.filter(stotra => 
        stotra.title.toLowerCase().includes(lowercaseQuery) ||
        stotra.nativeTitle.toLowerCase().includes(lowercaseQuery) ||
        stotra.description.toLowerCase().includes(lowercaseQuery)
      );
    }
  }

  /**
   * Update reading progress
   */
  async updateReadingProgress(stotraId: string, progress: number): Promise<void> {
    try {
      // Update in storage if available
      await simpleStorageService.updateReadingProgress(stotraId, progress);
    } catch (error) {
      console.error(`Error updating reading progress for ${stotraId}:`, error);
      // In a real app, you might want to queue this for later sync
    }
  }

  /**
   * Toggle favorite status
   */
  async toggleFavorite(stotraId: string): Promise<void> {
    try {
      console.log('offlineService.toggleFavorite called with ID:', stotraId);
      // Update in storage if available
      await simpleStorageService.toggleFavorite(stotraId);
      console.log('offlineService.toggleFavorite completed successfully');
    } catch (error) {
      console.error(`Error toggling favorite for ${stotraId}:`, error);
      // In a real app, you might want to queue this for later sync
      throw error; // Re-throw to let the caller handle it
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
      return await simpleStorageService.getLanguageDownloadProgress(language);
    } catch (error) {
      console.error(`Error getting download progress for ${language}:`, error);
      return {
        isDownloaded: false,
        progress: 0,
        totalStotras: 0,
        downloadedStotras: 0,
      };
    }
  }

  /**
   * Check if language is downloaded
   */
  async isLanguageDownloaded(language: LanguageType): Promise<boolean> {
    try {
      return await simpleStorageService.isLanguageDownloaded(language);
    } catch (error) {
      console.error(`Error checking download status for ${language}:`, error);
      return false;
    }
  }

  /**
   * Get language statistics
   */
  async getLanguageStats(language: LanguageType): Promise<{
    totalStotras: number;
    favoriteStotras: number;
    completedStotras: number;
    totalReadingTime: number;
    averageProgress: number;
  }> {
    try {
      const isDownloaded = await simpleStorageService.isLanguageDownloaded(language);
      
      if (isDownloaded) {
        return await simpleStorageService.getLanguageStats(language);
      } else {
        // Calculate stats from mock data
        const languageStotras = mockStotras.filter(stotra => stotra.language === language);
        const totalStotras = languageStotras.length;
        const favoriteStotras = languageStotras.filter(s => s.isFavorite).length;
        const completedStotras = languageStotras.filter(s => s.readingProgress === 100).length;
        const totalReadingTime = languageStotras.reduce((sum, s) => sum + s.estimatedReadingTime, 0);
        const averageProgress = languageStotras.length > 0 
          ? languageStotras.reduce((sum, s) => sum + s.readingProgress, 0) / languageStotras.length 
          : 0;

        return {
          totalStotras,
          favoriteStotras,
          completedStotras,
          totalReadingTime,
          averageProgress,
        };
      }
    } catch (error) {
      console.error(`Error getting stats for ${language}:`, error);
      // Return empty stats
      return {
        totalStotras: 0,
        favoriteStotras: 0,
        completedStotras: 0,
        totalReadingTime: 0,
        averageProgress: 0,
      };
    }
  }

  /**
   * Clear downloaded content for a language
   */
  async clearLanguageContent(language: LanguageType): Promise<void> {
    try {
      await simpleStorageService.clearLanguageContent(language);
      console.log(`Cleared downloaded content for ${language}`);
    } catch (error) {
      console.error(`Error clearing content for ${language}:`, error);
      throw error;
    }
  }

  /**
   * Simulate download delay for realistic experience
   */
  private async simulateDownloadDelay(): Promise<void> {
    // Simulate network delay between 100-500ms
    const delay = Math.random() * 400 + 100;
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Check if download is in progress
   */
  isDownloadInProgress(): boolean {
    return this.downloadInProgress;
  }
}

export const offlineService = OfflineService.getInstance(); 