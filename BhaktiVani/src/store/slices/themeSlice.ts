import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppDispatch } from '../index';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface ThemeState {
  mode: ThemeMode;
  isDark: boolean;
}

const initialState: ThemeState = {
  mode: 'light',
  isDark: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      // Update isDark based on mode
      if (action.payload === 'light') {
        state.isDark = false;
      } else if (action.payload === 'dark') {
        state.isDark = true;
      }
      // For 'auto' mode, we'll handle it in the component
    },
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.isDark = action.payload;
    },
  },
});

export const { setThemeMode, setIsDark } = themeSlice.actions;

// Async action to load theme from storage
export const loadTheme = () => async (dispatch: AppDispatch) => {
  try {
    const savedTheme = await AsyncStorage.getItem('theme_mode');
    if (savedTheme) {
      dispatch(setThemeMode(savedTheme as ThemeMode));
    }
  } catch (error) {
    console.error('Error loading theme:', error);
  }
};

// Async action to save theme to storage
export const saveTheme = (mode: ThemeMode) => async (dispatch: AppDispatch) => {
  try {
    await AsyncStorage.setItem('theme_mode', mode);
    dispatch(setThemeMode(mode));
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

export default themeSlice.reducer;