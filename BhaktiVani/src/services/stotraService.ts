import { Stotra, StotraCategory } from '../types/stotra';
import { LanguageType } from '../constants/languages';
import { offlineService } from './offlineService';

class StotraService {
  /**
   * Get all stotras filtered by language
   */
  async getStotrasByLanguage(language: LanguageType): Promise<Stotra[]> {
    return await offlineService.getStotrasByLanguage(language);
  }

  /**
   * Get stotras filtered by language and category
   */
  async getStotrasByLanguageAndCategory(language: LanguageType, category: StotraCategory): Promise<Stotra[]> {
    const stotras = await offlineService.getStotrasByLanguage(language);
    return stotras.filter(stotra => stotra.category === category);
  }

  /**
   * Get stotras grouped by category for a specific language
   */
  async getStotrasGroupedByCategory(language: LanguageType): Promise<Record<StotraCategory, Stotra[]>> {
    const filteredStotras = await offlineService.getStotrasByLanguage(language);
    const grouped: Record<StotraCategory, Stotra[]> = {
      bhakti: [],
      stotra: [],
      mantra: [],
      sloka: [],
      prayer: [],
      scripture: [],
    };

    filteredStotras.forEach(stotra => {
      grouped[stotra.category].push(stotra);
    });

    return grouped;
  }

  /**
   * Get favorite stotras for a specific language
   */
  async getFavoriteStotras(language: LanguageType): Promise<Stotra[]> {
    return await offlineService.getFavoriteStotras(language);
  }

  /**
   * Get recently read stotras for a specific language
   */
  async getRecentlyReadStotras(language: LanguageType, limit: number = 5): Promise<Stotra[]> {
    const languageStotras = await offlineService.getStotrasByLanguage(language);
    return languageStotras
      .filter(stotra => stotra.lastReadAt)
      .sort((a, b) => new Date(b.lastReadAt!).getTime() - new Date(a.lastReadAt!).getTime())
      .slice(0, limit);
  }

  /**
   * Search stotras by title or description
   */
  async searchStotras(language: LanguageType, query: string): Promise<Stotra[]> {
    return await offlineService.searchStotras(language, query);
  }

  /**
   * Get stotra by ID
   */
  async getStotraById(id: string): Promise<Stotra | undefined> {
    const stotra = await offlineService.getStotraById(id);
    return stotra || undefined;
  }

  /**
   * Toggle favorite status of a stotra
   */
  async toggleFavorite(stotraId: string): Promise<void> {
    await offlineService.toggleFavorite(stotraId);
  }

  /**
   * Update reading progress
   */
  async updateReadingProgress(stotraId: string, progress: number): Promise<void> {
    await offlineService.updateReadingProgress(stotraId, progress);
  }

  /**
   * Get statistics for a language
   */
  async getLanguageStats(language: LanguageType) {
    return await offlineService.getLanguageStats(language);
  }
}

export const stotraService = new StotraService(); 