import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, FAB } from 'react-native-paper';
import { useLanguageContext } from '../../contexts/LanguageContext';
// import { useReaderContext } from '../../contexts/ReaderContext'; // Will be used for future features
import { stotraService } from '../../services/stotraService';
import ReaderContent from '../../components/reader/ReaderContent';
import ReaderControls from '../../components/reader/ReaderControls';

const ReaderScreen: React.FC = () => {
  const theme = useTheme();
  const { currentLanguage } = useLanguageContext();
  // const { settings } = useReaderContext(); // Will be used for future features
  const [showControls, setShowControls] = useState(false);

  // Get a sample stotra for demonstration
  const sampleStotras = stotraService.getStotrasByLanguage(currentLanguage.id);
  const currentStotra = sampleStotras[0] || {
    id: 'sample',
    title: 'Sample Stotra',
    nativeTitle: 'ಸ್ಯಾಂಪಲ್ ಸ್ತೋತ್ರ',
    language: currentLanguage.id,
    category: 'bhakti',
    description: 'A sample devotional text for demonstration',
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

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ReaderContent
        content={currentStotra.content}
        title={currentStotra.title}
        nativeTitle={currentStotra.nativeTitle}
      />
      
      {/* Floating Action Button for Settings */}
      <FAB
        icon="cog"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => setShowControls(true)}
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default ReaderScreen;