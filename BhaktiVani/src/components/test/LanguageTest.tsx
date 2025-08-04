import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, Card, Button } from 'react-native-paper';
import { useLocalization } from '../../hooks/useLocalization';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

const LanguageTest: React.FC = () => {
  const theme = useTheme();
  const { t, selectedLanguage, setSelectedLanguage, currentLanguage } = useLocalization();

  const handleLanguageChange = (languageId: string) => {
    setSelectedLanguage(languageId as any);
  };

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          {t('home.welcome')}
        </Text>
        
        <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
          {t('home.subtitle')}
        </Text>

        <Text style={[styles.currentLanguage, { color: theme.colors.onSurface }]}>
          {t('home.currentLanguage')}: {currentLanguage.nativeName} ({currentLanguage.name})
        </Text>

        <View style={styles.languageButtons}>
          {SUPPORTED_LANGUAGES.map((language) => (
            <Button
              key={language.id}
              mode={selectedLanguage === language.id ? 'contained' : 'outlined'}
              onPress={() => handleLanguageChange(language.id)}
              style={styles.languageButton}
              contentStyle={styles.buttonContent}
            >
              {language.flag} {language.nativeName}
            </Button>
          ))}
        </View>

        <View style={styles.testSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            {t('settings.title')}
          </Text>
          <Text style={[styles.testText, { color: theme.colors.onSurface }]}>
            {t('settings.appearance')}: {t('settings.lightMode')}
          </Text>
          <Text style={[styles.testText, { color: theme.colors.onSurface }]}>
            {t('navigation.library')} | {t('navigation.favorites')} | {t('navigation.search')}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  currentLanguage: {
    fontSize: 14,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  languageButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  languageButton: {
    marginBottom: 8,
  },
  buttonContent: {
    height: 40,
  },
  testSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  testText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default LanguageTest; 