import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';
import ThemeProvider from './src/components/ThemeProvider';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <RootNavigator />
            <StatusBar style="auto" />
          </NavigationContainer>
        </SafeAreaProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
