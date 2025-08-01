import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';

const AppContent: React.FC = () => {
  const { theme, isDarkTheme } = useContext(ThemeContext);
  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer theme={theme}>
          <RootNavigator />
          <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </StoreProvider>
  );
}
