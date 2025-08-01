import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import { useThemeContext } from '../constants/theme';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import ReaderScreen from '../screens/reader/ReaderScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  const theme = useTheme();
  const { isDark } = useThemeContext();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? theme.colors.surface : theme.colors.primary,
        },
        headerTintColor: isDark ? theme.colors.onSurface : '#fff',
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