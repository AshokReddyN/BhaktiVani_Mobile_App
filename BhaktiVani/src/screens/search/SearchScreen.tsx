import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { useTheme, Searchbar, Chip, Card, List, IconButton, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { stotraService } from '../../services/stotraService';
import { Stotra, StotraCategory, getCategoryInfo, STOTRA_CATEGORIES } from '../../types/stotra';
import StotraList from '../../components/stotra/StotraList';

const SearchScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { selectedLanguage, currentLanguage } = useLanguageContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Stotra[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<StotraCategory | 'all'>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // Popular search terms
  const popularSearches = [
    'Hanuman', 'Ganesha', 'Vishnu', 'Shiva', 'Lakshmi', 'Durga',
    'Bhagavad Gita', 'Ramayana', 'Mahabharata', 'Vedas', 'Upanishads'
  ];

  // Search suggestions based on query
  const getSearchSuggestions = (query: string): string[] => {
    if (!query) return [];
    
    const suggestions = [
      `${query} stotra`,
      `${query} mantra`,
      `${query} prayer`,
      `${query} in ${currentLanguage.nativeName}`,
      `${query} devotional`,
      `${query} sacred text`
    ];
    
    return suggestions.slice(0, 4);
  };

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string, category: StotraCategory | 'all') => {
      if (!query.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      try {
        setIsSearching(true);
        let results: Stotra[] = [];

        if (category === 'all') {
          results = await stotraService.searchStotras(selectedLanguage, query);
        } else {
          const categoryResults = await stotraService.getStotrasByLanguageAndCategory(selectedLanguage, category);
          results = categoryResults.filter(stotra => 
            stotra.title.toLowerCase().includes(query.toLowerCase()) ||
            stotra.nativeTitle.toLowerCase().includes(query.toLowerCase()) ||
            stotra.description.toLowerCase().includes(query.toLowerCase()) ||
            stotra.author?.toLowerCase().includes(query.toLowerCase())
          );
        }

        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500),
    [selectedLanguage]
  );

  useEffect(() => {
    debouncedSearch(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory, debouncedSearch]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);
    
    if (query.trim()) {
      // Add to recent searches
      setRecentSearches(prev => {
        const filtered = prev.filter(item => item !== query);
        return [query, ...filtered].slice(0, 5);
      });
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleStotraPress = (stotraId: string) => {
    navigation.navigate('Reader', { stotraId });
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSuggestions(false);
  };

  const renderSearchSuggestion = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[styles.suggestionItem, { backgroundColor: theme.colors.surface }]}
      onPress={() => handleSuggestionPress(item)}
    >
      <List.Item
        title={item}
        left={(props) => <List.Icon {...props} icon="magnify" />}
        titleStyle={[styles.suggestionText, { color: theme.colors.onSurface }]}
      />
    </TouchableOpacity>
  );

  const renderRecentSearch = ({ item }: { item: string }) => (
    <Chip
      mode="outlined"
      onPress={() => handleSuggestionPress(item)}
      style={styles.recentChip}
      textStyle={{ color: theme.colors.primary }}
    >
      {item}
    </Chip>
  );

  const renderPopularSearch = ({ item }: { item: string }) => (
    <Chip
      mode="outlined"
      onPress={() => handleSuggestionPress(item)}
      style={[styles.popularChip, { backgroundColor: theme.colors.primaryContainer }]}
      textStyle={{ color: theme.colors.onPrimaryContainer }}
    >
      {item}
    </Chip>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Search Header */}
      <View style={[styles.searchHeader, { backgroundColor: theme.colors.surface }]}>
        <Searchbar
          placeholder={`Search in ${currentLanguage.nativeName}...`}
          onChangeText={handleSearch}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          iconColor={theme.colors.onSurface}
          inputStyle={{ color: theme.colors.onSurface }}
          onClearIconPress={clearSearch}
        />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Filter */}
        {searchQuery && (
          <View style={styles.categoryFilter}>
            <Text style={[styles.filterTitle, { color: theme.colors.primary }]}>
              Filter by Category
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterChips}
            >
              <Chip
                selected={selectedCategory === 'all'}
                onPress={() => setSelectedCategory('all')}
                style={styles.filterChip}
              >
                All
              </Chip>
              {STOTRA_CATEGORIES.map((categoryInfo) => (
                <Chip
                  key={categoryInfo.id}
                  selected={selectedCategory === categoryInfo.id}
                  onPress={() => setSelectedCategory(categoryInfo.id)}
                  style={styles.filterChip}
                >
                  {categoryInfo.name}
                </Chip>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Search Suggestions */}
        {showSuggestions && searchQuery && (
          <Card style={[styles.suggestionsCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Suggestions
              </Text>
              <FlatList
                data={getSearchSuggestions(searchQuery)}
                renderItem={renderSearchSuggestion}
                keyExtractor={(item) => item}
                scrollEnabled={false}
              />
            </Card.Content>
          </Card>
        )}

        {/* Recent Searches */}
        {!searchQuery && recentSearches.length > 0 && (
          <Card style={[styles.recentCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                  Recent Searches
                </Text>
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => setRecentSearches([])}
                  iconColor={theme.colors.onSurface}
                />
              </View>
              <View style={styles.chipContainer}>
                {recentSearches.map((search, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    onPress={() => handleSuggestionPress(search)}
                    style={styles.recentChip}
                    textStyle={{ color: theme.colors.primary }}
                  >
                    {search}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Popular Searches */}
        {!searchQuery && (
          <Card style={[styles.popularCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Popular Searches
              </Text>
              <View style={styles.chipContainer}>
                {popularSearches.map((search, index) => (
                  <Chip
                    key={index}
                    mode="outlined"
                    onPress={() => handleSuggestionPress(search)}
                    style={[styles.popularChip, { backgroundColor: theme.colors.primaryContainer }]}
                    textStyle={{ color: theme.colors.onPrimaryContainer }}
                  >
                    {search}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>
        )}

        {/* Search Results */}
        {searchQuery && (
          <View style={styles.resultsContainer}>
            <View style={styles.resultsHeader}>
              <Text style={[styles.resultsTitle, { color: theme.colors.primary }]}>
                Search Results
              </Text>
              {isSearching ? (
                <ActivityIndicator size="small" color={theme.colors.primary} />
              ) : (
                <Text style={[styles.resultsCount, { color: theme.colors.onSurface }]}>
                  {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </Text>
              )}
            </View>
            
            {!isSearching && searchResults.length === 0 && searchQuery && (
              <Card style={[styles.noResultsCard, { backgroundColor: theme.colors.surface }]}>
                <Card.Content>
                  <Text style={[styles.noResultsTitle, { color: theme.colors.onSurface }]}>
                    No results found
                  </Text>
                  <Text style={[styles.noResultsDescription, { color: theme.colors.onSurface }]}>
                    Try adjusting your search terms or browse by category
                  </Text>
                </Card.Content>
              </Card>
            )}

            {!isSearching && searchResults.length > 0 && (
              <StotraList
                showCategories={false}
                searchQuery={searchQuery}
                onStotraPress={handleStotraPress}
              />
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchBar: {
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  categoryFilter: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterChips: {
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  suggestionsCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  suggestionItem: {
    borderRadius: 8,
    marginBottom: 4,
  },
  suggestionText: {
    fontSize: 16,
  },
  recentCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  popularCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentChip: {
    marginBottom: 8,
  },
  popularChip: {
    marginBottom: 8,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultsCount: {
    fontSize: 14,
  },
  noResultsCard: {
    borderRadius: 12,
    marginBottom: 16,
  },
  noResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  noResultsDescription: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SearchScreen; 