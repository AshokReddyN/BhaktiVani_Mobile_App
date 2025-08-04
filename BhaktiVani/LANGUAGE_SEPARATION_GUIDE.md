# Language Separation Implementation Guide

## Overview
The BhaktiVani app now supports **separate language settings** for:
- **UI Language**: Interface language (menus, buttons, labels) - defaults to **English**
- **Content Language**: Stotra/library content language - defaults to **Kannada**

## Key Changes Made

### 1. Language Type Separation
- **`UILanguageType`**: `'english' | 'kannada' | 'sanskrit' | 'telugu'` (for app interface)
- **`ContentLanguageType`**: `'kannada' | 'sanskrit' | 'telugu'` (for stotra content)
- **Backward compatibility**: `LanguageType` still exists as alias for `ContentLanguageType`

### 2. New Context: UILanguageContext
```typescript
// For UI language management
import { useUILanguageContext } from './src/contexts/UILanguageContext';

const { selectedUILanguage, setSelectedUILanguage, currentUILanguage } = useUILanguageContext();
```

### 3. Updated Context: LanguageContext
```typescript
// For content language management (existing functionality preserved)
import { useLanguageContext } from './src/contexts/LanguageContext';

const { selectedLanguage, setSelectedLanguage, currentLanguage } = useLanguageContext();
```

### 4. i18n Configuration
- **Default UI Language**: English (`en`)
- **Fallback**: English for all UI elements
- **Separate storage**: UI and content languages stored independently

### 5. Storage Service Updates
```typescript
// UI Language
await storageService.saveUILanguageSettings('english');
await storageService.getUILanguageSettings();

// Content Language  
await storageService.saveLanguageSettings('kannada');
await storageService.getLanguageSettings();
```

## Usage Examples

### Setting UI Language
```typescript
import { useUILanguageContext } from '../contexts/UILanguageContext';

const LanguageSelector = () => {
  const { setSelectedUILanguage } = useUILanguageContext();
  
  return (
    <Button onPress={() => setSelectedUILanguage('english')}>
      Switch to English UI
    </Button>
  );
};
```

### Setting Content Language
```typescript
import { useLanguageContext } from '../contexts/LanguageContext';

const ContentLanguageSelector = () => {
  const { setSelectedLanguage } = useLanguageContext();
  
  return (
    <Button onPress={() => setSelectedLanguage('sanskrit')}>
      Switch to Sanskrit Content
    </Button>
  );
};
```

### Using Translations
```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation(); // Uses current UI language
  
  return <Text>{t('common.loading')}</Text>; // "Loading..." in English
};
```

## Available Languages

### UI Languages
- **English** (default) - `en` - 🇺🇸
- **Kannada** - `kn` - 🇮🇳
- **Sanskrit** - `sa` - 🇮🇳  
- **Telugu** - `te` - 🇮🇳

### Content Languages
- **Kannada** (default) - `kn` - 🇮🇳
- **Sanskrit** - `sa` - 🇮🇳
- **Telugu** - `te` - 🇮🇳

## Migration Notes

### For Existing Code
- **No breaking changes**: Existing `useLanguageContext()` continues to work for content languages
- **New functionality**: Add `useUILanguageContext()` for UI language management
- **Default behavior**: English UI, Kannada content

### For New Features
- Use `UILanguageType` for UI language selection components
- Use `ContentLanguageType` for stotra/library language selection
- Import both contexts when you need to manage both types of languages

## Benefits

1. **User Experience**: Users can read content in their preferred Indian language while keeping the UI in English (or vice versa)
2. **Accessibility**: English UI makes the app more accessible to users learning Indian languages
3. **Flexibility**: Independent language settings for different app aspects
4. **Backward Compatibility**: Existing functionality preserved
5. **Future-Ready**: Easy to add more UI or content languages

## Context Integration Order
```typescript
<UILanguageProvider>      {/* UI language (English default) */}
  <LanguageProvider>      {/* Content language (Kannada default) */}
    <YourApp />
  </LanguageProvider>
</UILanguageProvider>
```

The separation is now complete and the app supports independent language settings! 🎉