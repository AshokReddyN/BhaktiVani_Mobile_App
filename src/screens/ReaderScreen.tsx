import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { ALL_STOTRAS } from '../assets/data/sample_data';
import { useSettings } from '../contexts/SettingsContext';
import { Theme } from '../contexts/SettingsContext';
import SettingsModal from '../components/SettingsModal';

type ReaderScreenRouteProp = RouteProp<RootStackParamList, 'Reader'>;
type ReaderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Reader'>;

const themes: Record<Theme, { bg: string; text: string; header: string; headerTint: string }> = {
  light: { bg: '#FFFFFF', text: '#000000', header: '#F8F8F8', headerTint: '#007AFF' },
  dark: { bg: '#121212', text: '#FFFFFF', header: '#1F1F1F', headerTint: '#FFFFFF' },
  sepia: { bg: '#FBF0D9', text: '#5B4636', header: '#F4E5C7', headerTint: '#8B4513' },
};

const ReaderScreen = () => {
  const route = useRoute<ReaderScreenRouteProp>();
  const navigation = useNavigation<ReaderScreenNavigationProp>();
  const { settings } = useSettings();
  const [modalVisible, setModalVisible] = useState(false);
  const { stotraId } = route.params;

  const stotra = ALL_STOTRAS.find(s => s.id === stotraId);
  const themeColors = themes[settings.theme];

  useLayoutEffect(() => {
    navigation.setOptions({
      title: stotra?.title ?? 'Reader',
      headerRight: () => (
        <Button
          onPress={() => setModalVisible(true)}
          title="Aa"
          color={themeColors.headerTint}
        />
      ),
      headerStyle: {
        backgroundColor: themeColors.header,
      },
      headerTintColor: themeColors.text,
    });
  }, [navigation, stotra, settings.theme]);

  if (!stotra) {
    return (
      <View style={[styles.container, { backgroundColor: themeColors.bg }]}>
        <Text style={[styles.errorText, { color: themeColors.text }]}>Stotra not found!</Text>
      </View>
    );
  }

  const containerStyle = {
    flex: 1,
    backgroundColor: themeColors.bg,
  };

  const contentContainerStyle = {
    paddingHorizontal: settings.margin,
    paddingVertical: 20,
  };

  const contentStyle = {
    fontSize: settings.fontSize,
    lineHeight: settings.fontSize * settings.lineHeight,
    fontFamily: settings.fontFamily,
    color: themeColors.text,
  };

  return (
    <View style={styles.flexOne}>
        <ScrollView style={containerStyle} contentContainerStyle={contentContainerStyle}>
            <Text style={contentStyle}>{stotra.content}</Text>
        </ScrollView>
        <SettingsModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1
  },
  container: {
    flex: 1,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ReaderScreen;
