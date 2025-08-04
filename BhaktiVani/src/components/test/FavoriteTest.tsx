import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { stotraService } from '../../services/stotraService';
import { initializationService } from '../../services/initializationService';

const FavoriteTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');

  const testFavoriteToggle = async () => {
    try {
      setTestResult('Testing favorite toggle...');
      
      // Test with a known stotra ID
      const testStotraId = 'k1'; // Hanuman Chalisa from mock data
      
      console.log('Starting favorite toggle test for stotra:', testStotraId);
      
      // Get initial state
      const initialStotra = await stotraService.getStotraById(testStotraId);
      console.log('Initial favorite status:', initialStotra?.isFavorite);
      
      // Toggle favorite
      await stotraService.toggleFavorite(testStotraId);
      console.log('Toggled favorite');
      
      // Get updated state
      const updatedStotra = await stotraService.getStotraById(testStotraId);
      console.log('Updated favorite status:', updatedStotra?.isFavorite);
      
      // Toggle back
      await stotraService.toggleFavorite(testStotraId);
      console.log('Toggled favorite back');
      
      // Get final state
      const finalStotra = await stotraService.getStotraById(testStotraId);
      console.log('Final favorite status:', finalStotra?.isFavorite);
      
      setTestResult('✅ Favorite toggle test completed successfully! Check console for details.');
      
    } catch (error) {
      console.error('Test failed:', error);
      setTestResult(`❌ Test failed: ${error}`);
    }
  };

  const testGetFavorites = async () => {
    try {
      setTestResult('Testing get favorites...');
      
      const favorites = await stotraService.getFavoriteStotras('kannada');
      console.log('Found favorites:', favorites.length);
      favorites.forEach(fav => console.log('-', fav.title, fav.isFavorite));
      
      setTestResult(`✅ Found ${favorites.length} favorites`);
      
    } catch (error) {
      console.error('Get favorites test failed:', error);
      setTestResult(`❌ Get favorites test failed: ${error}`);
    }
  };

  const resetData = async () => {
    try {
      setTestResult('Resetting all data...');
      await initializationService.resetAllData();
      setTestResult('✅ Data reset successfully!');
    } catch (error) {
      console.error('Reset failed:', error);
      setTestResult(`❌ Reset failed: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Functionality Test</Text>
      
      <Button 
        mode="contained" 
        onPress={testFavoriteToggle}
        style={styles.button}
      >
        Test Favorite Toggle
      </Button>
      
      <Button 
        mode="contained" 
        onPress={testGetFavorites}
        style={styles.button}
      >
        Test Get Favorites
      </Button>
      
      <Button 
        mode="outlined" 
        onPress={resetData}
        style={styles.button}
      >
        Reset All Data
      </Button>
      
      <Text style={styles.result}>{testResult}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default FavoriteTest; 