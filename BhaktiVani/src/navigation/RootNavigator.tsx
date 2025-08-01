import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';

// Import screens here when created
import HomeScreen from '../screens/home/HomeScreen';
// import ReaderScreen from '../screens/reader/ReaderScreen';
// import SettingsScreen from '../screens/settings/SettingsScreen';
// import FavoritesScreen from '../screens/favorites/FavoritesScreen';
// import SearchScreen from '../screens/search/SearchScreen';

const Stack = createStackNavigator();

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
      }}
    >
      {/* Add screens here when created */}
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'BhaktiVani' }} />
      {/* <Stack.Screen name="Reader" component={ReaderScreen} options={{ title: 'Reader' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} /> */}
    </Stack.Navigator>
  );
};

export default RootNavigator; 