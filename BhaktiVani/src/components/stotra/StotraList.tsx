import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useTheme, Card, Chip, List, IconButton, ProgressBar } from 'react-native-paper';
import { Stotra, StotraCategory, getCategoryInfo } from '../../types/stotra';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { stotraService } from '../../services/stotraService';

interface StotraListProps {
  showCategories?: boolean;
  showFavorites?: boolean;
  searchQuery?: string;
  onStotraPress?: (stotraId: string) => void;
}

const StotraList: React.FC<StotraListProps> = ({ 
  showCategories = true, 
  showFavorites = false,
  searchQuery = '',
  onStotraPress
}) => {
  const theme = useTheme();
  const { selectedLanguage } = useLanguageContext();
  const [selectedCategory, setSelectedCategory] = useState<StotraCategory | 'all'>('all');

  // Get stotras based on filters
  const getFilteredStotras = (): Stotra[] => {
    let stotras: Stotra[];

    if (showFavorites) {
      stotras = stotraService.getFavoriteStotras(selectedLanguage);
    } else if (searchQuery) {
      stotras = stotraService.searchStotras(selectedLanguage, searchQuery);
    } else if (selectedCategory !== 'all') {
      stotras = stotraService.getStotrasByLanguageAndCategory(selectedLanguage, selectedCategory);
    } else {
      stotras = stotraService.getStotrasByLanguage(selectedLanguage);
    }

    return stotras;
  };

  const stotras = getFilteredStotras();
  const groupedStotras = stotraService.getStotrasGroupedByCategory(selectedLanguage);

  const renderStotraItem = ({ item }: { item: Stotra }) => (
    <Card 
      style={[styles.stotraCard, { backgroundColor: theme.colors.surface }]}
      onPress={() => onStotraPress?.(item.id)}
    >
      <Card.Content>
        <View style={styles.stotraHeader}>
          <View style={styles.stotraInfo}>
            <Text style={[styles.stotraTitle, { color: theme.colors.onSurface }]}>
              {item.title}
            </Text>
            <Text style={[styles.stotraNativeTitle, { color: theme.colors.onSurface }]}>
              {item.nativeTitle}
            </Text>
            <Text style={[styles.stotraDescription, { color: theme.colors.onSurface }]}>
              {item.description}
            </Text>
            {item.author && (
              <Text style={[styles.stotraAuthor, { color: theme.colors.onSurface }]}>
                By {item.author}
              </Text>
            )}
          </View>
          <View style={styles.stotraActions}>
            <IconButton
              icon={item.isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              onPress={() => stotraService.toggleFavorite(item.id)}
              iconColor={item.isFavorite ? theme.colors.error : theme.colors.onSurface}
            />
          </View>
        </View>

        <View style={styles.stotraProgress}>
          <View style={styles.progressInfo}>
            <Text style={[styles.progressText, { color: theme.colors.primary }]}>
              {item.readingProgress}% Complete
            </Text>
            <Text style={[styles.readingTime, { color: theme.colors.onSurface }]}>
              {item.estimatedReadingTime} min read
            </Text>
          </View>
          <ProgressBar
            progress={item.readingProgress / 100}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
        </View>

        <View style={styles.stotraMeta}>
          <Chip 
            mode="outlined" 
            compact 
            style={styles.categoryChip}
            textStyle={{ fontSize: 12 }}
          >
            {getCategoryInfo(item.category).name}
          </Chip>
          {item.lastReadAt && (
            <Text style={[styles.lastRead, { color: theme.colors.onSurface }]}>
              Last read: {new Date(item.lastReadAt).toLocaleDateString()}
            </Text>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  const renderCategorySection = (category: StotraCategory, stotras: Stotra[]) => {
    if (stotras.length === 0) return null;

    const categoryInfo = getCategoryInfo(category);

    return (
      <View key={category} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <List.Icon icon={categoryInfo.icon} color={theme.colors.primary} />
          <Text style={[styles.categoryTitle, { color: theme.colors.primary }]}>
            {categoryInfo.name}
          </Text>
          <Text style={[styles.categoryCount, { color: theme.colors.onSurface }]}>
            ({stotras.length})
          </Text>
        </View>
        <FlatList
          data={stotras}
          renderItem={renderStotraItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  const renderCategoryFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoryFilter}
      contentContainerStyle={styles.categoryFilterContent}
    >
      <Chip
        selected={selectedCategory === 'all'}
        onPress={() => setSelectedCategory('all')}
        style={styles.filterChip}
      >
        All
      </Chip>
      {Object.entries(groupedStotras).map(([category, categoryStotras]) => {
        if (categoryStotras.length === 0) return null;
        const categoryInfo = getCategoryInfo(category as StotraCategory);
        return (
          <Chip
            key={category}
            selected={selectedCategory === category}
            onPress={() => setSelectedCategory(category as StotraCategory)}
            style={styles.filterChip}
          >
            {categoryInfo.name} ({categoryStotras.length})
          </Chip>
        );
      })}
    </ScrollView>
  );

  if (stotras.length === 0) {
    return (
      <View style={[styles.emptyState, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
          No Stotras Found
        </Text>
        <Text style={[styles.emptyDescription, { color: theme.colors.onSurface }]}>
          {searchQuery 
            ? `No stotras found matching "${searchQuery}"`
            : 'No stotras available in the selected language and category.'
          }
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {showCategories && !showFavorites && !searchQuery && renderCategoryFilter()}
      
      {showCategories && !showFavorites && !searchQuery ? (
        // Show grouped by category
        Object.entries(groupedStotras).map(([category, categoryStotras]) =>
          renderCategorySection(category as StotraCategory, categoryStotras)
        )
      ) : (
        // Show flat list
        <FlatList
          data={stotras}
          renderItem={renderStotraItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryFilter: {
    marginBottom: 16,
  },
  categoryFilterContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  categoryCount: {
    fontSize: 14,
    marginLeft: 8,
  },
  stotraCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  stotraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  stotraInfo: {
    flex: 1,
    marginRight: 8,
  },
  stotraTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stotraNativeTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  stotraDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  stotraAuthor: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  stotraActions: {
    alignItems: 'flex-end',
  },
  stotraProgress: {
    marginTop: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  readingTime: {
    fontSize: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
  stotraMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  categoryChip: {
    height: 24,
  },
  lastRead: {
    fontSize: 12,
    opacity: 0.7,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    margin: 16,
    borderRadius: 12,
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

export default StotraList; 