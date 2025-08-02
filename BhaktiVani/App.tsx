import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';
import { ThemeProvider, useThemeContext, getCurrentTheme } from './src/constants/theme';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { ReaderProvider } from './src/contexts/ReaderContext';
import { offlineService } from './src/services/offlineService';
import RootNavigator from './src/navigation/RootNavigator';

const AppContent: React.FC = () => {
  const { theme, isDark } = useThemeContext();
  const currentTheme = getCurrentTheme(theme);

  useEffect(() => {
    // Initialize offline service
    const initOfflineService = async () => {
      try {
        await offlineService.init();
        console.log('Offline service initialized successfully');
      } catch (error) {
        console.error('Failed to initialize offline service:', error);
      }
    };

    initOfflineService();
  }, []);

  return (
    <PaperProvider theme={currentTheme}>
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
