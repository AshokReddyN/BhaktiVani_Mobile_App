import { mockStotras } from '../data/mockStotras';
import { simpleStorageService } from './simpleStorageService';

class InitializationService {
  private static instance: InitializationService;

  private constructor() {}

  static getInstance(): InitializationService {
    if (!InitializationService.instance) {
      InitializationService.instance = new InitializationService();
    }
    return InitializationService.instance;
  }

  /**
   * Initialize the app with mock data if no data exists
   */
  async initializeApp(): Promise<void> {
    try {
      console.log('Initializing app with mock data...');
      
      // Check if any stotras exist in storage
      const existingStotras = await simpleStorageService.getStotrasByLanguage('kannada');
      
      if (existingStotras.length === 0) {
        console.log('No stotras found in storage, initializing with mock data...');
        
        // Store all mock stotras
        for (const stotra of mockStotras) {
          await simpleStorageService.storeStotra(stotra);
        }
        
        console.log(`Successfully initialized ${mockStotras.length} stotras`);
      } else {
        console.log(`Found ${existingStotras.length} existing stotras in storage`);
      }
      
    } catch (error) {
      console.error('Error initializing app:', error);
      throw error;
    }
  }

  /**
   * Reset all data (for testing purposes)
   */
  async resetAllData(): Promise<void> {
    try {
      console.log('Resetting all data...');
      
      // Clear all stotra keys
      const keys = await simpleStorageService.getAllKeys();
      const stotraKeys = keys.filter(key => key.startsWith('stotra_'));
      
      for (const key of stotraKeys) {
        await simpleStorageService.removeItem(key);
      }
      
      console.log(`Cleared ${stotraKeys.length} stotra entries`);
      
      // Re-initialize with mock data
      await this.initializeApp();
      
    } catch (error) {
      console.error('Error resetting data:', error);
      throw error;
    }
  }
}

export const initializationService = InitializationService.getInstance(); 