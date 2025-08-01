import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

// Import screens
import HomeScreen from '../screens/home/HomeScreen';
import ReaderScreen from '../screens/reader/ReaderScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';

export type RootStackParamList = {
  Home: undefined;
  Reader: undefined;
  Settings: undefined;
  Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // Modern slide animation
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'BhaktiVani',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 4,
          },
        }} 
      />
      
      <Stack.Screen 
        name="Reader" 
        component={ReaderScreen} 
        options={{ 
          title: 'Text Reader',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 4,
          },
        }} 
      />
      
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Settings',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 4,
          },
        }} 
      />
      
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ 
          title: 'Favorites',
          headerStyle: {
            backgroundColor: theme.colors.primary,
            elevation: 4,
          },
        }} 
      />
    </Stack.Navigator>
  );
};

export default RootNavigator; 