import * as SQLite from 'expo-sqlite';
import { Stotra, StotraCategory } from '../types/stotra';
import { LanguageType } from '../constants/languages';

class DatabaseService {
  private database: SQLite.SQLiteDatabase | null = null;
  private static instance: DatabaseService;

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  /**
   * Initialize the database
   */
  async init(): Promise<void> {
    try {
      this.database = SQLite.openDatabaseSync('BhaktiVani.db');
      await this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  /**
   * Create database tables
   */
  private async createTables(): Promise<void> {
    if (!this.database) throw new Error('Database not initialized');

    // Create stotras table
    await this.executeSql(`
      CREATE TABLE IF NOT EXISTS stotras (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        nativeTitle TEXT NOT NULL,
        language TEXT NOT NULL,
        category TEXT NOT NULL,
        author TEXT,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        isFavorite INTEGER DEFAULT 0,
        readingProgress REAL DEFAULT 0,
        estimatedReadingTime INTEGER DEFAULT 0,
        lastReadAt TEXT,
        createdAt TEXT NOT NULL,
        updatedAt TEXT NOT NULL,
        isDownloaded INTEGER DEFAULT 0
      )
    `);

    // Create download_queue table for tracking downloads
    await this.executeSql(`
      CREATE TABLE IF NOT EXISTS download_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        stotraId TEXT NOT NULL,
        language TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        createdAt TEXT NOT NULL
      )
    `);

    // Create language_downloads table for tracking language downloads
    await this.executeSql(`
      CREATE TABLE IF NOT EXISTS language_downloads (
        language TEXT PRIMARY KEY,
        isDownloaded INTEGER DEFAULT 0,
        downloadProgress REAL DEFAULT 0,
        totalStotras INTEGER DEFAULT 0,
        downloadedStotras INTEGER DEFAULT 0,
        lastDownloadAt TEXT
      )
    `);

    console.log('Database tables created successfully');
  }

  /**
   * Execute SQL query with parameters
   */
  private executeSql(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.database) {
        reject(new Error('Database not initialized'));
        return;
      }

      try {
        const result = this.database.execSync(sql);
        resolve(result);
      } catch (error) {
        console.error('SQL Error:', error);
        reject(error);
      }
    });
  }

  /**
   * Store a stotra in the database
   */
  async storeStotra(stotra: Stotra): Promise<void> {
    const query = `
      INSERT OR REPLACE INTO stotras (
        id, title, nativeTitle, language, category, author, description, 
        content, isFavorite, readingProgress, estimatedReadingTime, 
        lastReadAt, createdAt, updatedAt, isDownloaded
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    `;

    await this.executeSql(query, [
      stotra.id,
      stotra.title,
      stotra.nativeTitle,
      stotra.language,
      stotra.category,
      stotra.author || null,
      stotra.description,
      stotra.content,
      stotra.isFavorite ? 1 : 0,
      stotra.readingProgress,
      stotra.estimatedReadingTime,
      stotra.lastReadAt ? stotra.lastReadAt.toISOString() : null,
      stotra.createdAt.toISOString(),
      stotra.updatedAt.toISOString(),
    ]);
  }

  /**
   * Store multiple stotras in the database
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
    const result = await this.executeSql(
      'SELECT * FROM stotras WHERE language = ? ORDER BY title',
      [language]
    );

    return this.mapResultToStotras(result);
  }

  /**
   * Get a stotra by ID
   */
  async getStotraById(id: string): Promise<Stotra | null> {
    const result = await this.executeSql(
      'SELECT * FROM stotras WHERE id = ?',
      [id]
    );

    if (result.length === 0) {
      return null;
    }

    return this.mapRowToStotra(result[0]);
  }

  /**
   * Get favorite stotras for a language
   */
  async getFavoriteStotras(language: LanguageType): Promise<Stotra[]> {
    const result = await this.executeSql(
      'SELECT * FROM stotras WHERE language = ? AND isFavorite = 1 ORDER BY title',
      [language]
    );

    return this.mapResultToStotras(result);
  }

  /**
   * Search stotras by query
   */
  async searchStotras(language: LanguageType, query: string): Promise<Stotra[]> {
    const searchQuery = `%${query}%`;
    const result = await this.executeSql(
      `SELECT * FROM stotras 
       WHERE language = ? 
       AND (title LIKE ? OR nativeTitle LIKE ? OR description LIKE ?)
       ORDER BY title`,
      [language, searchQuery, searchQuery, searchQuery]
    );

    return this.mapResultToStotras(result);
  }

  /**
   * Update stotra reading progress
   */
  async updateReadingProgress(stotraId: string, progress: number): Promise<void> {
    await this.executeSql(
      `UPDATE stotras 
       SET readingProgress = ?, lastReadAt = ?, updatedAt = ?
       WHERE id = ?`,
      [progress, new Date().toISOString(), new Date().toISOString(), stotraId]
    );
  }

  /**
   * Toggle favorite status
   */
  async toggleFavorite(stotraId: string): Promise<void> {
    await this.executeSql(
      `UPDATE stotras 
       SET isFavorite = CASE WHEN isFavorite = 1 THEN 0 ELSE 1 END,
           updatedAt = ?
       WHERE id = ?`,
      [new Date().toISOString(), stotraId]
    );
  }

  /**
   * Check if language is downloaded
   */
  async isLanguageDownloaded(language: LanguageType): Promise<boolean> {
    const result = await this.executeSql(
      'SELECT isDownloaded FROM language_downloads WHERE language = ?',
      [language]
    );

    return result.length > 0 && result[0].isDownloaded === 1;
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
    const result = await this.executeSql(
      'SELECT * FROM language_downloads WHERE language = ?',
      [language]
    );

    if (result.length === 0) {
      return {
        isDownloaded: false,
        progress: 0,
        totalStotras: 0,
        downloadedStotras: 0,
      };
    }

    const row = result[0];
    return {
      isDownloaded: row.isDownloaded === 1,
      progress: row.downloadProgress,
      totalStotras: row.totalStotras,
      downloadedStotras: row.downloadedStotras,
    };
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
    await this.executeSql(
      `INSERT OR REPLACE INTO language_downloads 
       (language, downloadProgress, totalStotras, downloadedStotras, lastDownloadAt)
       VALUES (?, ?, ?, ?, ?)`,
      [language, progress, totalStotras, downloadedStotras, new Date().toISOString()]
    );
  }

  /**
   * Mark language as downloaded
   */
  async markLanguageAsDownloaded(language: LanguageType): Promise<void> {
    await this.executeSql(
      `UPDATE language_downloads 
       SET isDownloaded = 1, downloadProgress = 100, lastDownloadAt = ?
       WHERE language = ?`,
      [new Date().toISOString(), language]
    );
  }

  /**
   * Get download queue
   */
  async getDownloadQueue(): Promise<Array<{
    id: number;
    stotraId: string;
    language: LanguageType;
    status: 'pending' | 'downloading' | 'completed' | 'failed';
    createdAt: Date;
  }>> {
    const result = await this.executeSql(
      'SELECT * FROM download_queue ORDER BY createdAt DESC'
    );

    return result.map((row: any) => ({
      id: row.id,
      stotraId: row.stotraId,
      language: row.language,
      status: row.status,
      createdAt: new Date(row.createdAt),
    }));
  }

  /**
   * Add to download queue
   */
  async addToDownloadQueue(stotraId: string, language: LanguageType): Promise<void> {
    await this.executeSql(
      'INSERT INTO download_queue (stotraId, language, createdAt) VALUES (?, ?, ?)',
      [stotraId, language, new Date().toISOString()]
    );
  }

  /**
   * Update download queue status
   */
  async updateDownloadQueueStatus(
    id: number,
    status: 'pending' | 'downloading' | 'completed' | 'failed'
  ): Promise<void> {
    await this.executeSql(
      'UPDATE download_queue SET status = ? WHERE id = ?',
      [status, id]
    );
  }

  /**
   * Clear download queue
   */
  async clearDownloadQueue(): Promise<void> {
    await this.executeSql('DELETE FROM download_queue');
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
    const result = await this.executeSql(
      'SELECT * FROM stotras WHERE language = ?',
      [language]
    );

    const stotras = this.mapResultToStotras(result);
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
   * Map SQLite result to Stotra array
   */
  private mapResultToStotras(result: any[]): Stotra[] {
    return result.map(row => this.mapRowToStotra(row));
  }

  /**
   * Map database row to Stotra object
   */
  private mapRowToStotra(row: any): Stotra {
    return {
      id: row.id,
      title: row.title,
      nativeTitle: row.nativeTitle,
      language: row.language,
      category: row.category,
      author: row.author,
      description: row.description,
      content: row.content,
      isFavorite: row.isFavorite === 1,
      readingProgress: row.readingProgress,
      estimatedReadingTime: row.estimatedReadingTime,
      lastReadAt: row.lastReadAt ? new Date(row.lastReadAt) : undefined,
      createdAt: new Date(row.createdAt),
      updatedAt: new Date(row.updatedAt),
    };
  }

  /**
   * Close database connection
   */
  async close(): Promise<void> {
    // Expo SQLite doesn't require explicit closing
    this.database = null;
  }
}

export const databaseService = DatabaseService.getInstance(); 