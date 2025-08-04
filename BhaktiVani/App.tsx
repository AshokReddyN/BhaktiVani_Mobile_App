import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './src/store';
import { ThemeProvider, useThemeContext, getCurrentTheme } from './src/constants/theme';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { UILanguageProvider } from './src/contexts/UILanguageContext';
import { ReaderProvider } from './src/contexts/ReaderContext';
import { AccessibilityProvider, useAccessibilityContext } from './src/contexts/AccessibilityContext';
import { offlineService } from './src/services/offlineService';
import RootNavigator from './src/navigation/RootNavigator';
import { initializeLanguageSync, loadSavedUILanguage } from './src/i18n'; // Import initialization functions

// Initialize i18n synchronously before any component renders
initializeLanguageSync();

const AppContent: React.FC = () => {
  const { theme, isDark } = useThemeContext();
  const { settings } = useAccessibilityContext();
  const currentTheme = getCurrentTheme(theme, settings.isHighContrastEnabled);

  useEffect(() => {
    // Initialize services
    const initializeServices = async () => {
      try {
        // Load saved UI language (async)
        await loadSavedUILanguage();
        console.log('UI language loaded successfully');
        
        // Initialize offline service
        await offlineService.init();
        console.log('Offline service initialized successfully');
      } catch (error) {
        console.error('Failed to initialize services:', error);
      }
    };

    initializeServices();
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
        <UILanguageProvider>
          <LanguageProvider>
            <ReaderProvider>
              <AccessibilityProvider>
                <AppContent />
              </AccessibilityProvider>
            </ReaderProvider>
          </LanguageProvider>
        </UILanguageProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}
