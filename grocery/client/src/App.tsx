import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Header from '@/components/layout/Header';
import MobileNav from '@/components/layout/MobileNav';
import Footer from '@/components/layout/Footer';
import { PageSkeleton } from '@/components/ui/Skeleton';
import { useAppStore } from '@/stores/appStore';
import '@/i18n/config';

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import('@/features/home/HomePage'));
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const SearchPage = lazy(() => import('@/features/search/SearchPage'));
const ProductPage = lazy(() => import('@/features/product/ProductPage'));
const StoresPage = lazy(() => import('@/features/stores/StoresPage'));
const OffersPage = lazy(() => import('@/features/offers/OffersPage'));
const ComparePage = lazy(() => import('@/features/compare/ComparePage'));
const CommunityPage = lazy(() => import('@/features/community/CommunityPage'));
const ShoppingListPage = lazy(() => import('@/features/shopping-list/ShoppingListPage'));
const ProfilePage = lazy(() => import('@/features/profile/ProfilePage'));

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-surface-50 dark:bg-surface-950">
      <Header />
      <main className="flex-1 pb-24 md:pb-0">
        <Suspense fallback={<PageSkeleton />}>
          {children}
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default function App() {
  const { theme } = useAppStore();

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth - no layout */}
          <Route
            path="/login"
            element={
              <Suspense fallback={<PageSkeleton />}>
                <LoginPage />
              </Suspense>
            }
          />

          {/* All other routes with layout */}
          <Route
            path="*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/stores" element={<StoresPage />} />
                  <Route path="/stores/:id" element={<StoresPage />} />
                  <Route path="/offers" element={<OffersPage />} />
                  <Route path="/compare" element={<ComparePage />} />
                  <Route path="/community" element={<CommunityPage />} />
                  <Route path="/lists" element={<ShoppingListPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>

        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              background: 'var(--color-surface-800, #1e293b)',
              color: '#f1f5f9',
              fontSize: '14px',
              fontWeight: '500',
            },
          }}
        />
      </BrowserRouter>
    </HelmetProvider>
  );
}
