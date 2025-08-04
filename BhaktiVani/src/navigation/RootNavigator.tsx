import React, { useCallback, useMemo } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../constants/theme';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import ReaderScreen from '../screens/reader/ReaderScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';
import LibraryScreen from '../screens/library/LibraryScreen';
import DownloadScreen from '../screens/download/DownloadScreen';
import SearchScreen from '../screens/search/SearchScreen';
import AccessibilityTest from '../components/test/AccessibilityTest';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { theme: currentTheme, isDark, isSepia } = useThemeContext();

  // Memoize theme colors to stabilize references
  const themeColors = useMemo(() => ({
    surface: theme.colors.surface,
    outline: theme.colors.outline,
    primary: theme.colors.primary,
    onSurface: theme.colors.onSurface,
  }), [theme.colors.surface, theme.colors.outline, theme.colors.primary, theme.colors.onSurface]);

  // Memoize header style instead of using callback
  const headerStyle = useMemo(() => {
    if (isDark || isSepia) {
      return {
        backgroundColor: themeColors.surface,
        borderBottomColor: themeColors.outline,
      };
    } else {
      return {
        backgroundColor: themeColors.primary,
        borderBottomColor: themeColors.primary,
      };
    }
  }, [isDark, isSepia, themeColors.surface, themeColors.outline, themeColors.primary]);

  // Memoize header tint color instead of using callback
  const headerTintColor = useMemo(() => {
    if (isDark || isSepia) {
      return themeColors.onSurface;
    } else {
      return '#fff';
    }
  }, [isDark, isSepia, themeColors.onSurface]);

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: headerStyle,
        headerTintColor: headerTintColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: {
          backgroundColor: theme.colors.background,
        },
        // Add smooth animations
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 300,
              easing: require('react-native').Easing.inOut(require('react-native').Easing.ease),
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
              easing: require('react-native').Easing.inOut(require('react-native').Easing.ease),
            },
          },
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'BhaktiVani',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Library" 
        component={LibraryScreen} 
        options={{ 
          title: t('navigation.library'),
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Reader" 
        component={ReaderScreen} 
        options={{ 
          title: t('navigation.reader'),
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: t('navigation.settings'),
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ 
          title: t('navigation.favorites'),
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Download" 
        component={DownloadScreen} 
        options={{ 
          title: t('navigation.download'),
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          title: t('navigation.search'),
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="AccessibilityTest" 
        component={AccessibilityTest} 
        options={{ 
          title: 'Accessibility Test',
          headerShown: true,
        }} 
      />
    </Stack.Navigator>
  );
};

export default RootNavigator; 