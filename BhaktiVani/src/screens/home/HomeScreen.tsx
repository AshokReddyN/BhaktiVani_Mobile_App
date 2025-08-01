import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Button, Card, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { selectedLanguage, setSelectedLanguage, currentLanguage } = useLanguageContext();

  const handleStartReading = () => {
    navigation.navigate('Reader' as never);
  };

  const handleViewFavorites = () => {
    navigation.navigate('Favorites' as never);
  };

  const handleOpenSettings = () => {
    navigation.navigate('Settings' as never);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Welcome to BhaktiVani
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
          Your gateway to Hindu devotional texts
        </Text>
      </View>

      {/* Language Selection */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Select Language
          </Text>
          <Text style={[styles.sectionDescription, { color: theme.colors.onSurface }]}>
            Choose your preferred language for reading devotional texts
          </Text>
          
          <View style={styles.languageContainer}>
            {SUPPORTED_LANGUAGES.map((language) => (
              <Chip
                key={language.id}
                selected={selectedLanguage === language.id}
                onPress={() => setSelectedLanguage(language.id)}
                style={[
                  styles.languageChip,
                  selectedLanguage === language.id && { 
                    backgroundColor: theme.colors.primaryContainer 
                  }
                ]}
                textStyle={[
                  styles.languageChipText,
                  selectedLanguage === language.id && { 
                    color: theme.colors.onPrimaryContainer 
                  }
                ]}
              >
                {language.flag} {language.nativeName}
              </Chip>
            ))}
          </View>
          
          <View style={styles.currentLanguageInfo}>
            <Text style={[styles.currentLanguageText, { color: theme.colors.onSurface }]}>
              Current: {currentLanguage.nativeName} ({currentLanguage.name})
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Quick Actions
          </Text>
          
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              icon="book-open"
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              contentStyle={styles.buttonContent}
              onPress={handleStartReading}
            >
              Start Reading
            </Button>
            
            <Button
              mode="outlined"
              icon="heart"
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              onPress={handleViewFavorites}
            >
              View Favorites
            </Button>
            
            <Button
              mode="outlined"
              icon="cog"
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              onPress={handleOpenSettings}
            >
              Settings
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Features */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Features
          </Text>
          
          <View style={styles.featuresList}>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              📖 Offline Reading - Access texts without internet
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              🌙 Dark/Light Mode - Comfortable reading in any light
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              🔤 Multi-language Support - Kannada, Sanskrit, Telugu
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              ❤️ Favorites - Bookmark your favorite texts
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              🔊 Audio Guides - Listen to recitations
            </Text>
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
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
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
  card: {
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  languageChip: {
    marginBottom: 8,
  },
  languageChipText: {
    fontSize: 14,
    fontWeight: '500',
  },
  currentLanguageInfo: {
    alignItems: 'center',
    paddingTop: 8,
  },
  currentLanguageText: {
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    gap: 12,
  },
  actionButton: {
    marginBottom: 8,
  },
  buttonContent: {
    height: 48,
  },
  featuresList: {
    gap: 8,
  },
  feature: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default HomeScreen; 