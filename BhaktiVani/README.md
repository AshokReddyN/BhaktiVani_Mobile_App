# BhaktiVani Mobile App

BhaktiVani is a React Native app offering offline access to Hindu devotional texts in Kannada, Sanskrit, and Telugu. It features a Kindle-like reader with font controls, dark/light modes, language switching, audio/video guides, favorites, and accessibility support.

## 🚀 Features

- **Offline Reading**: Access sacred texts without internet connection
- **Multi-language Support**: Kannada, Sanskrit, and Telugu
- **Kindle-like Reader**: Customizable font size, family, and spacing
- **Dark/Light Mode**: Comfortable reading in any lighting condition
- **Audio/Video Guides**: Multimedia content for enhanced learning
- **Favorites System**: Bookmark and organize your favorite texts
- **Search Functionality**: Find specific content quickly
- **Accessibility Support**: Screen reader and voice control support

## 📱 Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for routing
- **Redux Toolkit** for state management
- **React Native Paper** for UI components
- **ESLint & Prettier** for code quality

## 🛠️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   ├── reader/         # Reader-specific components
│   ├── audio/          # Audio player components
│   └── video/          # Video player components
├── screens/            # Screen components
│   ├── auth/           # Authentication screens
│   ├── home/           # Home screen
│   ├── reader/         # Reader screen
│   ├── settings/       # Settings screen
│   ├── favorites/      # Favorites screen
│   └── search/         # Search screen
├── navigation/         # Navigation configuration
│   ├── stacks/         # Stack navigators
│   └── tabs/           # Tab navigators
├── services/           # API and external services
│   ├── api/            # API calls
│   ├── storage/        # Local storage
│   └── auth/           # Authentication
├── utils/              # Utility functions
│   ├── helpers/        # Helper functions
│   └── validation/     # Validation utilities
├── types/              # TypeScript type definitions
│   ├── api/            # API types
│   ├── components/     # Component types
│   └── navigation/     # Navigation types
├── constants/          # App constants
│   ├── colors/         # Color definitions
│   ├── fonts/          # Font configurations
│   └── strings/        # String constants
├── hooks/              # Custom React hooks
│   ├── common/         # Generic hooks
│   └── reader/         # Reader-specific hooks
├── store/              # Redux store
│   ├── slices/         # Redux slices
│   └── actions/        # Redux actions
└── assets/             # Static assets
    ├── images/         # Image files
    ├── fonts/          # Font files
    ├── audio/          # Audio files
    └── video/          # Video files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BhaktiVani
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📋 Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run type-check` - Run TypeScript type checking

## 🎨 Theme Configuration

The app uses a comprehensive theme system with:
- **Colors**: Primary, secondary, background, surface, and text colors
- **Typography**: Font families, sizes, and weights
- **Spacing**: Consistent spacing scale
- **Border Radius**: Standardized border radius values
- **Shadows**: Elevation and shadow styles

## 🔧 Development

### Code Style

The project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type safety

### State Management

Redux Toolkit is used for state management with:
- **Slices**: Modular state management
- **Actions**: Type-safe action creators
- **Selectors**: Efficient data access

### Navigation

React Navigation is configured with:
- **Stack Navigation**: For screen transitions
- **Tab Navigation**: For main app sections
- **Drawer Navigation**: For settings and menu

## 📦 Dependencies

### Core Dependencies
- `expo` - React Native framework
- `react-native` - Mobile app framework
- `@react-navigation/*` - Navigation library
- `@reduxjs/toolkit` - State management
- `react-native-paper` - UI component library

### Development Dependencies
- `typescript` - Type checking
- `eslint` - Code linting
- `prettier` - Code formatting
- `@typescript-eslint/*` - TypeScript ESLint rules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Hindu scriptures and texts
- React Native community
- Expo team for the excellent development tools 