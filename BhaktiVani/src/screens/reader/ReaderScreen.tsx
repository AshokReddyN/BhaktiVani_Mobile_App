import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme, FAB, IconButton } from 'react-native-paper';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { stotraService } from '../../services/stotraService';
import { Stotra } from '../../types/stotra';
import ReaderContent from '../../components/reader/ReaderContent';
import ReaderControls from '../../components/reader/ReaderControls';

const ReaderScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const { currentLanguage } = useLanguageContext();
  const [showControls, setShowControls] = useState(false);
  const [currentStotra, setCurrentStotra] = useState<Stotra | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [readingProgress, setReadingProgress] = useState(0);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showBookmarksList, setShowBookmarksList] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];

  // Get stotra ID from route params
  const stotraId = route.params?.stotraId;

  useEffect(() => {
    loadStotra();
  }, [stotraId]);

  const loadStotra = async () => {
    try {
      setIsLoading(true);
      
      if (!stotraId) {
        console.error('No stotra ID provided');
        return;
      }
      
      // Load actual stotra from service
      const stotra = await stotraService.getStotraById(stotraId);
      if (stotra) {
        setCurrentStotra(stotra);
        setReadingProgress(stotra.readingProgress);
        setIsFavorite(stotra.isFavorite);
        console.log('Loaded stotra:', stotra.title, 'Favorite status:', stotra.isFavorite);
      } else {
        console.error(`Stotra with ID ${stotraId} not found`);
      }
    } catch (error) {
      console.error('Error loading stotra:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!currentStotra || isTogglingFavorite) return;

    console.log('Toggling favorite for stotra:', currentStotra.id, 'Current favorite status:', isFavorite);

    try {
      setIsTogglingFavorite(true);
      
      // Immediate UI feedback
      const newFavoriteStatus = !isFavorite;
      setIsFavorite(newFavoriteStatus);
      
      console.log('Setting new favorite status to:', newFavoriteStatus);
      
      // Animate the star icon
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      // Update in service
      console.log('Calling stotraService.toggleFavorite with ID:', currentStotra.id);
      await stotraService.toggleFavorite(currentStotra.id);
      console.log('Successfully updated favorite in service');
      
      // Update the current stotra object
      setCurrentStotra(prev => prev ? { ...prev, isFavorite: newFavoriteStatus } : null);
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      // Revert on error
      setIsFavorite(!isFavorite);
    } finally {
      setIsTogglingFavorite(false);
    }
  };

  const handleProgressUpdate = useCallback(async (progress: number) => {
    setReadingProgress(progress);
    
    // Update progress in service
    if (currentStotra) {
      try {
        await stotraService.updateReadingProgress(currentStotra.id, progress);
      } catch (error) {
        console.error('Error updating reading progress:', error);
      }
    }
  }, [currentStotra]);

  const handleBookmarkToggle = useCallback((position: number) => {
    setBookmarks(prev => {
      if (prev.includes(position)) {
        return prev.filter(p => p !== position);
      } else {
        return [...prev, position];
      }
    });
  }, []);

  const handleOpenControls = () => {
    setShowControls(true);
  };

  if (isLoading || !currentStotra) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Loading state would go here */}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ReaderContent
        content={currentStotra.content}
        title={currentStotra.title}
        nativeTitle={currentStotra.nativeTitle}
        onProgressUpdate={handleProgressUpdate}
        onBookmarkToggle={handleBookmarkToggle}
        bookmarks={bookmarks}
        readingProgress={readingProgress}
      />
      
      {/* Enhanced Favorite Button with Animation */}
      <Animated.View style={[styles.favoriteButtonContainer, { transform: [{ scale: scaleAnim }] }]}>
        <IconButton
          icon={isFavorite ? 'star' : 'star-outline'}
          size={28}
          iconColor={isFavorite ? theme.colors.primary : theme.colors.onSurface}
          style={[
            styles.favoriteButton, 
            { 
              backgroundColor: isFavorite 
                ? theme.colors.primaryContainer 
                : theme.colors.surface 
            }
          ]}
          onPress={handleToggleFavorite}
          disabled={isTogglingFavorite}
        />
      </Animated.View>

      {/* Floating Action Button for Settings */}
      <FAB
        icon="cog"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={handleOpenControls}
      />

      {/* Reader Controls Modal */}
      <ReaderControls
        visible={showControls}
        onDismiss={() => setShowControls(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favoriteButtonContainer: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 0,
  },
  favoriteButton: {
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ReaderScreen;