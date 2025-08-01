import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';
import { ThemeContext } from '../../context/ThemeContext';

const SettingsScreen: React.FC = () => {
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.row}>
        <Text variant="bodyLarge">Dark Mode</Text>
        <Switch value={isDarkTheme} onValueChange={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
});

export default SettingsScreen;
