import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home, Search, GitCompareArrows, ListChecks, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/stores/appStore';

const navItems = [
  { path: '/', icon: Home, labelKey: 'nav.home' },
  { path: '/search', icon: Search, labelKey: 'nav.search' },
  { path: '/compare', icon: GitCompareArrows, labelKey: 'nav.compare', hasBadge: true },
  { path: '/lists', icon: ListChecks, labelKey: 'nav.lists' },
  { path: '/profile', icon: User, labelKey: 'nav.profile' },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { compareProducts } = useAppStore();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-surface-200/50 dark:border-surface-700/50 pb-safe">
      <div className="flex items-stretch justify-around px-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          const badgeCount = item.hasBadge ? compareProducts.length : 0;

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-2.5 px-2 rounded-xl transition-all relative',
                isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-surface-400 dark:text-surface-500'
              )}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {badgeCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 bg-accent-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {badgeCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium leading-tight">{t(item.labelKey)}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-1 bg-primary-500 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
