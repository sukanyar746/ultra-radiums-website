import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Star, Navigation, Clock, Filter, Map, List } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import StoreCard from '@/components/shared/StoreCard';
import Badge from '@/components/ui/Badge';
import { mockStores } from '@/lib/mockData';
import { storeTypeConfig, cn } from '@/lib/utils';
import type { StoreType } from '@/types';

const storeTypes: { id: string; label: string }[] = [
  { id: 'all', label: 'All Stores' },
  { id: 'kirana', label: 'Kirana' },
  { id: 'reliance', label: 'Reliance Smart' },
  { id: 'dmart', label: 'DMart' },
  { id: 'more', label: 'More' },
  { id: 'spar', label: 'Spar' },
  { id: 'metro', label: 'Metro' },
];

export default function StoresPage() {
  const { t } = useTranslation();
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const filteredStores = filterType === 'all'
    ? mockStores
    : mockStores.filter((s) => s.type === filterType);

  const storesWithDistance = filteredStores.map((s) => ({
    ...s,
    distance: Math.round((Math.random() * 80 + 5)) / 10,
  })).sort((a, b) => a.distance - b.distance);

  return (
    <>
      <Helmet>
        <title>Stores Near You | PriceKart Karnataka</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white mb-1">
            {t('stores.title')}
          </h1>
          <p className="text-sm text-surface-500">{t('stores.subtitle')}</p>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 gap-3">
          {/* Type Filters */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
            {storeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
                  filterType === type.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300 hover:bg-surface-200 dark:hover:bg-surface-700'
                )}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden flex-shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'list' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-white dark:bg-surface-800 text-surface-400'
              )}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'map' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-white dark:bg-surface-800 text-surface-400'
              )}
            >
              <Map className="w-4 h-4" />
            </button>
          </div>
        </div>

        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {storesWithDistance.map((store, i) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <StoreCard store={store} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Map Placeholder */
          <div className="bg-surface-100 dark:bg-surface-800 rounded-2xl h-[500px] flex items-center justify-center">
            <div className="text-center">
              <Map className="w-16 h-16 text-surface-300 dark:text-surface-600 mx-auto mb-3" />
              <p className="text-surface-500 dark:text-surface-400 font-medium">
                Google Maps integration
              </p>
              <p className="text-sm text-surface-400 dark:text-surface-500 mt-1">
                Add your Google Maps API key to enable map view
              </p>
            </div>
          </div>
        )}

        {/* Store Count */}
        <p className="text-sm text-surface-400 mt-6 text-center">
          Showing {storesWithDistance.length} stores in Bengaluru
        </p>
      </div>
    </>
  );
}
