import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ReaderScreen from '../screens/ReaderScreen';
import { Stotra } from '../types/data';

export type RootStackParamList = {
  Home: undefined;
  Reader: { stotraId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // The HomeScreen already has a custom header
      />
      <Stack.Screen name="Reader" component={ReaderScreen} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
