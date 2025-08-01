import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Switch, List, Divider } from 'react-native-paper';
import { useThemeContext } from '../../constants/theme';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const { isDark, toggleTheme } = useThemeContext();
  const { selectedLanguage, setSelectedLanguage, currentLanguage } = useLanguageContext();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Settings
        </Text>
      </View>

      {/* Theme Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Appearance
        </Text>
        
        <List.Item
          title="Dark Mode"
          description="Toggle between light and dark themes"
          left={(props) => <List.Icon {...props} icon="theme-light-dark" />}
          right={() => (
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          )}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />
      </View>

      <Divider style={styles.divider} />

      {/* Language Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          Language
        </Text>
        
        <Text style={[styles.currentLanguage, { color: theme.colors.onSurface }]}>
          Current: {currentLanguage.nativeName} ({currentLanguage.name})
        </Text>

        {SUPPORTED_LANGUAGES.map((language) => (
          <List.Item
            key={language.id}
            title={`${language.flag} ${language.nativeName}`}
            description={language.name}
            left={(props) => <List.Icon {...props} icon="translate" />}
            onPress={() => setSelectedLanguage(language.id)}
            titleStyle={[
              styles.listItemTitle, 
              { 
                color: selectedLanguage === language.id 
                  ? theme.colors.primary 
                  : theme.colors.onSurface 
              }
            ]}
            descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
            style={[
              styles.languageItem,
              selectedLanguage === language.id && { backgroundColor: theme.colors.primaryContainer }
            ]}
          />
        ))}
      </View>

      <Divider style={styles.divider} />

      {/* App Info */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          About
        </Text>
        
        <List.Item
          title="BhaktiVani"
          description="Version 1.0.0"
          left={(props) => <List.Icon {...props} icon="information" />}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />
        
        <List.Item
          title="Offline Access"
          description="All texts available offline"
          left={(props) => <List.Icon {...props} icon="wifi-off" />}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
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
  },
  section: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 8,
  },
  currentLanguage: {
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  listItemDescription: {
    fontSize: 14,
  },
  languageItem: {
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
  },
  divider: {
    marginVertical: 8,
  },
});

export default SettingsScreen;