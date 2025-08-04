import React from 'react';
import { Easing } from 'react-native';
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

const transitionEasing = Easing.inOut(Easing.ease);

const RootNavigator: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { isDark, isSepia } = useThemeContext();

  // Determine header style based on theme
  const getHeaderStyle = () => {
    if (isDark) {
      return {
        backgroundColor: theme.colors.surface,
        borderBottomColor: theme.colors.outline,
      };
    } else if (isSepia) {
      return {
        backgroundColor: theme.colors.surface,
        borderBottomColor: theme.colors.outline,
      };
    } else {
      return {
        backgroundColor: theme.colors.primary,
        borderBottomColor: theme.colors.primary,
      };
    }
  };

  const getHeaderTintColor = () => {
    if (isDark || isSepia) {
      return theme.colors.onSurface;
    } else {
      return '#fff';
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: getHeaderStyle(),
        headerTintColor: getHeaderTintColor(),
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
              easing: transitionEasing,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 300,
              easing: transitionEasing,
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