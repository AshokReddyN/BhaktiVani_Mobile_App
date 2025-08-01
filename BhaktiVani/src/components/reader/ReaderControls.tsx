import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, ScrollView } from 'react-native';
import { useTheme, Button, Switch, List, Chip, Card } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import { useReaderContext } from '../../contexts/ReaderContext';
import { fontSizes, lineHeights, letterSpacing } from '../../constants/fonts';
import ReaderContent from './ReaderContent';

interface ReaderControlsProps {
  visible: boolean;
  onDismiss: () => void;
}

const ReaderControls: React.FC<ReaderControlsProps> = ({ visible, onDismiss }) => {
  const theme = useTheme();
  const { settings, updateSettings, isLoading } = useReaderContext();
  const [localSettings, setLocalSettings] = useState(settings);
  const [previewContent] = useState({
    title: 'Preview Text',
    nativeTitle: 'ಪ್ರಿವ್ಯೂ ಟೆಕ್ಸ್ಟ್',
    content: `ಓಂ ನಮಃ ಶಿವಾಯ

ಶ್ರೀ ಗುರು ಚರಣ ಸರೋಜ ರಜ ನಿಜ ಮನು ಮುಕುರ ಸುಧಾರಿ
ಬರನೌ ರಘುಬರ ಬಿಮಲ ಯಶು ಜೋ ದಾಯಕು ಫಲ ಚಾರಿ

ಬುದ್ಧಿ ಹೀನ ತನು ಜಾನಿಕೆ ಸುಮಿರೌ ಪವನ ಕುಮಾರ
ಬಲ ಬುದ್ಧಿ ಬಿದ್ಧಿ ದೇಹು ಮೋಹಿ ಹರಹು ಕಲೇಸ ಬಿಕಾರ

ಜೈ ಹನುಮಾನ್ ಗ್ಯಾನ ಗುಣ ಸಾಗರ
ಜೈ ಕಪೀಸ ತಿಹುಂ ಲೋಕ ಉಜಾಗರ

ರಾಮದೂತ ಅತುಲಿತ ಬಲ ಧಾಮಾ
ಅಂಜನಿ ಪುತ್ರ ಪವನಸುತ ನಾಮಾ`,
  });

  // Update local settings when context settings change
  useEffect(() => {
    if (!isLoading) {
      setLocalSettings(settings);
    }
  }, [settings, isLoading]);

  const handleSave = async () => {
    await updateSettings(localSettings);
    onDismiss();
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    onDismiss();
  };

  const handleReset = async () => {
    await updateSettings({
      fontSize: 'lg',
      lineHeight: 'relaxed',
      letterSpacing: 'normal',
      layout: 'paragraph',
      theme: 'sepia',
      justifyText: true,
      showLineNumbers: false,
    });
  };

  const fontSizeOptions = Object.keys(fontSizes) as Array<keyof typeof fontSizes>;
  const lineHeightOptions = Object.keys(lineHeights) as Array<keyof typeof lineHeights>;
  const letterSpacingOptions = Object.keys(letterSpacing) as Array<keyof typeof letterSpacing>;

  const getFontSizeValue = (size: keyof typeof fontSizes): number => {
    const index = fontSizeOptions.indexOf(size);
    return index / (fontSizeOptions.length - 1);
  };

  const getFontSizeFromValue = (value: number): keyof typeof fontSizes => {
    const index = Math.round(value * (fontSizeOptions.length - 1));
    return fontSizeOptions[index];
  };

  const getLineHeightValue = (height: keyof typeof lineHeights): number => {
    const index = lineHeightOptions.indexOf(height);
    return index / (lineHeightOptions.length - 1);
  };

  const getLineHeightFromValue = (value: number): keyof typeof lineHeights => {
    const index = Math.round(value * (lineHeightOptions.length - 1));
    return lineHeightOptions[index];
  };

  if (isLoading) {
    return (
      <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
            Loading settings...
          </Text>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onDismiss={onDismiss}
    >
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>
            Reader Settings
          </Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Font Size Slider */}
          <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Font Size
              </Text>
              <View style={styles.sliderContainer}>
                <Slider
                  value={getFontSizeValue(localSettings.fontSize)}
                  onValueChange={(value: number) => 
                    setLocalSettings(prev => ({ 
                      ...prev, 
                      fontSize: getFontSizeFromValue(value) 
                    }))
                  }
                  minimumValue={0}
                  maximumValue={1}
                  step={1 / (fontSizeOptions.length - 1)}
                  style={styles.slider}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor={theme.colors.surfaceVariant}
                  thumbTintColor={theme.colors.primary}
                />
                <View style={styles.sliderLabels}>
                  <Text style={[styles.sliderLabel, { color: theme.colors.onSurface }]}>
                    Small
                  </Text>
                  <Text style={[styles.sliderLabel, { color: theme.colors.onSurface }]}>
                    Large
                  </Text>
                </View>
                <Text style={[styles.currentValue, { color: theme.colors.primary }]}>
                  {localSettings.fontSize.toUpperCase()}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Line Height Slider */}
          <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Line Height
              </Text>
              <View style={styles.sliderContainer}>
                <Slider
                  value={getLineHeightValue(localSettings.lineHeight)}
                  onValueChange={(value: number) => 
                    setLocalSettings(prev => ({ 
                      ...prev, 
                      lineHeight: getLineHeightFromValue(value) 
                    }))
                  }
                  minimumValue={0}
                  maximumValue={1}
                  step={1 / (lineHeightOptions.length - 1)}
                  style={styles.slider}
                  minimumTrackTintColor={theme.colors.primary}
                  maximumTrackTintColor={theme.colors.surfaceVariant}
                  thumbTintColor={theme.colors.primary}
                />
                <View style={styles.sliderLabels}>
                  <Text style={[styles.sliderLabel, { color: theme.colors.onSurface }]}>
                    Tight
                  </Text>
                  <Text style={[styles.sliderLabel, { color: theme.colors.onSurface }]}>
                    Loose
                  </Text>
                </View>
                <Text style={[styles.currentValue, { color: theme.colors.primary }]}>
                  {localSettings.lineHeight.replace('-', ' ').toUpperCase()}
                </Text>
              </View>
            </Card.Content>
          </Card>

          {/* Letter Spacing */}
          <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Letter Spacing
              </Text>
              <View style={styles.chipContainer}>
                {letterSpacingOptions.map((spacing) => (
                  <Chip
                    key={spacing}
                    selected={localSettings.letterSpacing === spacing}
                    onPress={() => setLocalSettings(prev => ({ ...prev, letterSpacing: spacing }))}
                    style={styles.chip}
                  >
                    {spacing.replace('-', ' ').toUpperCase()}
                  </Chip>
                ))}
              </View>
            </Card.Content>
          </Card>

          {/* Layout */}
          <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Layout
              </Text>
              <View style={styles.chipContainer}>
                <Chip
                  selected={localSettings.layout === 'paragraph'}
                  onPress={() => setLocalSettings(prev => ({ ...prev, layout: 'paragraph' }))}
                  style={styles.chip}
                >
                  Paragraph
                </Chip>
                <Chip
                  selected={localSettings.layout === 'line-by-line'}
                  onPress={() => setLocalSettings(prev => ({ ...prev, layout: 'line-by-line' }))}
                  style={styles.chip}
                >
                  Line by Line
                </Chip>
              </View>
            </Card.Content>
          </Card>

          {/* Theme */}
          <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Theme
              </Text>
              <View style={styles.chipContainer}>
                <Chip
                  selected={localSettings.theme === 'sepia'}
                  onPress={() => setLocalSettings(prev => ({ ...prev, theme: 'sepia' }))}
                  style={styles.chip}
                >
                  Sepia
                </Chip>
                <Chip
                  selected={localSettings.theme === 'white'}
                  onPress={() => setLocalSettings(prev => ({ ...prev, theme: 'white' }))}
                  style={styles.chip}
                >
                  White
                </Chip>
                <Chip
                  selected={localSettings.theme === 'dark'}
                  onPress={() => setLocalSettings(prev => ({ ...prev, theme: 'dark' }))}
                  style={styles.chip}
                >
                  Dark
                </Chip>
              </View>
            </Card.Content>
          </Card>

          {/* Toggle Options */}
          <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <List.Item
                title="Justify Text"
                description="Align text to both left and right margins"
                left={(props) => <List.Icon {...props} icon="format-align-justify" />}
                right={() => (
                  <Switch
                    value={localSettings.justifyText}
                    onValueChange={(value) => setLocalSettings(prev => ({ ...prev, justifyText: value }))}
                  />
                )}
                titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
                descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
              />
              
              <List.Item
                title="Show Line Numbers"
                description="Display line numbers for reference"
                left={(props) => <List.Icon {...props} icon="format-list-numbered" />}
                right={() => (
                  <Switch
                    value={localSettings.showLineNumbers}
                    onValueChange={(value) => setLocalSettings(prev => ({ ...prev, showLineNumbers: value }))}
                  />
                )}
                titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
                descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
              />
            </Card.Content>
          </Card>

          {/* Preview Section */}
          <Card style={[styles.section, { backgroundColor: theme.colors.surface }]}>
            <Card.Content>
              <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
                Live Preview
              </Text>
              <View style={styles.previewContainer}>
                <ReaderContent
                  content={previewContent.content}
                  title={previewContent.title}
                  nativeTitle={previewContent.nativeTitle}
                  previewSettings={localSettings}
                />
              </View>
            </Card.Content>
          </Card>
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={handleReset}
            style={styles.button}
          >
            Reset
          </Button>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.button}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.button}
          >
            Save
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 8,
  },
  slider: {
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    fontSize: 12,
  },
  currentValue: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 8,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  listItemDescription: {
    fontSize: 14,
  },
  previewContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  button: {
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 40,
  },
});

export default ReaderControls; 