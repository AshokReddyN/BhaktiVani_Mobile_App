import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Card, ActivityIndicator } from 'react-native-paper';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { stotraService } from '../../services/stotraService';
import StotraList from '../../components/stotra/StotraList';

const FavoritesScreen: React.FC = () => {
  const theme = useTheme();
  const { selectedLanguage, currentLanguage } = useLanguageContext();
  const [favoriteStotras, setFavoriteStotras] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavoriteStotras();
  }, [selectedLanguage]);

  const loadFavoriteStotras = async () => {
    try {
      setIsLoading(true);
      const favorites = await stotraService.getFavoriteStotras(selectedLanguage);
      setFavoriteStotras(favorites);
    } catch (error) {
      console.error('Error loading favorite stotras:', error);
      setFavoriteStotras([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
            Loading favorites...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Favorites
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
          Your bookmarked devotional texts in {currentLanguage.nativeName}
        </Text>
      </View>

      {/* Favorites Stats */}
      <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.statsTitle, { color: theme.colors.primary }]}>
            Your Favorites
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {favoriteStotras.length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
                Favorites
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {favoriteStotras.filter(s => s.readingProgress === 100).length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
                Completed
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {Math.round(
                  favoriteStotras.length > 0 
                    ? favoriteStotras.reduce((sum, s) => sum + s.readingProgress, 0) / favoriteStotras.length 
                    : 0
                )}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
                Avg Progress
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Favorites List */}
      <View style={styles.listContainer}>
        <StotraList 
          showCategories={false}
          showFavorites={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  statsCard: {
    marginBottom: 20,
    borderRadius: 12,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
  },
});

export default FavoritesScreen;