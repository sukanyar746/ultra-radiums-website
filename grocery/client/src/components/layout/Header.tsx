import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Sun, Moon, Globe, User,
  ChevronDown, ShoppingCart, LogOut, Menu, X, Bell
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';
import { cn, getInitials } from '@/lib/utils';
import Input from '@/components/ui/Input';

export default function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme, language, setLanguage, location: userLocation, compareProducts } = useAppStore();
  const { user, isAuthenticated, signOut } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'kn' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/search', label: t('nav.search') },
    { to: '/compare', label: t('nav.compare'), badge: compareProducts.length || undefined },
    { to: '/offers', label: t('nav.offers') },
    { to: '/stores', label: t('nav.stores') },
    { to: '/community', label: t('nav.community') },
  ];

  return (
    <header className="sticky top-0 z-40 glass border-b border-surface-200/50 dark:border-surface-700/50" style={{ isolation: 'isolate' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Row */}
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-bold text-surface-900 dark:text-white leading-none">
                PriceKart
              </h1>
              <p className="text-[10px] text-primary-600 dark:text-primary-400 font-medium leading-none mt-0.5">
                Karnataka
              </p>
            </div>
          </Link>

          {/* Search Bar — Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('home.search_placeholder')}
              icon={<Search className="w-4.5 h-4.5 text-surface-400" />}
              className="py-2.5 text-sm"
            />
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Location */}
            <button
              onClick={() => navigate('/stores')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-lg transition-colors"
            >
              <MapPin className="w-4 h-4 text-primary-500" />
              <span className="max-w-[100px] truncate">
                {userLocation ? 'Bengaluru' : t('home.detect_location')}
              </span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              title={language === 'en' ? 'ಕನ್ನಡ' : 'English'}
            >
              <span className="text-xs font-bold text-surface-600 dark:text-surface-300">
                {language === 'en' ? 'ಕ' : 'En'}
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-4.5 h-4.5 text-surface-600" />
              ) : (
                <Sun className="w-4.5 h-4.5 text-accent-400" />
              )}
            </button>

            {/* User Menu */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                >
                  {user.avatar_url ? (
                    <img
                      src={user.avatar_url}
                      alt={user.full_name}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-white text-xs font-bold">
                      {getInitials(user.full_name)}
                    </div>
                  )}
                </button>
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      className="absolute right-0 top-12 w-56 bg-white dark:bg-surface-800 rounded-xl shadow-elevated border border-surface-100 dark:border-surface-700 py-2 z-50"
                    >
                      <div className="px-4 py-2 border-b border-surface-100 dark:border-surface-700">
                        <p className="text-sm font-semibold text-surface-800 dark:text-white">
                          {user.full_name}
                        </p>
                        <p className="text-xs text-surface-400">
                          {user.reward_points} points
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                      >
                        <User className="w-4 h-4" />
                        {t('nav.profile')}
                      </Link>
                      <Link
                        to="/lists"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {t('nav.lists')}
                      </Link>
                      <Link
                        to="/profile#alerts"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                      >
                        <Bell className="w-4 h-4" />
                        {t('profile.price_alerts')}
                      </Link>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-surface-600 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700"
                        >
                          <Menu className="w-4 h-4" />
                          {t('nav.admin')}
                        </Link>
                      )}
                      <hr className="my-1 border-surface-100 dark:border-surface-700" />
                      <button
                        onClick={() => {
                          signOut();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        {t('nav.logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 text-sm font-semibold text-white gradient-primary rounded-xl hover:opacity-90 transition-opacity"
              >
                {t('nav.login')}
              </button>
            )}
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-0.5 -mb-px pb-0 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'px-3.5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap relative',
                location.pathname === link.to
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-surface-500 hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200'
              )}
            >
              {link.label}
              {link.badge && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {link.badge}
                </span>
              )}
              {location.pathname === link.to && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400 rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
