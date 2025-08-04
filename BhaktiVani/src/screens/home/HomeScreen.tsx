import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Button, Card, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import FavoriteTest from '../../components/test/FavoriteTest';
import LanguageTest from '../../components/test/LanguageTest';
import { initializationService } from '../../services/initializationService';

const HomeScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { selectedLanguage, setSelectedLanguage, currentLanguage } = useLanguageContext();

  // Initialize app with mock data on first load
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializationService.initializeApp();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };
    
    initializeApp();
  }, []);

  const handleStartReading = () => {
    navigation.navigate('Library' as never);
  };

  const handleViewFavorites = () => {
    navigation.navigate('Favorites' as never);
  };

  const handleOpenSettings = () => {
    navigation.navigate('Settings' as never);
  };

  const handleOpenSearch = () => {
    navigation.navigate('Search' as never);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          {t('home.welcome')}
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
          {t('home.subtitle')}
        </Text>
      </View>

      {/* Language Selection */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            {t('home.selectLanguage')}
          </Text>
          <Text style={[styles.sectionDescription, { color: theme.colors.onSurface }]}>
            {t('home.selectLanguageDescription')}
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
              {t('home.currentLanguage')}: {currentLanguage.nativeName} ({currentLanguage.name})
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            {t('home.quickActions')}
          </Text>
          
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              icon="book-open-variant"
              style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
              contentStyle={styles.buttonContent}
              onPress={handleStartReading}
            >
              {t('home.browseLibrary')}
            </Button>
            
            <Button
              mode="outlined"
              icon="heart"
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              onPress={handleViewFavorites}
            >
              {t('home.viewFavorites')}
            </Button>
            
            <Button
              mode="outlined"
              icon="cog"
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              onPress={handleOpenSettings}
            >
              {t('home.settings')}
            </Button>
            
            <Button
              mode="outlined"
              icon="magnify"
              style={styles.actionButton}
              contentStyle={styles.buttonContent}
              onPress={handleOpenSearch}
            >
              {t('home.search')}
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Features */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            {t('home.features')}
          </Text>
          
          <View style={styles.featuresList}>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              {t('home.offlineReading')}
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              {t('home.darkLightMode')}
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              {t('home.multiLanguageSupport')}
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              {t('home.favorites')}
            </Text>
            <Text style={[styles.feature, { color: theme.colors.onSurface }]}>
              {t('home.audioGuides')}
            </Text>
          </View>
        </Card.Content>
    </Card>

    {/* Test Component */}
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <FavoriteTest />
      </Card.Content>
    </Card>

    {/* Language Test Component */}
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <LanguageTest />
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