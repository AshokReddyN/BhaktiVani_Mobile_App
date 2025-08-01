import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Button, Card, List, Switch, Divider } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../store';
import { saveTheme, ThemeMode } from '../../store/slices/themeSlice';

type RootStackParamList = {
  Home: undefined;
  Reader: undefined;
  Settings: undefined;
  Favorites: undefined;
};

const SettingsScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const { mode, isDark } = useAppSelector((state) => state.theme);

  const handleThemeToggle = () => {
    const newMode: ThemeMode = isDark ? 'light' : 'dark';
    dispatch(saveTheme(newMode));
  };

  const handleAutoTheme = () => {
    dispatch(saveTheme('auto'));
  };

  const handleNavigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Settings
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
            Customize your app experience
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Appearance
          </Text>
          
          <List.Item
            title="Dark Mode"
            description={`Currently using ${mode} theme`}
            left={props => <List.Icon {...props} icon="palette" />}
            right={() => (
              <Switch
                value={isDark && mode !== 'auto'}
                onValueChange={handleThemeToggle}
                disabled={mode === 'auto'}
              />
            )}
          />
          
          <Divider />
          
          <List.Item
            title="Auto Theme"
            description="Follow system theme"
            left={props => <List.Icon {...props} icon="brightness-auto" />}
            right={() => (
              <Switch
                value={mode === 'auto'}
                onValueChange={handleAutoTheme}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Reading Preferences
          </Text>
          
          <List.Item
            title="Font Size"
            description="Medium"
            left={props => <List.Icon {...props} icon="format-font-size-increase" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <Divider />
          
          <List.Item
            title="Language"
            description="Kannada, Sanskrit, Telugu"
            left={props => <List.Icon {...props} icon="translate" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <Divider />
          
          <List.Item
            title="Offline Storage"
            description="Manage downloaded texts"
            left={props => <List.Icon {...props} icon="download" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            About
          </Text>
          
          <List.Item
            title="Version"
            description="1.0.0"
            left={props => <List.Icon {...props} icon="information" />}
          />
          
          <Divider />
          
          <List.Item
            title="Privacy Policy"
            left={props => <List.Icon {...props} icon="shield-account" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          
          <Divider />
          
          <List.Item
            title="Terms of Service"
            left={props => <List.Icon {...props} icon="file-document" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button 
          mode="contained" 
          onPress={handleNavigateToHome}
          style={styles.button}
        >
          Back to Home
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  card: {
    margin: 8,
    elevation: 4,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonContainer: {
    padding: 16,
    alignItems: 'center',
  },
  button: {
    minWidth: 200,
  },
});

export default SettingsScreen;