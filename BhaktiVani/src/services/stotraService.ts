import { Stotra, StotraCategory } from '../types/stotra';
import { LanguageType } from '../constants/languages';
import { mockStotras } from '../data/mockStotras';

class StotraService {
  private stotras: Stotra[] = mockStotras;

  /**
   * Get all stotras filtered by language
   */
  getStotrasByLanguage(language: LanguageType): Stotra[] {
    return this.stotras.filter(stotra => stotra.language === language);
  }

  /**
   * Get stotras filtered by language and category
   */
  getStotrasByLanguageAndCategory(language: LanguageType, category: StotraCategory): Stotra[] {
    return this.stotras.filter(
      stotra => stotra.language === language && stotra.category === category
    );
  }

  /**
   * Get stotras grouped by category for a specific language
   */
  getStotrasGroupedByCategory(language: LanguageType): Record<StotraCategory, Stotra[]> {
    const filteredStotras = this.getStotrasByLanguage(language);
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
  getFavoriteStotras(language: LanguageType): Stotra[] {
    return this.stotras.filter(
      stotra => stotra.language === language && stotra.isFavorite
    );
  }

  /**
   * Get recently read stotras for a specific language
   */
  getRecentlyReadStotras(language: LanguageType, limit: number = 5): Stotra[] {
    const languageStotras = this.getStotrasByLanguage(language);
    return languageStotras
      .filter(stotra => stotra.lastReadAt)
      .sort((a, b) => new Date(b.lastReadAt!).getTime() - new Date(a.lastReadAt!).getTime())
      .slice(0, limit);
  }

  /**
   * Search stotras by title or description
   */
  searchStotras(language: LanguageType, query: string): Stotra[] {
    const languageStotras = this.getStotrasByLanguage(language);
    const lowercaseQuery = query.toLowerCase();
    
    return languageStotras.filter(stotra => 
      stotra.title.toLowerCase().includes(lowercaseQuery) ||
      stotra.nativeTitle.toLowerCase().includes(lowercaseQuery) ||
      stotra.description.toLowerCase().includes(lowercaseQuery)
    );
  }

  /**
   * Get stotra by ID
   */
  getStotraById(id: string): Stotra | undefined {
    return this.stotras.find(stotra => stotra.id === id);
  }

  /**
   * Toggle favorite status of a stotra
   */
  toggleFavorite(stotraId: string): void {
    const stotra = this.getStotraById(stotraId);
    if (stotra) {
      stotra.isFavorite = !stotra.isFavorite;
      stotra.updatedAt = new Date();
    }
  }

  /**
   * Update reading progress
   */
  updateReadingProgress(stotraId: string, progress: number): void {
    const stotra = this.getStotraById(stotraId);
    if (stotra) {
      stotra.readingProgress = Math.min(100, Math.max(0, progress));
      stotra.lastReadAt = new Date();
      stotra.updatedAt = new Date();
    }
  }

  /**
   * Get statistics for a language
   */
  getLanguageStats(language: LanguageType) {
    const languageStotras = this.getStotrasByLanguage(language);
    const totalStotras = languageStotras.length;
    const favoriteStotras = languageStotras.filter(s => s.isFavorite).length;
    const completedStotras = languageStotras.filter(s => s.readingProgress === 100).length;
    const totalReadingTime = languageStotras.reduce((sum, s) => sum + s.estimatedReadingTime, 0);

    return {
      totalStotras,
      favoriteStotras,
      completedStotras,
      totalReadingTime,
      averageProgress: languageStotras.length > 0 
        ? languageStotras.reduce((sum, s) => sum + s.readingProgress, 0) / languageStotras.length 
        : 0,
    };
  }
}

export const stotraService = new StotraService(); 