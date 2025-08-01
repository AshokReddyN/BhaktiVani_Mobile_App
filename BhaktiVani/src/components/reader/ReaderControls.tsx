import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useTheme, Button, Switch, List, Chip } from 'react-native-paper';
import { useReaderContext } from '../../contexts/ReaderContext';
import { fontSizes, lineHeights, letterSpacing } from '../../constants/fonts';

interface ReaderControlsProps {
  visible: boolean;
  onDismiss: () => void;
}

const ReaderControls: React.FC<ReaderControlsProps> = ({ visible, onDismiss }) => {
  const theme = useTheme();
  const { settings, updateSettings } = useReaderContext();
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    onDismiss();
  };

  const handleCancel = () => {
    setLocalSettings(settings);
    onDismiss();
  };

  const fontSizeOptions = Object.keys(fontSizes) as Array<keyof typeof fontSizes>;
  const lineHeightOptions = Object.keys(lineHeights) as Array<keyof typeof lineHeights>;
  const letterSpacingOptions = Object.keys(letterSpacing) as Array<keyof typeof letterSpacing>;

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

        <View style={styles.content}>
          {/* Font Size */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              Font Size
            </Text>
            <View style={styles.chipContainer}>
              {fontSizeOptions.map((size) => (
                <Chip
                  key={size}
                  selected={localSettings.fontSize === size}
                  onPress={() => setLocalSettings(prev => ({ ...prev, fontSize: size }))}
                  style={styles.chip}
                >
                  {size.toUpperCase()}
                </Chip>
              ))}
            </View>
          </View>

          {/* Line Height */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.primary }]}>
              Line Height
            </Text>
            <View style={styles.chipContainer}>
              {lineHeightOptions.map((height) => (
                <Chip
                  key={height}
                  selected={localSettings.lineHeight === height}
                  onPress={() => setLocalSettings(prev => ({ ...prev, lineHeight: height }))}
                  style={styles.chip}
                >
                  {height.replace('-', ' ').toUpperCase()}
                </Chip>
              ))}
            </View>
          </View>

          {/* Letter Spacing */}
          <View style={styles.section}>
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
          </View>

          {/* Layout */}
          <View style={styles.section}>
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
          </View>

          {/* Theme */}
          <View style={styles.section}>
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
          </View>

          {/* Toggle Options */}
          <View style={styles.section}>
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
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
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
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
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
  actions: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  button: {
    flex: 1,
  },
});

export default ReaderControls; 