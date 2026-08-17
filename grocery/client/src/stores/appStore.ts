import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme, Language, Location, SearchFilters } from '@/types';

interface AppState {
  // Theme
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Location
  location: Location | null;
  locationLoading: boolean;
  setLocation: (loc: Location | null) => void;
  setLocationLoading: (loading: boolean) => void;

  // Search
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;

  // Shopping List
  activeListId: string | null;
  setActiveListId: (id: string | null) => void;

  // Compare
  compareProducts: string[];
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;

  // Mobile nav
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  category: null,
  priceMin: null,
  priceMax: null,
  brand: null,
  store: null,
  storeType: null,
  sortBy: 'price_asc',
  inStock: true,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
        set({ theme: newTheme });
      },
      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },

      // Language
      language: 'en',
      setLanguage: (language) => set({ language }),

      // Location
      location: null,
      locationLoading: false,
      setLocation: (location) => set({ location }),
      setLocationLoading: (locationLoading) => set({ locationLoading }),

      // Search
      searchFilters: defaultFilters,
      setSearchFilters: (filters) =>
        set((s) => ({ searchFilters: { ...s.searchFilters, ...filters } })),
      resetFilters: () => set({ searchFilters: defaultFilters }),

      // Shopping List
      activeListId: null,
      setActiveListId: (activeListId) => set({ activeListId }),

      // Compare
      compareProducts: [],
      addToCompare: (productId) =>
        set((s) => {
          if (s.compareProducts.length >= 4) return s;
          if (s.compareProducts.includes(productId)) return s;
          return { compareProducts: [...s.compareProducts, productId] };
        }),
      removeFromCompare: (productId) =>
        set((s) => ({
          compareProducts: s.compareProducts.filter((id) => id !== productId),
        })),
      clearCompare: () => set({ compareProducts: [] }),

      // Mobile
      isMobileMenuOpen: false,
      setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
    }),
    {
      name: 'pricekart-app',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        location: state.location,
      }),
    }
  )
);
