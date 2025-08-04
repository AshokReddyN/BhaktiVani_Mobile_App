import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Card, Switch } from 'react-native-paper';
import { useThemeContext } from '../../constants/theme';
import { useAccessibilityContext } from '../../contexts/AccessibilityContext';

const AccessibilityFeatureTest: React.FC = () => {
  const theme = useTheme();
  const { theme: currentTheme, isHighContrast } = useThemeContext();
  const { settings, getScaledFontSize, getScaledPadding } = useAccessibilityContext();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={[styles.title, { color: theme.colors.primary }]}>
        Accessibility Features Test
      </Text>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Current Settings
          </Text>
          <Text style={[styles.settingText, { color: theme.colors.onSurface }]}>
            High Contrast: {settings.isHighContrastEnabled ? 'Enabled' : 'Disabled'}
          </Text>
          <Text style={[styles.settingText, { color: theme.colors.onSurface }]}>
            Large Text: {settings.isLargeTextEnabled ? 'Enabled' : 'Disabled'}
          </Text>
          <Text style={[styles.settingText, { color: theme.colors.onSurface }]}>
            Increased Padding: {settings.isIncreasedPaddingEnabled ? 'Enabled' : 'Disabled'}
          </Text>
          <Text style={[styles.settingText, { color: theme.colors.onSurface }]}>
            System Font Scaling: {settings.isSystemFontScalingEnabled ? 'Enabled' : 'Disabled'}
          </Text>
          <Text style={[styles.settingText, { color: theme.colors.onSurface }]}>
            Current Theme: {currentTheme}
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Font Size Test
          </Text>
          <Text style={[
            styles.testText, 
            { 
              fontSize: getScaledFontSize(16),
              color: theme.colors.onSurface,
              marginBottom: getScaledPadding(8)
            }
          ]}>
            This text uses scaled font size: {getScaledFontSize(16)}px
          </Text>
          <Text style={[
            styles.testText, 
            { 
              fontSize: getScaledFontSize(20),
              color: theme.colors.onSurface,
              marginBottom: getScaledPadding(8)
            }
          ]}>
            Larger text: {getScaledFontSize(20)}px
          </Text>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Padding Test
          </Text>
          <View style={[
            styles.paddingTest, 
            { 
              padding: getScaledPadding(16),
              backgroundColor: theme.colors.primaryContainer,
              borderColor: theme.colors.primary
            }
          ]}>
            <Text style={[styles.testText, { color: theme.colors.onSurface }]}>
              This box has scaled padding: {getScaledPadding(16)}px
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
            Color Test
          </Text>
          <View style={styles.colorTest}>
            <View style={[styles.colorBox, { backgroundColor: theme.colors.primary }]}>
              <Text style={[styles.colorText, { color: theme.colors.onPrimary }]}>
                Primary
              </Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: theme.colors.secondary }]}>
              <Text style={[styles.colorText, { color: theme.colors.onSecondary }]}>
                Secondary
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingText: {
    fontSize: 14,
    marginBottom: 4,
  },
  testText: {
    fontSize: 14,
  },
  paddingTest: {
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 8,
  },
  colorTest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  colorBox: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  colorText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AccessibilityFeatureTest; 