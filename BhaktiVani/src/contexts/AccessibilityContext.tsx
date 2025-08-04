import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AccessibilityInfo, PixelRatio } from 'react-native';
import { storageService } from '../services/storageService';

interface AccessibilitySettings {
  isHighContrastEnabled: boolean;
  isLargeTextEnabled: boolean;
  isIncreasedPaddingEnabled: boolean;
  isSystemFontScalingEnabled: boolean;
  customFontSize: number;
  customPadding: number;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => Promise<void>;
  getScaledFontSize: (baseSize: number) => number;
  getScaledPadding: (basePadding: number) => number;
  isSystemFontScalingActive: boolean;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibilityContext = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibilityContext must be used within an AccessibilityProvider');
  }
  return context;
};

const defaultSettings: AccessibilitySettings = {
  isHighContrastEnabled: false,
  isLargeTextEnabled: false,
  isIncreasedPaddingEnabled: false,
  isSystemFontScalingEnabled: true,
  customFontSize: 1.0,
  customPadding: 1.0,
};

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider: React.FC<AccessibilityProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isSystemFontScalingActive, setIsSystemFontScalingActive] = useState(false);

  // Load accessibility settings from storage on mount
  useEffect(() => {
    const loadAccessibilitySettings = async () => {
      try {
        const savedSettings = await storageService.getAccessibilitySettings();
        if (savedSettings) {
          setSettings(savedSettings);
        }
      } catch (error) {
        console.error('Failed to load accessibility settings:', error);
      }
    };

    loadAccessibilitySettings();
  }, []);

  // Check system font scaling on mount and when settings change
  useEffect(() => {
    const checkSystemFontScaling = async () => {
      try {
        const isEnabled = await AccessibilityInfo.isReduceMotionEnabled();
        setIsSystemFontScalingActive(isEnabled);
      } catch (error) {
        console.error('Failed to check system font scaling:', error);
      }
    };

    checkSystemFontScaling();
  }, [settings.isSystemFontScalingEnabled]);

  const updateSettings = async (newSettings: Partial<AccessibilitySettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    try {
      await storageService.saveAccessibilitySettings(updatedSettings);
    } catch (error) {
      console.error('Failed to save accessibility settings:', error);
    }
  };

  const getScaledFontSize = (baseSize: number): number => {
    let scaledSize = baseSize;

    // Apply custom font size multiplier
    if (settings.isLargeTextEnabled) {
      scaledSize *= settings.customFontSize;
    }

    // Apply system font scaling if enabled
    if (settings.isSystemFontScalingEnabled && isSystemFontScalingActive) {
      const systemScale = PixelRatio.getFontScale();
      scaledSize *= systemScale;
    }

    return Math.round(scaledSize);
  };

  const getScaledPadding = (basePadding: number): number => {
    let scaledPadding = basePadding;

    // Apply custom padding multiplier
    if (settings.isIncreasedPaddingEnabled) {
      scaledPadding *= settings.customPadding;
    }

    return Math.round(scaledPadding);
  };

  const value = {
    settings,
    updateSettings,
    getScaledFontSize,
    getScaledPadding,
    isSystemFontScalingActive,
  };

  return React.createElement(AccessibilityContext.Provider, { value }, children);
}; 