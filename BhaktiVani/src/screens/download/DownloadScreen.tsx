import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useTheme, Card, Button, ProgressBar, List, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useLanguageContext } from '../../contexts/LanguageContext';
import { offlineService } from '../../services/offlineService';
import { SUPPORTED_LANGUAGES } from '../../constants/languages';
import { LanguageType } from '../../constants/languages';

interface LanguageDownloadStatus {
  language: LanguageType;
  isDownloaded: boolean;
  progress: number;
  totalStotras: number;
  downloadedStotras: number;
  isDownloading: boolean;
}

const DownloadScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { selectedLanguage, currentLanguage } = useLanguageContext();
  const [downloadStatuses, setDownloadStatuses] = useState<LanguageDownloadStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDownloadStatuses();
  }, []);

  const loadDownloadStatuses = async () => {
    try {
      setIsLoading(true);
      const statuses: LanguageDownloadStatus[] = [];

      for (const language of SUPPORTED_LANGUAGES) {
        const progress = await offlineService.getLanguageDownloadProgress(language.id);
        statuses.push({
          language: language.id,
          isDownloaded: progress.isDownloaded,
          progress: progress.progress,
          totalStotras: progress.totalStotras,
          downloadedStotras: progress.downloadedStotras,
          isDownloading: false,
        });
      }

      setDownloadStatuses(statuses);
    } catch (error) {
      console.error('Error loading download statuses:', error);
      Alert.alert('Error', 'Failed to load download statuses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadLanguage = async (languageId: LanguageType) => {
    try {
      // Update status to show downloading
      setDownloadStatuses(prev => 
        prev.map(status => 
          status.language === languageId 
            ? { ...status, isDownloading: true }
            : status
        )
      );

      // Start download
      await offlineService.downloadLanguageContent(languageId, (progress) => {
        // Update progress in real-time
        setDownloadStatuses(prev => 
          prev.map(status => 
            status.language === languageId 
              ? { 
                  ...status, 
                  progress,
                  downloadedStotras: Math.round((progress / 100) * status.totalStotras)
                }
              : status
          )
        );
      });

      // Refresh statuses after download
      await loadDownloadStatuses();
      
      Alert.alert(
        'Download Complete', 
        `Successfully downloaded all content for ${SUPPORTED_LANGUAGES.find(l => l.id === languageId)?.name}`
      );
    } catch (error) {
      console.error(`Error downloading ${languageId}:`, error);
      Alert.alert('Download Failed', 'Failed to download content. Please try again.');
      
      // Reset downloading status
      setDownloadStatuses(prev => 
        prev.map(status => 
          status.language === languageId 
            ? { ...status, isDownloading: false }
            : status
        )
      );
    }
  };

  const handleClearLanguage = async (languageId: LanguageType) => {
    Alert.alert(
      'Clear Content',
      `Are you sure you want to clear all downloaded content for ${SUPPORTED_LANGUAGES.find(l => l.id === languageId)?.name}? This action cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await offlineService.clearLanguageContent(languageId);
              await loadDownloadStatuses();
              Alert.alert('Success', 'Content cleared successfully');
            } catch (error) {
              console.error(`Error clearing ${languageId}:`, error);
              Alert.alert('Error', 'Failed to clear content');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status: LanguageDownloadStatus) => {
    if (status.isDownloading) return theme.colors.primary;
    if (status.isDownloaded) return theme.colors.success;
    return theme.colors.outline;
  };

  const getStatusText = (status: LanguageDownloadStatus) => {
    if (status.isDownloading) return 'Downloading...';
    if (status.isDownloaded) return 'Downloaded';
    return 'Not Downloaded';
  };

  const getStatusIcon = (status: LanguageDownloadStatus) => {
    if (status.isDownloading) return 'download';
    if (status.isDownloaded) return 'check-circle';
    return 'download-outline';
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.loadingText, { color: theme.colors.onSurface }]}>
          Loading download statuses...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>
          Offline Content
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>
          Download content for offline access
        </Text>
      </View>

      {/* Current Language Info */}
      <Card style={[styles.infoCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.infoTitle, { color: theme.colors.primary }]}>
            Current Language
          </Text>
          <Text style={[styles.currentLanguage, { color: theme.colors.onSurface }]}>
            {currentLanguage.nativeName} ({currentLanguage.name})
          </Text>
          <Text style={[styles.infoDescription, { color: theme.colors.onSurface }]}>
            Download content to read offline without internet connection
          </Text>
        </Card.Content>
      </Card>

      {/* Language Download Cards */}
      {downloadStatuses.map((status) => {
        const languageInfo = SUPPORTED_LANGUAGES.find(l => l.id === status.language);
        if (!languageInfo) return null;

        return (
          <Card 
            key={status.language} 
            style={[styles.languageCard, { backgroundColor: theme.colors.surface }]}
          >
            <Card.Content>
              <View style={styles.languageHeader}>
                <View style={styles.languageInfo}>
                  <Text style={[styles.languageTitle, { color: theme.colors.onSurface }]}>
                    {languageInfo.flag} {languageInfo.nativeName}
                  </Text>
                  <Text style={[styles.languageSubtitle, { color: theme.colors.onSurface }]}>
                    {languageInfo.name}
                  </Text>
                </View>
                <Chip 
                  mode="outlined"
                  icon={getStatusIcon(status)}
                  textStyle={{ color: getStatusColor(status) }}
                  style={{ borderColor: getStatusColor(status) }}
                >
                  {getStatusText(status)}
                </Chip>
              </View>

              {status.isDownloaded && (
                <View style={styles.statsContainer}>
                  <Text style={[styles.statsText, { color: theme.colors.onSurface }]}>
                    {status.totalStotras} stotras available offline
                  </Text>
                </View>
              )}

              {status.isDownloading && (
                <View style={styles.progressContainer}>
                  <ProgressBar 
                    progress={status.progress / 100} 
                    color={theme.colors.primary}
                    style={styles.progressBar}
                  />
                  <Text style={[styles.progressText, { color: theme.colors.onSurface }]}>
                    {status.downloadedStotras} of {status.totalStotras} stotras downloaded
                  </Text>
                </View>
              )}

              <View style={styles.actionButtons}>
                {!status.isDownloaded && !status.isDownloading && (
                  <Button
                    mode="contained"
                    icon="download"
                    onPress={() => handleDownloadLanguage(status.language)}
                    style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
                    disabled={offlineService.isDownloadInProgress()}
                  >
                    Download All
                  </Button>
                )}

                {status.isDownloaded && (
                  <Button
                    mode="outlined"
                    icon="delete"
                    onPress={() => handleClearLanguage(status.language)}
                    style={styles.actionButton}
                  >
                    Clear Content
                  </Button>
                )}

                {status.isDownloading && (
                  <Button
                    mode="outlined"
                    disabled
                    style={styles.actionButton}
                  >
                    Downloading...
                  </Button>
                )}
              </View>
            </Card.Content>
          </Card>
        );
      })}

      {/* Instructions */}
      <Card style={[styles.instructionsCard, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text style={[styles.instructionsTitle, { color: theme.colors.primary }]}>
            How Offline Mode Works
          </Text>
          <List.Item
            title="Download Content"
            description="Download all stotras for a language to access them offline"
            left={(props) => <List.Icon {...props} icon="download" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
            descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
          />
          <List.Item
            title="Automatic Fallback"
            description="If content isn't downloaded, the app uses fallback data"
            left={(props) => <List.Icon {...props} icon="wifi-off" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
            descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
          />
          <List.Item
            title="Progress Sync"
            description="Reading progress and favorites sync between online and offline"
            left={(props) => <List.Icon {...props} icon="sync" />}
            titleStyle={[styles.listItemTitle, { color: theme.colors.onSurface }]}
            descriptionStyle={[styles.listItemDescription, { color: theme.colors.onSurface }]}
          />
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
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    padding: 40,
  },
  infoCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  currentLanguage: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  infoDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  languageCard: {
    marginBottom: 16,
    borderRadius: 12,
  },
  languageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  languageInfo: {
    flex: 1,
  },
  languageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  languageSubtitle: {
    fontSize: 14,
    opacity: 0.7,
  },
  statsContainer: {
    marginBottom: 12,
  },
  statsText: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
  },
  instructionsCard: {
    marginTop: 16,
    borderRadius: 12,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  listItemDescription: {
    fontSize: 14,
  },
});

export default DownloadScreen; 