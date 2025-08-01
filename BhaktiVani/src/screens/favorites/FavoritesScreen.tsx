import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Card } from 'react-native-paper';

const FavoritesScreen: React.FC = () => {
  const theme = useTheme();

  // Mock favorites data - will be replaced with actual data later
  const mockFavorites = [
    {
      id: '1',
      title: 'Bhagavad Gita',
      language: 'Sanskrit',
      progress: 25,
    },
    {
      id: '2',
      title: 'Hanuman Chalisa',
      language: 'Kannada',
      progress: 100,
    },
    {
      id: '3',
      title: 'Gayatri Mantra',
      language: 'Telugu',
      progress: 50,
    },
  ];

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
          Your bookmarked devotional texts
        </Text>
      </View>

      {mockFavorites.length > 0 ? (
        mockFavorites.map((favorite) => (
          <Card 
            key={favorite.id} 
            style={[styles.card, { backgroundColor: theme.colors.surface }]}
          >
            <Card.Content>
              <View style={styles.favoriteItem}>
                <View style={styles.favoriteInfo}>
                  <Text style={[styles.favoriteTitle, { color: theme.colors.onSurface }]}>
                    {favorite.title}
                  </Text>
                  <Text style={[styles.favoriteLanguage, { color: theme.colors.onSurface }]}>
                    {favorite.language}
                  </Text>
                </View>
                <View style={styles.progressContainer}>
                  <Text style={[styles.progressText, { color: theme.colors.primary }]}>
                    {favorite.progress}%
                  </Text>
                  <View style={[styles.progressBar, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          backgroundColor: theme.colors.primary,
                          width: `${favorite.progress}%`
                        }
                      ]} 
                    />
                  </View>
                </View>
              </View>
            </Card.Content>
          </Card>
        ))
      ) : (
        <View style={[styles.emptyState, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
            No Favorites Yet
          </Text>
          <Text style={[styles.emptyDescription, { color: theme.colors.onSurface }]}>
            Start reading devotional texts and bookmark your favorites to see them here.
          </Text>
        </View>
      )}
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
  card: {
    marginBottom: 12,
    borderRadius: 12,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  favoriteLanguage: {
    fontSize: 14,
    opacity: 0.7,
  },
  progressContainer: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    width: 60,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    borderRadius: 12,
    marginTop: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default FavoritesScreen;