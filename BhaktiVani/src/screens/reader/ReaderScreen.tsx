import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useLanguageContext } from '../../contexts/LanguageContext';

const ReaderScreen: React.FC = () => {
  const theme = useTheme();
  const { currentLanguage } = useLanguageContext();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Reader
        </Text>
        <Text style={[styles.languageInfo, { color: theme.colors.onSurface }]}>
          Current Language: {currentLanguage.nativeName} ({currentLanguage.name})
        </Text>
      </View>
      
      <View style={[styles.content, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.placeholderText, { color: theme.colors.onSurface }]}>
          Reader content will be displayed here based on the selected language.
        </Text>
        <Text style={[styles.languageText, { color: theme.colors.onSurface }]}>
          Selected: {currentLanguage.nativeName}
        </Text>
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
    marginBottom: 8,
  },
  languageInfo: {
    fontSize: 16,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  languageText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ReaderScreen;