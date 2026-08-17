import { motion } from 'framer-motion';
import { MapPin, Star, Clock, Navigation } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Badge from '@/components/ui/Badge';
import { storeTypeConfig, formatDistance } from '@/lib/utils';
import type { Store } from '@/types';

interface StoreCardProps {
  store: Store;
  compact?: boolean;
}

export default function StoreCard({ store, compact = false }: StoreCardProps) {
  const navigate = useNavigate();
  const config = storeTypeConfig[store.type] || storeTypeConfig.other;

  if (compact) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={() => navigate(`/stores/${store.id}`)}
        className="flex items-center gap-3 p-3 bg-white dark:bg-surface-800 rounded-xl cursor-pointer hover:shadow-soft transition-all"
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
          style={{ backgroundColor: config.color }}
        >
          {store.name[0]}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-surface-800 dark:text-surface-100 truncate">
            {store.name}
          </p>
          <p className="text-xs text-surface-400 truncate">{store.area}</p>
        </div>
        {store.distance !== undefined && (
          <span className="text-xs text-surface-400 flex-shrink-0">
            {formatDistance(store.distance)}
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/stores/${store.id}`)}
      className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer"
    >
      {/* Header with color band */}
      <div
        className="h-2"
        style={{ backgroundColor: config.color }}
      />

      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          {/* Store Avatar */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
            style={{ backgroundColor: config.color }}
          >
            {store.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-surface-800 dark:text-surface-100 leading-tight">
              {store.name}
            </h3>
            <Badge
              variant="neutral"
              size="sm"
              className="mt-1"
            >
              {config.label}
            </Badge>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-1.5 text-xs text-surface-500 dark:text-surface-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{store.address}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{store.hours}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-100 dark:border-surface-700">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
            <span className="text-sm font-semibold text-surface-800 dark:text-surface-100">
              {store.rating}
            </span>
            <span className="text-xs text-surface-400">
              ({store.total_ratings})
            </span>
          </div>
          {store.distance !== undefined && (
            <div className="flex items-center gap-1 text-xs text-primary-600 dark:text-primary-400 font-medium">
              <Navigation className="w-3.5 h-3.5" />
              {formatDistance(store.distance)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
