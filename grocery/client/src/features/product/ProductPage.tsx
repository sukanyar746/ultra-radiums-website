import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Bell, ShoppingCart, GitCompareArrows, MapPin, Navigation,
  TrendingDown, TrendingUp, Minus, Star, Check, ExternalLink
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import ProductCard from '@/components/shared/ProductCard';
import {
  mockProducts, mockCategories, mockStores, mockStorePrices, mockPriceHistory,
  getPricesForProduct, getBestPrice
} from '@/lib/mockData';
import { formatPrice, calcDiscount, storeTypeConfig, timeAgo, cn } from '@/lib/utils';
import { useAppStore } from '@/stores/appStore';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { addToCompare } = useAppStore();
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const isKannada = i18n.language === 'kn';

  const product = mockProducts.find((p) => p.id === id);
  const category = product ? mockCategories.find((c) => c.id === product.category_id) : null;
  const storePrices = product ? getPricesForProduct(product.id) : [];
  const bestPrice = product ? getBestPrice(product.id) : null;

  // Price history chart data
  const chartData = useMemo(() => {
    if (!product) return [];
    const history = mockPriceHistory.filter((h) => h.product_id === product.id);

    // Aggregate by date
    const byDate = new Map<string, { date: string; prices: number[] }>();
    for (const h of history) {
      const date = new Date(h.recorded_at).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
      });
      if (!byDate.has(date)) byDate.set(date, { date, prices: [] });
      byDate.get(date)!.prices.push(h.price);
    }

    return Array.from(byDate.values()).map((d) => ({
      date: d.date,
      avgPrice: Math.round(d.prices.reduce((a, b) => a + b, 0) / d.prices.length),
      minPrice: Math.min(...d.prices),
      maxPrice: Math.max(...d.prices),
    }));
  }, [product]);

  // Related products (same category)
  const relatedProducts = product
    ? mockProducts.filter((p) => p.category_id === product.category_id && p.id !== product.id).slice(0, 4)
    : [];

  // Simple price prediction
  const prediction = useMemo(() => {
    if (chartData.length < 5) return null;
    const recentPrices = chartData.slice(-7).map((d) => d.avgPrice);
    const avg = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length;
    const trend = recentPrices[recentPrices.length - 1] - recentPrices[0];
    const predicted = Math.round(avg + trend * 0.3);
    return {
      predicted,
      trend: trend > 2 ? 'up' : trend < -2 ? 'down' : 'stable' as 'up' | 'down' | 'stable',
      confidence: 72,
    };
  }, [chartData]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-lg font-semibold text-surface-600 dark:text-surface-300">Product not found</p>
        <Button onClick={() => navigate('/')} variant="secondary" className="mt-4">
          Go Home
        </Button>
      </div>
    );
  }

  const discount = bestPrice ? calcDiscount(bestPrice.mrp, bestPrice.price) : 0;
  const bestStore = bestPrice ? mockStores.find((s) => s.id === bestPrice.store_id) : null;

  return (
    <>
      <Helmet>
        <title>{product.name} - Price Comparison | PriceKart Karnataka</title>
        <meta name="description" content={`Compare ${product.name} prices across stores in Karnataka. Current best price: ${bestPrice ? formatPrice(bestPrice.price) : 'N/A'}`} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 dark:hover:text-surface-300 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </button>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Left: Product Image & Info */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-soft sticky top-28"
            >
              <div className="relative bg-surface-50 dark:bg-surface-900 h-64 md:h-80">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {discount > 0 && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="danger">{discount}% OFF</Badge>
                  </div>
                )}
              </div>
              <div className="p-5">
                {category && (
                  <Badge variant="neutral" size="sm" className="mb-2">
                    {category.icon} {isKannada ? category.name_kn : category.name}
                  </Badge>
                )}
                <h1 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-white mb-1">
                  {isKannada ? product.name_kn : product.name}
                </h1>
                <p className="text-sm text-surface-500 mb-3">
                  {product.brand} · {product.base_quantity} {product.unit}
                </p>

                {bestPrice && (
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {formatPrice(bestPrice.price)}
                    </span>
                    {discount > 0 && (
                      <span className="text-lg text-surface-400 line-through">
                        {formatPrice(bestPrice.mrp)}
                      </span>
                    )}
                  </div>
                )}

                {bestStore && (
                  <p className="text-sm text-surface-500 mb-4">
                    {t('product.best_price')}: <span className="font-semibold text-surface-700 dark:text-surface-300">{bestStore.name}</span>
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button icon={<ShoppingCart className="w-4 h-4" />} className="flex-1">
                    {t('product.add_to_list')}
                  </Button>
                  <Button
                    variant="outline"
                    icon={<Bell className="w-4 h-4" />}
                    onClick={() => {}}
                  >
                    {t('product.set_alert')}
                  </Button>
                  <Button
                    variant="ghost"
                    icon={<GitCompareArrows className="w-4 h-4" />}
                    onClick={() => addToCompare(product.id)}
                  >
                    {''}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Price Comparison & Charts */}
          <div className="md:col-span-3 space-y-6">
            {/* Price Comparison Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden"
            >
              <div className="p-5 border-b border-surface-100 dark:border-surface-700">
                <h2 className="text-lg font-bold text-surface-900 dark:text-white">
                  {t('product.price_comparison')}
                </h2>
              </div>
              <div className="divide-y divide-surface-100 dark:divide-surface-700">
                {storePrices.map((sp, i) => {
                  const storeConfig = storeTypeConfig[sp.store.type] || storeTypeConfig.other;
                  const isBest = i === 0;
                  return (
                    <motion.div
                      key={sp.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={cn(
                        'flex items-center justify-between px-5 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors',
                        isBest && 'bg-primary-50/50 dark:bg-primary-900/10'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                          style={{ backgroundColor: storeConfig.color }}
                        >
                          {sp.store.name[0]}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-surface-800 dark:text-surface-100">
                              {sp.store.name}
                            </span>
                            {isBest && (
                              <span className="price-best">{t('product.best_price')}</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-surface-400">{sp.store.area}</span>
                            {!sp.in_stock && (
                              <Badge variant="danger" size="sm">{t('product.out_of_stock')}</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={cn(
                          'text-lg font-bold',
                          isBest ? 'text-primary-600 dark:text-primary-400' : 'text-surface-800 dark:text-surface-100'
                        )}>
                          {formatPrice(sp.price)}
                        </p>
                        {sp.discount_pct > 0 && (
                          <p className="text-xs text-surface-400 line-through">
                            {formatPrice(sp.mrp)}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Price History Chart */}
            {chartData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-5"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-bold text-surface-900 dark:text-white">
                    {t('product.price_history')}
                  </h2>
                  <Tabs
                    tabs={[
                      { id: 'daily', label: t('product.daily') },
                      { id: 'weekly', label: t('product.weekly') },
                      { id: 'monthly', label: t('product.monthly') },
                    ]}
                    activeTab={chartPeriod}
                    onChange={(id) => setChartPeriod(id as any)}
                  />
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" fontSize={11} tick={{ fill: '#94a3b8' }} />
                      <YAxis fontSize={11} tick={{ fill: '#94a3b8' }} tickFormatter={(v) => `₹${v}`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--color-surface-800, #1e293b)',
                          border: 'none',
                          borderRadius: '12px',
                          color: '#f1f5f9',
                          fontSize: '13px',
                        }}
                        formatter={(value: number) => [`₹${value}`, 'Price']}
                      />
                      <Area
                        type="monotone"
                        dataKey="avgPrice"
                        stroke="#10b981"
                        strokeWidth={2.5}
                        fill="url(#priceGrad)"
                        dot={{ fill: '#10b981', r: 3 }}
                        activeDot={{ r: 5, fill: '#059669' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* AI Price Prediction */}
            {prediction && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-2xl p-5 border border-primary-200 dark:border-primary-800"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🤖</span>
                  <h3 className="font-bold text-surface-800 dark:text-white">
                    {t('product.prediction')}
                  </h3>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-surface-500 mb-1">{t('product.predicted_price')}</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {formatPrice(prediction.predicted)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-surface-800/60">
                    {prediction.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : prediction.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    ) : (
                      <Minus className="w-4 h-4 text-surface-400" />
                    )}
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      {t(`product.trend_${prediction.trend}`)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-surface-900 dark:text-white mb-4">
                  {t('product.related')}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} showCompare={false} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
