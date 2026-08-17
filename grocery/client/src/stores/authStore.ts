import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile } from '@/types';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: Profile | null;
  session: { access_token: string } | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setUser: (user: Profile | null) => void;
  setSession: (session: { access_token: string } | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),

      signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null, isAuthenticated: false });
      },

      initialize: async () => {
        try {
          set({ isLoading: true });
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            set({
              user: profile || {
                id: session.user.id,
                full_name: session.user.user_metadata?.full_name || 'User',
                phone: session.user.phone || null,
                avatar_url: session.user.user_metadata?.avatar_url || null,
                preferred_language: 'en',
                location_lat: null,
                location_lng: null,
                role: 'user',
                reward_points: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              },
              session: { access_token: session.access_token },
              isAuthenticated: true,
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'pricekart-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
