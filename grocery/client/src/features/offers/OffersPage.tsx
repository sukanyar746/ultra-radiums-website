import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Tag, Percent, Clock, Ticket, Filter, Gift } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Badge from '@/components/ui/Badge';
import { mockOffers, mockStores } from '@/lib/mockData';
import { storeTypeConfig, cn } from '@/lib/utils';

export default function OffersPage() {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState('all');
  const isKannada = i18n.language === 'kn';

  const offers = filter === 'all'
    ? mockOffers
    : mockOffers.filter((o) => {
        const store = mockStores.find((s) => s.id === o.store_id);
        return store?.type === filter;
      });

  return (
    <>
      <Helmet>
        <title>Offers & Deals | PriceKart Karnataka</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Gift className="w-6 h-6 text-accent-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">
              {t('offers.title')}
            </h1>
          </div>
          <p className="text-sm text-surface-500">{t('offers.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 -mx-4 px-4">
          {['all', 'dmart', 'reliance', 'more', 'spar', 'metro', 'kirana'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={cn(
                'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
                filter === type
                  ? 'bg-accent-500 text-white'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300'
              )}
            >
              {type === 'all' ? t('common.all') : storeTypeConfig[type]?.label || type}
            </button>
          ))}
        </div>

        {/* Offers Grid */}
        {offers.length === 0 ? (
          <div className="text-center py-16">
            <Tag className="w-16 h-16 text-surface-300 mx-auto mb-3" />
            <p className="text-lg font-semibold text-surface-600 dark:text-surface-300">
              {t('offers.no_offers')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map((offer, i) => {
              const store = mockStores.find((s) => s.id === offer.store_id);
              const config = store ? storeTypeConfig[store.type] : storeTypeConfig.other;

              return (
                <motion.div
                  key={offer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden hover:shadow-card transition-shadow"
                >
                  {/* Color Header */}
                  <div
                    className="h-2"
                    style={{ backgroundColor: config.color }}
                  />
                  <div className="p-5">
                    {/* Discount Badge */}
                    <div className="flex items-center flex-wrap gap-2 mb-3">
                      <Badge variant="accent" size="md">
                        {offer.discount_type === 'percentage'
                          ? t('offers.percentage_off', { value: offer.discount_value })
                          : offer.discount_type === 'flat'
                          ? t('offers.flat_off', { value: offer.discount_value })
                          : t('offers.bogo')}
                      </Badge>
                      {offer.is_featured && (
                        <Badge variant="primary" size="sm">⭐ Featured</Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-surface-800 dark:text-white mb-1.5 leading-tight">
                      {isKannada ? offer.title_kn || offer.title : offer.title}
                    </h3>
                    <p className="text-sm text-surface-500 dark:text-surface-400 mb-3 line-clamp-2">
                      {isKannada ? offer.description_kn || offer.description : offer.description}
                    </p>

                    {/* Store & Meta */}
                    <div className="flex items-center justify-between text-xs text-surface-400">
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center text-white text-[10px] font-bold"
                          style={{ backgroundColor: config.color }}
                        >
                          {store?.name[0]}
                        </div>
                        <span>{store?.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{t('offers.valid_until', { date: new Date(offer.valid_until).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) })}</span>
                      </div>
                    </div>

                    {/* Coupon & CTA */}
                    {offer.coupon_code && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-dashed border-surface-300 dark:border-surface-600 rounded-lg text-center">
                          <span className="text-sm font-mono font-bold text-primary-600 dark:text-primary-400 tracking-wider">
                            {offer.coupon_code}
                          </span>
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText(offer.coupon_code!)}
                          className="px-3 py-2 text-xs font-semibold text-white gradient-primary rounded-lg hover:opacity-90 transition-opacity"
                        >
                          Copy
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
