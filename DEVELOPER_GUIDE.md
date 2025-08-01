# BhaktiVani - Developer Guide & Project Explanation

This document provides a comprehensive overview of the initial architecture and implementation of the BhaktiVani application. It serves as a guide for developers to understand the design choices and to build upon this foundation.

## 1. High-Level Design & Architecture

The project is built on a standard, modern React Native stack with a focus on modularity, scalability, and maintainability.

- **Language:** TypeScript is used by default for its static typing, which helps prevent common errors and improves code clarity.
- **Architecture:** The architecture is component-based and screen-oriented. The core logic is decoupled from the UI through the use of React Context for state management. This makes components reusable and easier to test.
- **Project Structure:** The `src` directory is organized to clearly separate concerns:
  - `src/assets`: For static assets like data files (and later, fonts and images).
  - `src/components`: For reusable UI components (e.g., custom buttons, cards).
  - `src/contexts`: For global state management using React Context.
  - `src/navigation`: For setting up React Navigation.
  - `src/screens`: For top-level screen components.
  - `src/types`: For TypeScript type definitions.
  - `src/utils`: For helper functions.

## 2. State Management with React Context

For a project of this scale, a robust state management solution is crucial. We have opted to use **React Context** for its simplicity and built-in nature. This avoids adding external state management libraries like Redux for now, keeping the project lightweight.

We have three core contexts:
1.  **`LanguageContext`**: Manages the currently selected language (`kannada`, `sanskrit`, or `telugu`). All components that need to display language-specific content can consume this context to get the current language and re-render automatically when it changes.
2.  **`SettingsContext`**: Manages the reader's display preferences (font size, theme, etc.). This allows the `ReaderScreen` to dynamically adjust its appearance based on user settings, and these settings can be persisted across the app.
3.  **`FavoritesContext`**: Manages the list of favorited stotras. It simply stores an array of `stotraId`s. This makes it easy to check if a text is a favorite and to add or remove items from the list.

All context providers are wrapped around the main application in `App.tsx`, ensuring that any component in the tree can access this global state.

## 3. Data Flow and Offline-First Approach

The current implementation uses a **mock data source** located at `src/assets/data/sample_data.ts`. This was a deliberate choice to allow for rapid UI development and testing without the initial overhead of setting up a database.

- **Data Models**: The structure of the data is strictly enforced by TypeScript interfaces in `src/types/data.ts`.
- **Flow**: The `HomeScreen` imports data directly from `sample_data.ts`. It then uses the `language` from `useLanguage()` to filter this data and display only the relevant texts.

**Transitioning to a Real Database:**
The current setup is designed to be easily migrated to a true offline database like **SQLite** or **WatermelonDB**. To do this, you would:
1.  Set up the database and create tables that match the interfaces in `src/types/data.ts`.
2.  Create a data access layer (e.g., a set of functions like `fetchStotrasByLanguage(lang)`) that queries the database.
3.  Replace the direct import of `ALL_STOTRAS` in the screens with calls to your new data access layer.
The UI components themselves would require minimal changes.

## 4. Next Steps for Development

This initial setup is a strong foundation. Here are the recommended next steps:

1.  **Implement Navigation:**
    - Install `@react-navigation/native` and its dependencies.
    - Create a **Tab Navigator** in `src/navigation` for the main screens (Home, Search, Favorites).
    - Create a **Stack Navigator** to allow navigating from the `HomeScreen` list to the `ReaderScreen`.
    - Replace the `HomeScreen` in `App.tsx` with your main navigator component.

2.  **Build the ReaderScreen:**
    - Create the `ReaderScreen.tsx` component as described in `WIREFRAMES.md`.
    - Use the `useSettings()` hook to get the user's display preferences and apply them to the text component's style.
    - Implement the "Aa" settings dialog (e.g., as a modal) that uses the `updateSettings` function from the context to change preferences.

3.  **Persist State:**
    - The current state (selected language, settings, favorites) is lost when the app closes.
    - Use a library like **`react-native-mmkv`** or **`@react-native-async-storage/async-storage`** to save this state to the device.
    - In each context, use the `useEffect` hook to load the state from storage on app launch and to save it whenever it changes.

4.  **Implement Search and Favorites Screens:**
    - Build the `SearchScreen` and `FavoritesScreen` based on the wireframes. These will be straightforward as the required logic is already present in the `useLanguage` and `useFavorites` hooks.

## 5. Best Practices & Enhancements

- **Accessibility:** Ensure all tappable elements have a large enough touch target. Use `accessibilityLabel` props to provide context for screen readers.
- **Performance:** For long lists of texts, use `FlatList` as shown in `HomeScreen`. Avoid anonymous functions in render props if performance becomes an issue. For the `ReaderScreen`, consider virtualizing the text if rendering very long scriptures causes slowdowns.
- **Fonts:** To use custom fonts for the Indian scripts, add the font files to `src/assets/fonts` and link them using a `react-native.config.js` file.
- **Cloud Sync:** For features like syncing favorites across devices, consider a backend service like **Firebase Firestore**. You can sync the local database with the cloud when the user is online.

This project is now in a great position to be developed into a full-featured, high-quality application. The foundational decisions have been made to ensure it is robust and scalable.
