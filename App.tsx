import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

// It's important to wrap the app in gesture handler provider
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LanguageProvider>
        <SettingsProvider>
          <FavoritesProvider>
            <NavigationContainer>
              <SafeAreaView style={styles.container}>
                <StatusBar barStyle={'dark-content'} />
                <RootNavigator />
              </SafeAreaView>
            </NavigationContainer>
          </FavoritesProvider>
        </SettingsProvider>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
