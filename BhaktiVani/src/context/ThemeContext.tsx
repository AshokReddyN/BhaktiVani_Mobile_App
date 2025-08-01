import React, { createContext, useState, useMemo, ReactNode } from 'react';
import { lightTheme, darkTheme } from '../constants/theme';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
  theme: typeof lightTheme | typeof darkTheme;
}

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  toggleTheme: () => {},
  theme: lightTheme,
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === 'dark');

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  );

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
