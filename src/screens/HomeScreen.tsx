import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useLanguage } from '../contexts/LanguageContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { ALL_STOTRAS } from '../assets/data/sample_data';
import { Stotra } from '../types/data';
import { RootStackParamList } from '../navigation/RootNavigator';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const filteredStotras = ALL_STOTRAS.filter(s => s.languageId === language);
  const favoriteStotras = filteredStotras.filter(s => favorites.includes(s.id));
  const regularStotras = filteredStotras.filter(s => !favorites.includes(s.id));

  const renderStotra = ({ item }: { item: Stotra }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onLongPress={() => toggleFavorite(item.id)}
      onPress={() => navigation.navigate('Reader', { stotraId: item.id })}
    >
      <Text style={styles.itemTitle}>{isFavorite(item.id) ? '★ ' : ''}{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.languageSwitcher}>
        {availableLanguages.map(lang => (
          <Button
            key={lang.id}
            title={lang.name}
            onPress={() => setLanguage(lang.id)}
            color={language === lang.id ? '#007AFF' : '#333'}
          />
        ))}
      </View>

      <FlatList
        data={[...favoriteStotras, ...regularStotras]}
        renderItem={renderStotra}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          favoriteStotras.length > 0 ? (
            <Text style={styles.categoryTitle}>Favorites</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Reduced padding to give more space
    backgroundColor: '#f5f5f5',
  },
  languageSwitcher: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 15,
    marginBottom: 10,
  },
  itemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  itemTitle: {
    fontSize: 18,
  },
});

export default HomeScreen;
