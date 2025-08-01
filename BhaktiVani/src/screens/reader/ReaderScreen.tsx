import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Button, Card } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Reader: undefined;
  Settings: undefined;
  Favorites: undefined;
};

const ReaderScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  const handleNavigateToFavorites = () => {
    navigation.navigate('Favorites');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Text Reader
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
            Read your selected devotional texts here
          </Text>
          <Text style={[styles.description, { color: theme.colors.onSurface }]}>
            This screen will display the selected Hindu devotional texts with features like:
          </Text>
          
          <View style={styles.featuresList}>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              • Adjustable font size and style
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              • Bookmarking capabilities
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              • Offline reading support
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              • Multi-language support (Kannada, Sanskrit, Telugu)
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button 
              mode="contained" 
              onPress={handleNavigateToHome}
              style={styles.button}
            >
              Back to Home
            </Button>
            <Button 
              mode="outlined" 
              onPress={handleNavigateToFavorites}
              style={styles.button}
            >
              View Favorites
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    margin: 8,
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
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  featuresList: {
    marginBottom: 24,
  },
  feature: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  button: {
    marginHorizontal: 4,
    marginVertical: 4,
  },
});

export default ReaderScreen;