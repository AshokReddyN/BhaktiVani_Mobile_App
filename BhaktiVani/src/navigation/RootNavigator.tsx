import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { useThemeContext } from '../constants/theme';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import ReaderScreen from '../screens/reader/ReaderScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';
import LibraryScreen from '../screens/library/LibraryScreen';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  const theme = useTheme();
  const { theme: currentTheme, isDark, isSepia } = useThemeContext();

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
          title: 'Library',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Reader" 
        component={ReaderScreen} 
        options={{ 
          title: 'Reader',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Settings',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ 
          title: 'Favorites',
          headerShown: true,
        }} 
      />
    </Stack.Navigator>
  );
};

export default RootNavigator; 