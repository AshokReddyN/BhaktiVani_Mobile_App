import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Stotra } from '../types/data';

interface FavoritesContextType {
  favorites: string[]; // Array of stotra IDs
  toggleFavorite: (stotraId: string) => void;
  isFavorite: (stotraId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (stotraId: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(stotraId)) {
        return prevFavorites.filter(id => id !== stotraId);
      } else {
        return [...prevFavorites, stotraId];
      }
    });
  };

  const isFavorite = (stotraId: string) => {
    return favorites.includes(stotraId);
  };

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
