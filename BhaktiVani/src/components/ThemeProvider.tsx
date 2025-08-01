import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../store';
import { setIsDark, loadTheme } from '../store/slices/themeSlice';
import { lightTheme, darkTheme } from '../constants/theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { mode, isDark } = useAppSelector((state) => state.theme);
  const systemColorScheme = useColorScheme();

  // Load saved theme on app start
  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  // Handle auto theme detection
  useEffect(() => {
    if (mode === 'auto') {
      dispatch(setIsDark(systemColorScheme === 'dark'));
    }
  }, [mode, systemColorScheme, dispatch]);

  const currentTheme = isDark ? darkTheme : lightTheme;

  return (
    <PaperProvider theme={currentTheme}>
      {children}
    </PaperProvider>
  );
};

export default ThemeProvider;