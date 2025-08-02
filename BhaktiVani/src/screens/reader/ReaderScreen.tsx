import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
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

  // Get stotra ID from route params or use sample data
  const stotraId = route.params?.stotraId || 'sample';

  useEffect(() => {
    loadStotra();
  }, [stotraId]);

  const loadStotra = async () => {
    try {
      setIsLoading(true);
      if (stotraId === 'sample') {
        // Use sample stotra for demonstration
        const sampleStotra: Stotra = {
          id: 'sample',
          title: 'Hanuman Chalisa',
          nativeTitle: 'ಹನುಮಾನ್ ಚಾಲೀಸಾ',
          language: currentLanguage.id,
          category: 'bhakti',
          author: 'Tulsidas',
          description: 'Forty verses in praise of Hanuman',
          content: `ಓಂ ನಮಃ ಶಿವಾಯ

ಶ್ರೀ ಗುರು ಚರಣ ಸರೋಜ ರಜ ನಿಜ ಮನು ಮುಕುರ ಸುಧಾರಿ
ಬರನೌ ರಘುಬರ ಬಿಮಲ ಯಶು ಜೋ ದಾಯಕು ಫಲ ಚಾರಿ

ಬುದ್ಧಿ ಹೀನ ತನು ಜಾನಿಕೆ ಸುಮಿರೌ ಪವನ ಕುಮಾರ
ಬಲ ಬುದ್ಧಿ ಬಿದ್ಧಿ ದೇಹು ಮೋಹಿ ಹರಹು ಕಲೇಸ ಬಿಕಾರ

ಜೈ ಹನುಮಾನ್ ಗ್ಯಾನ ಗುಣ ಸಾಗರ
ಜೈ ಕಪೀಸ ತಿಹುಂ ಲೋಕ ಉಜಾಗರ

ರಾಮದೂತ ಅತುಲಿತ ಬಲ ಧಾಮಾ
ಅಂಜನಿ ಪುತ್ರ ಪವನಸುತ ನಾಮಾ

ಮಹಾವೀರ ವಿಕ್ರಮ ಬಜರಂಗೀ
ಕುಮತಿ ನಿವಾರ ಸುಮತಿ ಕೆ ಸಂಗೀ

ಕಂಚನ ಬರನ ಬಿರಾಜ ಸುಬೇಸಾ
ಕಾನನ ಕುಂಡಲ ಕುಂಚಿತ ಕೇಸಾ

ಹಾಥ ಬಜ್ರ ಔಧ್ವಜಾ ಬಿರಾಜೈ
ಕಾಂಧೆ ಮೂಂಜ ಜನೇವೂ ಸಾಜೈ

ಶಂಕರ ಸುವನ ತೇಜ ಸಮಾರೋ
ಅಪನ ತೇಜ ಸಮ್ಹಾರೋ ಆಪೇ

ತೇನ ಹುಮದೇ ಯುಧ ಲಕ್ಷಣ
ಬಿಜೇ ಸಕಲ ಜುಗ ಬೇ ಸಾಜೇ

ಜೈ ಹನುಮಾನ್ ಗ್ಯಾನ ಗುಣ ಸಾಗರ
ಜೈ ಕಪೀಸ ತಿಹುಂ ಲೋಕ ಉಜಾಗರ

ಲಯ ಸಂಜೀವನ ಲಖನ ಜಿಯಾಯೇ
ಶ್ರೀ ರಘುವೀರ ಹರಷಿ ಉರ ಲಾಯೇ

ರಘುಪತಿ ಕೀನ್ಹೀ ಬಹುತ ಬಡಾಯೀ
ತುಮ ಮಮ ಪ್ರಿಯ ಭರತ ಸಮ ಭಾಯೀ

ಸಹಸ ಬದನ ತುಮ್ಹರೋ ಯಶ ಗಾವೈ
ಅಸ ಕಹಿ ಶ್ರೀಪತಿ ಕಂಠ ಲಗಾವೈ

ಸನಕಾದಿಕ ಬ್ರಹ್ಮಾದಿ ಮುನೀಶಾ
ನಾರದ ಶಾರದ ಸಹಿತ ಅಹೀಶಾ

ಯಮ ಕುಬೇರ ದಿಗ್ಪಾಲ ಜಹಾಂ ತೇ
ಕವಿ ಕೋವಿದ ಕಹಿ ಸಕೆ ಕಹಾಂ ತೇ

ತುಮ ಉಪಕಾರ ಸುಗ್ರೀವಹಿ ಕೀನ್ಹಾ
ರಾಮ ಮಿಲಾಯ ರಾಜ ಪದ ದೀನ್ಹಾ

ತುಮ್ಹರೋ ಮಂತ್ರ ವಿಭೀಷಣ ಮಾನಾ
ಲಂಕೇಶ್ವರ ಭಯೇ ಸಬ ಜಗ ಜಾನಾ

ಯುಗ ಸಹಸ್ರ ಯೋಜನ ಪರ ಭಾನೂ
ಲೀಲ್ಯೋ ತಾಹಿ ಮಧುರ ಫಲ ಜಾನೂ

ಪ್ರಭು ಮುದ್ರಿಕಾ ಮೇಲಿ ಮುಖ ಮಾಹೀ
ಜಲಧಿ ಲಾಂಘಿ ಗಯೆ ಅಚರಜ ನಾಹೀ

ದುರ್ಗಮ ಕಾಜ ಜಗತ್ ಕೆ ಜೇತೇ
ಸುಗಮ ಅನುಗ್ರಹ ತುಮ್ಹರೆ ತೇತೇ

ರಾಮ ದುಆರೆ ತುಮ ರಖವಾರೇ
ಹೋತ ನ ಆಜ್ಞಾ ಬಿನು ಪೈಸಾರೇ

ಸಬ ಸುಖ ಲಹೈ ತುಮ್ಹಾರೀ ಶರಣಾ
ತುಮ ರಕ್ಷಕ ಕಾಹೂ ಕೋ ಡರ ನಾ

ಆಪನ ತೇಜ ಸಮ್ಹಾರೋ ಆಪೇ
ತೀನೋಂ ಲೋಕ ಹಾಕ ತೇ ಕಾಂಪೇ

ಭೂತ ಪಿಶಾಚ ನಿಕಟ ನಹಿ ಆವೈ
ಮಹಾವೀರ ಜಬ ನಾಮ ಸುನಾವೈ

ನಾಸೈ ರೋಗ ಹರೈ ಸಬ ಪೀರಾ
ಜಪತ ನಿರಂತರ ಹನುಮತ ಬೀರಾ

ಸಂಕಟ ತೆ ಹನುಮಾನ್ ಛುಡಾವೈ
ಮನ ಕ್ರಮ ಬಚನ ಧ್ಯಾನ ಜೋ ಲಾವೈ

ಸಬ ಪರ ರಾಮ ತಪಸ್ವೀ ರಾಜಾ
ತಿನಕೆ ಕಾಜ ಸಕಲ ತುಮ ಸಾಜಾ

ಔರ ಮನೋರಥ ಜೋ ಕೋಯಿ ಲಾವೈ
ತಾಸು ಅಮಿತ ಜೀವನ ಫಲ ಪಾವೈ

ಚಾರೋ ಯುಗ ಪರತಾಪ ತುಮ್ಹಾರಾ
ಹೈ ಪರಸಿದ್ಧ ಜಗತ್ ಉಜಿಯಾರಾ

ಸಾಧು ಸಂತ ಕೆ ತುಮ ರಖವಾರೇ
ಅಸುರ ನಿಕಂದನ ರಾಮ ದುಲಾರೇ

ಆಷ್ಟ ಸಿದ್ಧಿ ನವ ನಿಧಿ ಕೆ ದಾತಾ
ಅಸ ಬರ ದೀನ್ ಜಾನಕೀ ಮಾತಾ

ರಾಮ ರಸಾಯನ ತುಮ್ಹಾರೇ ಪಾಸಾ
ಸದಾ ರಹೋ ರಘುಪತಿ ಕೆ ದಾಸಾ

ತುಮ್ಹರೇ ಭಜನ ರಾಮಕೋ ಪಾವೈ
ಜನಮ ಜನಮ ಕೆ ದುಖ ಬಿಸರಾವೈ

ಅಂತ ಕಾಲ ರಘುಪತಿ ಪುರ ಜಾಯೀ
ಜಹಾಂ ಜನ್ಮ ಹರಿ ಭಕ್ತ ಕಹಾಯೀ

ಔರ ದೇವತಾ ಚಿತ್ತ ನ ಧರಾಯೀ
ಹನುಮತ್ ಸೇಯಿ ಸರ್ವ ಸುಖ ಕರಾಯೀ

ಸಂಕಟ ಕಟೈ ಮಿಟೈ ಸಬ ಪೀರಾ
ಜೋ ಸುಮಿರೈ ಹನುಮತ ಬಲಬೀರಾ

ಜೈ ಜೈ ಜೈ ಹನುಮಾನ್ ಗೋಸಾಯೀ
ಕೃಪಾ ಕರಹು ಗುರುದೇವ ಕಿ ನಾಯೀ

ಜೋ ಶತ ಬಾರ ಪಾಠ ಕರ ಕೋಯೀ
ಛೂಟಹಿ ಬಂಧಿ ಮಹಾ ಸುಖ ಹೋಯೀ

ಜೋ ಯಹ ಪಢೈ ಹನುಮಾನ್ ಚಾಲೀಸಾ
ಹೋಯ ಸಿದ್ಧಿ ಸಾಕಿ ಗೌರೀಶಾ

ತುಲಸೀದಾಸ ಸದಾ ಹರಿ ಚೇರಾ
ಕೀಜೈ ನಾಥ ಹೃದಯ ಮಹ್ ಡೇರಾ

ಪವನ ತನಯ ಸಂಕಟ ಹರಣ
ಮಂಗಲ ಮೂರತಿ ರೂಪ
ರಾಮ ಲಖನ ಸೀತಾ ಸಹಿತ
ಹೃದಯ ಬಸಹು ಸುರ ಭೂಪ

ಓಂ ನಮಃ ಶಿವಾಯ`,
          isFavorite: false,
          readingProgress: 0,
          estimatedReadingTime: 15,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setCurrentStotra(sampleStotra);
        setReadingProgress(sampleStotra.readingProgress);
      } else {
        // Load actual stotra from service
        const stotra = await stotraService.getStotraById(stotraId);
        if (stotra) {
          setCurrentStotra(stotra);
          setReadingProgress(stotra.readingProgress);
        } else {
          // Fallback to sample if stotra not found
          console.warn(`Stotra with ID ${stotraId} not found, using sample`);
          loadStotra(); // This will load sample
          return;
        }
      }
    } catch (error) {
      console.error('Error loading stotra:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!currentStotra) return;

    try {
      await stotraService.toggleFavorite(currentStotra.id);
      // Reload stotra to get updated favorite status
      await loadStotra();
    } catch (error) {
      console.error('Error toggling favorite:', error);
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
      
      {/* Favorite Button */}
      <IconButton
        icon={currentStotra.isFavorite ? 'star' : 'star-outline'}
        size={28}
        iconColor={currentStotra.isFavorite ? theme.colors.primary : theme.colors.onSurface}
        style={[styles.favoriteButton, { backgroundColor: theme.colors.surface }]}
        onPress={handleToggleFavorite}
      />

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
  favoriteButton: {
    position: 'absolute',
    margin: 16,
    right: 0,
    top: 0,
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