# Accessibility Features - BhaktiVani Mobile App

## Overview

The BhaktiVani mobile app includes comprehensive accessibility features to ensure that users with visual needs can comfortably use the application. These features are designed to improve readability, visibility, and overall user experience.

## Implemented Features

### 1. High Contrast Mode
- **Toggle**: Available in Settings > Accessibility > High Contrast
- **Description**: Enables maximum contrast colors for better visibility
- **Implementation**: 
  - Uses high contrast color palette (black background, white text, bright accent colors)
  - Overrides base theme when enabled
  - Applies to all screens and components

### 2. Large Text Support
- **Toggle**: Available in Settings > Accessibility > Large Text
- **Description**: Increases text size for easier reading
- **Implementation**:
  - Scales font sizes throughout the app
  - Respects user's custom font size preferences
  - Applied to all text elements including reader content

### 3. Increased Padding
- **Toggle**: Available in Settings > Accessibility > Increased Padding
- **Description**: Adds more spacing between elements for better touch targets
- **Implementation**:
  - Scales padding values throughout the app
  - Improves touch target sizes
  - Applied to containers, buttons, and interactive elements

### 4. System Font Scaling Awareness
- **Toggle**: Available in Settings > Accessibility > System Font Scaling
- **Description**: Respects system font size settings
- **Implementation**:
  - Detects system font scaling settings
  - Applies system font scale to app text
  - Works in conjunction with app's large text setting

## Technical Implementation

### Accessibility Context
The app uses a centralized `AccessibilityContext` to manage all accessibility settings:

```typescript
interface AccessibilitySettings {
  isHighContrastEnabled: boolean;
  isLargeTextEnabled: boolean;
  isIncreasedPaddingEnabled: boolean;
  isSystemFontScalingEnabled: boolean;
  customFontSize: number;
  customPadding: number;
}
```

### Theme Integration
- High contrast mode integrates with the existing theme system
- When enabled, high contrast theme overrides the base theme
- All color schemes are optimized for maximum contrast

### Font Scaling
- Uses `getScaledFontSize()` function to apply accessibility font scaling
- Combines custom large text setting with system font scaling
- Applied consistently across all text elements

### Padding Scaling
- Uses `getScaledPadding()` function to apply accessibility padding
- Improves touch targets and visual spacing
- Applied to containers, buttons, and interactive elements

## Testing

### Accessibility Test Screen
The app includes a dedicated test screen to verify accessibility features:

1. Navigate to Settings > Accessibility
2. Tap "Test Accessibility Features"
3. The test screen shows:
   - Current accessibility settings
   - Font size scaling examples
   - Padding scaling examples
   - Color contrast examples
   - Sample content with applied settings

### Testable Features
- ✅ High contrast mode toggle updates all relevant styles
- ✅ Large text setting scales font sizes appropriately
- ✅ Increased padding setting improves spacing
- ✅ System font scaling respects device settings
- ✅ All settings persist across app sessions

## User Experience

### Settings Screen
The accessibility settings are organized in a dedicated section:

```
Settings > Accessibility
├── High Contrast
├── Large Text
├── Increased Padding
├── System Font Scaling
└── Test Accessibility Features
```

### Visual Feedback
- All toggles provide immediate visual feedback
- Settings are applied instantly across the app
- Changes are saved automatically

### Responsive Design
- All accessibility features work across different screen sizes
- Layout adapts to increased padding and font sizes
- Maintains usability on both small and large devices

## Future Enhancements

### Planned Features
- Voice-over support for screen readers
- Haptic feedback for interactions
- Customizable color schemes
- Advanced text-to-speech integration

### Accessibility Guidelines Compliance
The implementation follows WCAG 2.1 guidelines:
- **1.4.3 Contrast (Minimum)**: High contrast mode ensures sufficient contrast
- **1.4.4 Resize Text**: Large text and system font scaling support
- **2.5.5 Target Size**: Increased padding improves touch targets

## Technical Notes

### Dependencies
- React Native Paper for UI components
- AsyncStorage for settings persistence
- React Navigation for screen management

### Performance Considerations
- Accessibility settings are cached for performance
- Font scaling calculations are optimized
- Theme changes are applied efficiently

### Cross-Platform Support
- All features work on both iOS and Android
- Respects platform-specific accessibility settings
- Maintains consistent behavior across platforms

## Support

For issues or questions about accessibility features:
1. Check the accessibility test screen for verification
2. Review settings in the Settings > Accessibility section
3. Ensure system accessibility settings are properly configured
4. Test with different accessibility settings combinations 