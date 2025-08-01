import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme, Button, Card, IconButton, Chip } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Reader: undefined;
  Settings: undefined;
  Favorites: undefined;
};

interface FavoriteItem {
  id: string;
  title: string;
  category: string;
  language: string;
  dateAdded: string;
}

const mockFavorites: FavoriteItem[] = [
  {
    id: '1',
    title: 'Bhagavad Gita - Chapter 1',
    category: 'Scripture',
    language: 'Sanskrit',
    dateAdded: '2024-01-15',
  },
  {
    id: '2',
    title: 'Hanuman Chalisa',
    category: 'Prayer',
    language: 'Kannada',
    dateAdded: '2024-01-14',
  },
  {
    id: '3',
    title: 'Vishnu Sahasranama',
    category: 'Stotra',
    language: 'Telugu',
    dateAdded: '2024-01-13',
  },
];

const FavoritesScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToReader = () => {
    navigation.navigate('Reader');
  };

  const handleRemoveFavorite = (id: string) => {
    // TODO: Implement remove favorite functionality
    console.log('Remove favorite:', id);
  };

  const renderFavoriteItem = ({ item }: { item: FavoriteItem }) => (
    <Card style={[styles.favoriteCard, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <View style={styles.favoriteHeader}>
          <View style={styles.favoriteInfo}>
            <Text style={[styles.favoriteTitle, { color: theme.colors.onSurface }]}>
              {item.title}
            </Text>
            <View style={styles.chipContainer}>
              <Chip mode="outlined" compact style={styles.chip}>
                {item.category}
              </Chip>
              <Chip mode="outlined" compact style={styles.chip}>
                {item.language}
              </Chip>
            </View>
            <Text style={[styles.dateAdded, { color: theme.colors.onSurface }]}>
              Added: {new Date(item.dateAdded).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.favoriteActions}>
            <IconButton
              icon="book-open"
              size={24}
              onPress={handleNavigateToReader}
            />
            <IconButton
              icon="heart-remove"
              size={24}
              onPress={() => handleRemoveFavorite(item.id)}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.headerCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Favorites
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
            Your saved devotional texts
          </Text>
        </Card.Content>
      </Card>

      {mockFavorites.length > 0 ? (
        <FlatList
          data={mockFavorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Card style={[styles.emptyCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Content style={styles.emptyContent}>
              <Text style={[styles.emptyTitle, { color: theme.colors.onSurface }]}>
                No Favorites Yet
              </Text>
              <Text style={[styles.emptyDescription, { color: theme.colors.onSurface }]}>
                Start adding texts to your favorites to see them here
              </Text>
              <Button
                mode="contained"
                onPress={handleNavigateToHome}
                style={styles.emptyButton}
              >
                Browse Texts
              </Button>
            </Card.Content>
          </Card>
        </View>
      )}

      <View style={styles.bottomButtonContainer}>
        <Button 
          mode="contained" 
          onPress={handleNavigateToHome}
          style={styles.bottomButton}
        >
          Back to Home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 16,
    marginBottom: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
    paddingTop: 8,
  },
  favoriteCard: {
    marginBottom: 12,
    elevation: 2,
  },
  favoriteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  favoriteInfo: {
    flex: 1,
    marginRight: 8,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  chip: {
    marginRight: 8,
  },
  dateAdded: {
    fontSize: 12,
    opacity: 0.7,
  },
  favoriteActions: {
    flexDirection: 'row',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  emptyCard: {
    elevation: 4,
  },
  emptyContent: {
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  emptyButton: {
    minWidth: 150,
  },
  bottomButtonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  bottomButton: {
    minWidth: 200,
  },
});

export default FavoritesScreen;