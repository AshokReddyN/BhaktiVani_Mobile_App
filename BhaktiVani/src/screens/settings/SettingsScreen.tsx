import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, List, Divider, RadioButton, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../constants/theme';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useAccessibilityContext } from '../../contexts/AccessibilityContext';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';

const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme: currentTheme, setTheme, isDark, isSepia } = useThemeContext();
  const { selectedLanguage, setSelectedLanguage, currentLanguage } = useLanguageContext();
  const { settings, updateSettings } = useAccessibilityContext();

  const themeOptions = [
    { value: 'light', label: t('settings.lightMode'), icon: 'white-balance-sunny', description: t('settings.lightModeDescription') },
    { value: 'dark', label: t('settings.darkMode'), icon: 'moon-waning-crescent', description: t('settings.darkModeDescription') },
    { value: 'sepia', label: t('settings.warmMode'), icon: 'palette', description: t('settings.warmModeDescription') },
    { value: 'highContrast', label: t('settings.highContrastMode'), icon: 'contrast', description: t('settings.highContrastModeDescription') },
  ];

  const handleOpenDownloadScreen = () => {
    navigation.navigate('Download' as never);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          {t('settings.title')}
        </Text>
      </View>

      {/* Theme Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('settings.appearance')}
        </Text>
        
        {themeOptions.map((option) => (
          <List.Item
            key={option.value}
            title={option.label}
            description={option.description}
            left={(props) => <List.Icon {...props} icon={option.icon} />}
            right={() => (
              <RadioButton
                value={option.value}
                status={currentTheme === option.value ? 'checked' : 'unchecked'}
                onPress={() => setTheme(option.value as 'light' | 'dark' | 'sepia')}
                color={theme.colors.primary}
              />
            )}
            titleStyle={[
              styles.listItemTitle, 
              { 
                color: currentTheme === option.value 
                  ? theme.colors.primary 
                  : theme.colors.onSurface 
              }
            ]}
            descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
            style={[
              styles.themeItem,
              currentTheme === option.value && { backgroundColor: theme.colors.primaryContainer }
            ]}
          />
        ))}
      </View>

      <Divider style={styles.divider} />

      {/* Accessibility Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('settings.accessibility')}
        </Text>
        
        <List.Item
          title={t('settings.highContrast')}
          description={t('settings.highContrastDescription')}
          left={(props) => <List.Icon {...props} icon="contrast" />}
          right={() => (
            <Switch
              value={settings.isHighContrastEnabled}
              onValueChange={(value) => updateSettings({ isHighContrastEnabled: value })}
              color={theme.colors.primary}
            />
          )}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />

        <List.Item
          title={t('settings.largeText')}
          description={t('settings.largeTextDescription')}
          left={(props) => <List.Icon {...props} icon="format-size" />}
          right={() => (
            <Switch
              value={settings.isLargeTextEnabled}
              onValueChange={(value) => updateSettings({ isLargeTextEnabled: value })}
              color={theme.colors.primary}
            />
          )}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />

        <List.Item
          title={t('settings.increasedPadding')}
          description={t('settings.increasedPaddingDescription')}
          left={(props) => <List.Icon {...props} icon="space-bar" />}
          right={() => (
            <Switch
              value={settings.isIncreasedPaddingEnabled}
              onValueChange={(value) => updateSettings({ isIncreasedPaddingEnabled: value })}
              color={theme.colors.primary}
            />
          )}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />

        <List.Item
          title={t('settings.systemFontScaling')}
          description={t('settings.systemFontScalingDescription')}
          left={(props) => <List.Icon {...props} icon="text" />}
          right={() => (
            <Switch
              value={settings.isSystemFontScalingEnabled}
              onValueChange={(value) => updateSettings({ isSystemFontScalingEnabled: value })}
              color={theme.colors.primary}
            />
          )}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />

        <List.Item
          title="Test Accessibility Features"
          description="Open accessibility test screen to verify features"
          left={(props) => <List.Icon {...props} icon="test-tube" />}
          onPress={() => navigation.navigate('AccessibilityTest' as never)}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />
      </View>

      <Divider style={styles.divider} />

      {/* Offline Content Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('settings.offlineContent')}
        </Text>
        
        <List.Item
          title={t('settings.downloadContent')}
          description={t('settings.downloadContentDescription')}
          left={(props) => <List.Icon {...props} icon="download" />}
          onPress={handleOpenDownloadScreen}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />
      </View>

      <Divider style={styles.divider} />

      {/* Language Settings */}
      <View style={[styles.section, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
          {t('settings.language')}
        </Text>
        
        <Text style={[styles.currentLanguage, { color: theme.colors.onSurface }]}>
          {t('home.currentLanguage')}: {currentLanguage.nativeName} ({currentLanguage.name})
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
          {t('settings.about')}
        </Text>
        
        <List.Item
          title={t('settings.appName')}
          description={t('settings.version')}
          left={(props) => <List.Icon {...props} icon="information" />}
          titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
          descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
        />
        
        <List.Item
          title={t('settings.offlineAccess')}
          description={t('settings.offlineAccessDescription')}
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
  themeItem: {
    marginHorizontal: 8,
    marginVertical: 2,
    borderRadius: 8,
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