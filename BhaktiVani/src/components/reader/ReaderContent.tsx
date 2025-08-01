import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useReaderContext } from '../../contexts/ReaderContext';
import { useThemeContext } from '../../constants/theme';
import { getFontForLanguage, fontSizes, lineHeights, letterSpacing } from '../../constants/fonts';
import { ReaderSettings } from '../../contexts/ReaderContext';

interface ReaderContentProps {
  content: string;
  title: string;
  nativeTitle: string;
  previewSettings?: ReaderSettings;
}

const ReaderContent: React.FC<ReaderContentProps> = ({ 
  content, 
  title, 
  nativeTitle, 
  previewSettings 
}) => {
  const theme = useTheme();
  const { currentLanguage } = useLanguageContext();
  const { settings } = useReaderContext();
  const { isDark, isSepia } = useThemeContext();

  // Use preview settings if provided, otherwise use context settings
  const activeSettings = previewSettings || settings;

  const fontConfig = getFontForLanguage(currentLanguage.id);
  const fontSize = fontSizes[activeSettings.fontSize];
  const lineHeight = lineHeights[activeSettings.lineHeight];
  const letterSpacingValue = letterSpacing[activeSettings.letterSpacing];

  // Parse content into paragraphs or lines based on layout setting
  const parseContent = (text: string): string[] => {
    if (activeSettings.layout === 'line-by-line') {
      return text.split('\n').filter(line => line.trim().length > 0);
    } else {
      return text.split('\n\n').filter(paragraph => paragraph.trim().length > 0);
    }
  };

  const contentBlocks = parseContent(content);

  const textStyle = {
    fontSize,
    lineHeight: fontSize * lineHeight,
    letterSpacing: letterSpacingValue,
    fontFamily: fontConfig.family,
    fontWeight: fontConfig.weight as 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
    color: theme.colors.onSurface,
    textAlign: activeSettings.justifyText ? 'justify' : 'left' as 'auto' | 'left' | 'right' | 'center' | 'justify',
  };

  const renderContentBlock = (block: string, index: number) => {
    const lineNumber = activeSettings.showLineNumbers ? index + 1 : null;

    return (
      <View key={index} style={styles.contentBlock}>
        {activeSettings.showLineNumbers && (
          <Text style={[styles.lineNumber, { color: theme.colors.onSurface }]}>
            {lineNumber}
          </Text>
        )}
        <Text style={[styles.contentText, textStyle]}>
          {block}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Title Section */}
      <View style={styles.titleSection}>
        <Text style={[styles.title, { color: theme.colors.onSurface }]}>
          {title}
        </Text>
        <Text style={[styles.nativeTitle, { color: theme.colors.onSurface }]}>
          {nativeTitle}
        </Text>
      </View>

      {/* Content */}
      <View style={styles.contentSection}>
        {contentBlocks.map(renderContentBlock)}
      </View>

      {/* End of content indicator */}
      <View style={styles.endIndicator}>
        <Text style={[styles.endText, { color: theme.colors.onSurface }]}>
          • • •
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  titleSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  nativeTitle: {
    fontSize: 20,
    textAlign: 'center',
    opacity: 0.8,
  },
  contentSection: {
    flex: 1,
  },
  contentBlock: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  lineNumber: {
    fontSize: 12,
    marginRight: 12,
    marginTop: 2,
    opacity: 0.5,
    minWidth: 30,
  },
  contentText: {
    flex: 1,
  },
  endIndicator: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 20,
  },
  endText: {
    fontSize: 18,
    opacity: 0.6,
  },
});

export default ReaderContent; 