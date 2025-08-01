import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';
import { ThemeProvider, useThemeContext, getCurrentTheme } from './src/constants/theme';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ReaderProvider } from './src/contexts/ReaderContext';
import RootNavigator from './src/navigation/RootNavigator';

const AppContent: React.FC = () => {
  const { isDark } = useThemeContext();
  const theme = getCurrentTheme(isDark);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style={isDark ? 'light' : 'dark'} />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <ReaderProvider>
            <AppContent />
          </ReaderProvider>
        </LanguageProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
