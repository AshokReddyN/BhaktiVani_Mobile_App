import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { LanguageProvider } from './src/contexts/LanguageContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <LanguageProvider>
      <SettingsProvider>
        <FavoritesProvider>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <HomeScreen />
          </SafeAreaView>
        </FavoritesProvider>
      </SettingsProvider>
    </LanguageProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
