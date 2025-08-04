import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme, Card, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from '../../constants/theme';
import { useAccessibilityContext } from '../../contexts/AccessibilityContext';

const AccessibilityTest: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { theme: currentTheme, isHighContrast } = useThemeContext();
  const { settings, getScaledFontSize, getScaledPadding } = useAccessibilityContext();

  const testText = "This is a test text to verify accessibility features including font scaling, high contrast mode, and increased padding. The text should be larger when large text is enabled and the padding should be increased when that option is enabled.";

  const sampleFontSizes = [12, 14, 16, 18, 20, 24, 28, 32];

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
          {sampleFontSizes.map((size, index) => (
            <Text 
              key={index}
              style={[
                styles.testText, 
                { 
                  fontSize: getScaledFontSize(size),
                  color: theme.colors.onSurface,
                  marginBottom: getScaledPadding(8)
                }
              ]}
            >
              Font size {size}px (scaled: {getScaledFontSize(size)}px)
            </Text>
          ))}
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
            Sample Content
          </Text>
          <Text style={[
            styles.contentText, 
            { 
              fontSize: getScaledFontSize(16),
              color: theme.colors.onSurface,
              lineHeight: getScaledFontSize(16) * 1.5
            }
          ]}>
            {testText}
          </Text>
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
            <View style={[styles.colorBox, { backgroundColor: theme.colors.error }]}>
              <Text style={[styles.colorText, { color: theme.colors.onError }]}>
                Error
              </Text>
            </View>
            <View style={[styles.colorBox, { backgroundColor: theme.colors.success }]}>
              <Text style={[styles.colorText, { color: theme.colors.onSurface }]}>
                Success
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
  contentText: {
    fontSize: 16,
  },
  paddingTest: {
    borderWidth: 2,
    borderRadius: 8,
    marginTop: 8,
  },
  colorTest: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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

export default AccessibilityTest; 