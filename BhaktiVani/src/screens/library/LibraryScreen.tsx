import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Searchbar, Card, Chip } from 'react-native-paper';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { stotraService } from '../../services/stotraService';
import StotraList from '../../components/stotra/StotraList';

const LibraryScreen: React.FC = () => {
  const theme = useTheme();
  const { selectedLanguage, currentLanguage } = useLanguageContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(true);

  const languageStats = stotraService.getLanguageStats(selectedLanguage);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Hide categories when searching
    setShowCategories(query.length === 0);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Library
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
          {currentLanguage.nativeName} ({currentLanguage.name})
        </Text>
      </View>

      {/* Language Stats */}
      <Card style={[styles.statsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.statsTitle, { color: theme.colors.primary }]}>
            Your Progress
          </Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {languageStats.totalStotras}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
                Total Texts
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {languageStats.favoriteStotras}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
                Favorites
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {languageStats.completedStotras}
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
                Completed
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: theme.colors.primary }]}>
                {Math.round(languageStats.averageProgress)}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>
                Avg Progress
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search stotras..."
          onChangeText={handleSearch}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          iconColor={theme.colors.onSurface}
          inputStyle={{ color: theme.colors.onSurface }}
        />
      </View>

      {/* View Options */}
      {!searchQuery && (
        <View style={styles.viewOptions}>
          <Chip
            selected={showCategories}
            onPress={() => setShowCategories(true)}
            style={styles.viewChip}
          >
            By Category
          </Chip>
          <Chip
            selected={!showCategories}
            onPress={() => setShowCategories(false)}
            style={styles.viewChip}
          >
            All Texts
          </Chip>
        </View>
      )}

      {/* Stotra List */}
      <View style={styles.listContainer}>
        <StotraList 
          showCategories={showCategories}
          searchQuery={searchQuery}
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
    fontSize: 18,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
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
  searchContainer: {
    marginBottom: 16,
  },
  searchBar: {
    borderRadius: 12,
    elevation: 2,
  },
  viewOptions: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  viewChip: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
});

export default LibraryScreen; 