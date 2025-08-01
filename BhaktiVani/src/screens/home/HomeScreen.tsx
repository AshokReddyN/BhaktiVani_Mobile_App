import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Button } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Reader: undefined;
  Settings: undefined;
  Favorites: undefined;
};

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigateToReader = () => {
    navigation.navigate('Reader');
  };

  const handleNavigateToFavorites = () => {
    navigation.navigate('Favorites');
  };

  const handleNavigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Welcome to BhaktiVani
      </Text>
      <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
        Your gateway to Hindu devotional texts
      </Text>
      <Text style={[styles.description, { color: theme.colors.onSurface }]}>
        Access sacred texts in Kannada, Sanskrit, and Telugu with offline reading capabilities.
      </Text>
      
      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleNavigateToReader}
          style={styles.button}
          icon="book-open"
        >
          Start Reading
        </Button>
        
        <Button 
          mode="outlined" 
          onPress={handleNavigateToFavorites}
          style={styles.button}
          icon="heart"
        >
          My Favorites
        </Button>
        
        <Button 
          mode="outlined" 
          onPress={handleNavigateToSettings}
          style={styles.button}
          icon="cog"
        >
          Settings
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginVertical: 8,
    paddingVertical: 8,
  },
});

export default HomeScreen; 