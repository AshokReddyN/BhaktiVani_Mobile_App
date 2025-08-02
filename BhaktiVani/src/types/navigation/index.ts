export type RootStackParamList = {
  Home: undefined;
  Library: undefined;
  Reader: { stotraId?: string };
  Settings: undefined;
  Favorites: undefined;
  Download: undefined;
  Search: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
} 