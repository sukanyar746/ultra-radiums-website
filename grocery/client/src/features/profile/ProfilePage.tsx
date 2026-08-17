import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Bell, Moon, Sun, Globe, Award, HelpCircle, MessageSquare, LogOut, ChevronRight, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { useAuthStore } from '@/stores/authStore';
import { getInitials, cn } from '@/lib/utils';

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { theme, toggleTheme, language, setLanguage } = useAppStore();
  const { user, isAuthenticated, signOut } = useAuthStore();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'kn' : 'en';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const menuItems = [
    { icon: Bell, label: t('profile.price_alerts'), to: '#alerts', color: 'text-blue-500' },
    { icon: Award, label: t('profile.rewards'), to: '#rewards', color: 'text-accent-500' },
    {
      icon: theme === 'dark' ? Sun : Moon,
      label: t('profile.dark_mode'),
      action: toggleTheme,
      toggle: true,
      isOn: theme === 'dark',
      color: 'text-purple-500',
    },
    {
      icon: Globe,
      label: t('profile.language'),
      action: toggleLanguage,
      subtitle: language === 'en' ? 'English' : 'ಕನ್ನಡ',
      color: 'text-green-500',
    },
    { icon: HelpCircle, label: t('profile.help'), to: '#', color: 'text-cyan-500' },
    { icon: MessageSquare, label: t('profile.feedback'), to: '#', color: 'text-pink-500' },
    { icon: Shield, label: t('profile.about'), to: '#', color: 'text-surface-500' },
  ];

  return (
    <>
      <Helmet>
        <title>Profile | PriceKart Karnataka</title>
      </Helmet>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6 mb-6"
        >
          <div className="flex items-center gap-4">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-16 h-16 rounded-2xl object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-white text-xl font-bold">
                {user ? getInitials(user.full_name) : <User className="w-7 h-7" />}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-surface-900 dark:text-white">
                {user?.full_name || 'Guest User'}
              </h2>
              {user && (
                <p className="text-sm text-surface-400">
                  {user.reward_points || 0} points · {user.role}
                </p>
              )}
            </div>
            {isAuthenticated && (
              <button
                onClick={() => {}}
                className="px-3 py-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-colors"
              >
                {t('profile.edit')}
              </button>
            )}
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden mb-6"
        >
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={item.action || (() => item.to && navigate(item.to))}
                className="w-full flex items-center px-5 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors text-left border-b border-surface-100 dark:border-surface-700 last:border-0"
              >
                <Icon className={cn('w-5 h-5 mr-3 flex-shrink-0', item.color)} />
                <span className="flex-1 text-sm font-medium text-surface-700 dark:text-surface-200">
                  {item.label}
                </span>
                {item.subtitle && (
                  <span className="text-xs text-surface-400 mr-2">{item.subtitle}</span>
                )}
                {item.toggle ? (
                  <div className={cn(
                    'w-11 h-6 rounded-full p-0.5 transition-colors',
                    item.isOn ? 'bg-primary-500' : 'bg-surface-300 dark:bg-surface-600'
                  )}>
                    <div className={cn(
                      'w-5 h-5 rounded-full bg-white transition-transform shadow-sm',
                      item.isOn ? 'translate-x-5' : 'translate-x-0'
                    )} />
                  </div>
                ) : (
                  <ChevronRight className="w-4 h-4 text-surface-400" />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Logout */}
        {isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={() => {
                signOut();
                navigate('/');
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-red-50 dark:bg-red-900/20 text-red-500 font-semibold rounded-2xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              {t('nav.logout')}
            </button>
          </motion.div>
        )}

        {/* Version */}
        <p className="text-center text-xs text-surface-400 mt-6">{t('profile.version')}</p>
      </div>
    </>
  );
}
