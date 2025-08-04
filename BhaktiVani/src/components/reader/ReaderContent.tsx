import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { useTheme, IconButton, ProgressBar } from 'react-native-paper';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useReaderContext } from '../../contexts/ReaderContext';
import { useThemeContext } from '../../constants/theme';
import { useAccessibilityContext } from '../../contexts/AccessibilityContext';
import { getFontForLanguage, fontSizes, lineHeights, letterSpacing } from '../../constants/fonts';
import { ReaderSettings } from '../../contexts/ReaderContext';

interface ReaderContentProps {
  content: string;
  title: string;
  nativeTitle: string;
  previewSettings?: ReaderSettings;
  onProgressUpdate?: (progress: number) => void;
  onScrollPositionUpdate?: (position: number) => void;
  onBookmarkToggle?: (position: number) => void;
  bookmarks?: number[];
  readingProgress?: number;
  initialScrollPosition?: number;
}

const ReaderContent: React.FC<ReaderContentProps> = ({ 
  content, 
  title, 
  nativeTitle, 
  previewSettings,
  onProgressUpdate,
  onScrollPositionUpdate,
  onBookmarkToggle,
  bookmarks = [],
  readingProgress = 0,
  initialScrollPosition = 0
}) => {
  const theme = useTheme();
  const { currentLanguage } = useLanguageContext();
  const { settings } = useReaderContext();
  const { isDark, isSepia } = useThemeContext();
  const { getScaledFontSize, getScaledPadding } = useAccessibilityContext();
  
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollPosition, setScrollPosition] = useState(initialScrollPosition);
  const [contentHeight, setContentHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [autoScrollSpeed, setAutoScrollSpeed] = useState(1);
  const [selectedText, setSelectedText] = useState<string>('');
  const [showProgress, setShowProgress] = useState(false);
  const [hasRestoredPosition, setHasRestoredPosition] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Use preview settings if provided, otherwise use context settings
  const activeSettings = previewSettings || settings;

  const fontConfig = getFontForLanguage(currentLanguage.id);
  const baseFontSize = fontSizes[activeSettings.fontSize];
  const fontSize = getScaledFontSize(baseFontSize);
  const lineHeight = fontSizes[activeSettings.lineHeight];
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

  // Calculate reading progress
  useEffect(() => {
    if (contentHeight > 0 && containerHeight > 0 && onProgressUpdate) {
      const progress = Math.min(Math.max(scrollPosition / (contentHeight - containerHeight), 0), 1);
      onProgressUpdate(progress);
    }
  }, [scrollPosition, contentHeight, containerHeight]);

  // Auto-scroll functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoScrolling && scrollViewRef.current) {
      interval = setInterval(() => {
        setScrollPosition(prev => {
          const newPosition = prev + (autoScrollSpeed * 2);
          if (newPosition >= contentHeight - containerHeight) {
            setIsAutoScrolling(false);
            return contentHeight - containerHeight;
          }
          scrollViewRef.current?.scrollTo({ y: newPosition, animated: true });
          return newPosition;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, autoScrollSpeed, contentHeight, containerHeight]);

  // Show/hide progress bar
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showProgress ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showProgress, fadeAnim]);

  // Restore scroll position when content is loaded
  useEffect(() => {
    if (initialScrollPosition > 0 && contentHeight > 0 && containerHeight > 0 && !hasRestoredPosition && scrollViewRef.current) {
      const maxScrollPosition = contentHeight - containerHeight;
      const targetPosition = Math.min(initialScrollPosition, maxScrollPosition);
      
      if (targetPosition > 0) {
        scrollViewRef.current.scrollTo({ y: targetPosition, animated: false });
        setScrollPosition(targetPosition);
        setHasRestoredPosition(true);
        console.log('Restored scroll position to:', targetPosition);
      }
    }
  }, [initialScrollPosition, contentHeight, containerHeight, hasRestoredPosition]);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollPosition(offsetY);
    
    // Call scroll position update callback
    if (onScrollPositionUpdate) {
      onScrollPositionUpdate(offsetY);
    }
  };

  const handleContentLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const handleContainerLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContainerHeight(height);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const handleTextSelection = (text: string) => {
    setSelectedText(text);
    // Here you could add functionality to highlight, copy, or bookmark selected text
  };

  const handleBookmarkPress = (index: number) => {
    onBookmarkToggle?.(index);
  };

  const scrollToBookmark = (position: number) => {
    scrollViewRef.current?.scrollTo({ y: position, animated: true });
  };

  const renderContentBlock = (block: string, index: number) => {
    const lineNumber = activeSettings.showLineNumbers ? index + 1 : null;
    const isBookmarked = bookmarks.includes(index);

    return (
      <View key={index} style={styles.contentBlock}>
        {activeSettings.showLineNumbers && (
          <Text style={[styles.lineNumber, { color: theme.colors.onSurface }]}>
            {lineNumber}
          </Text>
        )}
        <TouchableOpacity
          style={styles.textContainer}
          onLongPress={() => handleTextSelection(block)}
          onPress={() => handleBookmarkPress(index)}
        >
          <Text style={[styles.contentText, textStyle]}>
            {block}
          </Text>
          {isBookmarked && (
            <View style={[styles.bookmarkIndicator, { backgroundColor: theme.colors.primary }]} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Progress Bar */}
      <Animated.View 
        style={[
          styles.progressContainer, 
          { opacity: fadeAnim }
        ]}
      >
        <ProgressBar 
          progress={readingProgress} 
          color={theme.colors.primary}
          style={styles.progressBar}
        />
        <Text style={[styles.progressText, { color: theme.colors.onSurface }]}>
          {Math.round(readingProgress * 100)}%
        </Text>
      </Animated.View>

      {/* Reading Controls */}
      <View style={[styles.controlsContainer, { backgroundColor: theme.colors.surface }]}>
        <IconButton
          icon={isAutoScrolling ? 'pause' : 'play'}
          size={24}
          onPress={toggleAutoScroll}
          iconColor={theme.colors.primary}
        />
        <IconButton
          icon="bookmark-outline"
          size={24}
          onPress={() => setShowProgress(!showProgress)}
          iconColor={theme.colors.primary}
        />
        <IconButton
          icon="format-list-bulleted"
          size={24}
          onPress={() => {/* Show bookmarks list */}}
          iconColor={theme.colors.primary}
        />
      </View>

      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onLayout={handleContainerLayout}
      >
        <View onLayout={handleContentLayout}>
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
        </View>
      </ScrollView>

      {/* Auto-scroll speed control */}
      {isAutoScrolling && (
        <View style={[styles.speedControl, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.speedLabel, { color: theme.colors.onSurface }]}>
            Speed: {autoScrollSpeed}x
          </Text>
          <View style={styles.speedButtons}>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => setAutoScrollSpeed(Math.max(0.5, autoScrollSpeed - 0.5))}
              iconColor={theme.colors.primary}
            />
            <IconButton
              icon="plus"
              size={20}
              onPress={() => setAutoScrollSpeed(Math.min(3, autoScrollSpeed + 0.5))}
              iconColor={theme.colors.primary}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    marginLeft: 8,
    fontWeight: '500',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: getScaledPadding(20),
    paddingBottom: getScaledPadding(40),
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
    marginBottom: getScaledPadding(16),
    alignItems: 'flex-start',
  },
  lineNumber: {
    fontSize: 12,
    marginRight: 12,
    marginTop: 2,
    opacity: 0.5,
    minWidth: 30,
  },
  textContainer: {
    flex: 1,
    position: 'relative',
  },
  contentText: {
    flex: 1,
  },
  bookmarkIndicator: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 4,
    height: '100%',
    borderRadius: 2,
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
  speedControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  speedLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  speedButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReaderContent; 