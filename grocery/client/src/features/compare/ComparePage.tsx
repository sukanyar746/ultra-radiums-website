import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { X, Plus, ArrowLeftRight, TrendingDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockProducts, getPricesForProduct, getBestPrice, mockCategories } from '@/lib/mockData';
import { formatPrice, calcDiscount, storeTypeConfig, cn } from '@/lib/utils';
import { useAppStore } from '@/stores/appStore';

export default function ComparePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { compareProducts, removeFromCompare, clearCompare } = useAppStore();
  const isKannada = i18n.language === 'kn';

  const products = useMemo(
    () => compareProducts.map((id) => mockProducts.find((p) => p.id === id)).filter(Boolean),
    [compareProducts]
  );

  const priceData = useMemo(
    () => products.map((p) => (p ? { product: p, prices: getPricesForProduct(p.id), best: getBestPrice(p.id) } : null)).filter(Boolean),
    [products]
  );

  return (
    <>
      <Helmet>
        <title>Compare Products | PriceKart Karnataka</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <ArrowLeftRight className="w-7 h-7 text-primary-500" />
              {t('compare.title')}
            </h1>
            <p className="text-sm text-surface-500 mt-0.5">{t('compare.subtitle')}</p>
          </div>
          {compareProducts.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearCompare}>
              Clear All
            </Button>
          )}
        </div>

        {products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <ArrowLeftRight className="w-16 h-16 text-surface-300 mx-auto mb-4" />
            <p className="text-lg font-semibold text-surface-600 dark:text-surface-300 mb-2">
              {t('compare.no_products')}
            </p>
            <Button onClick={() => navigate('/search')} variant="secondary">
              Browse Products
            </Button>
          </motion.div>
        ) : (
          <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-surface-500 w-36">Product</th>
                  {priceData.map((item) => (
                    <th key={item!.product.id} className="p-3 text-center">
                      <div className="relative bg-white dark:bg-surface-800 rounded-2xl p-4 shadow-soft">
                        <button
                          onClick={() => removeFromCompare(item!.product.id)}
                          className="absolute top-2 right-2 p-1 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700"
                        >
                          <X className="w-4 h-4 text-surface-400" />
                        </button>
                        <img
                          src={item!.product.image_url}
                          alt={item!.product.name}
                          className="w-20 h-20 object-cover rounded-xl mx-auto mb-2"
                        />
                        <p className="text-sm font-bold text-surface-800 dark:text-white">
                          {isKannada ? item!.product.name_kn : item!.product.name}
                        </p>
                        <p className="text-xs text-surface-400">{item!.product.brand}</p>
                      </div>
                    </th>
                  ))}
                  {compareProducts.length < 4 && (
                    <th className="p-3">
                      <button
                        onClick={() => navigate('/search')}
                        className="w-full h-[160px] border-2 border-dashed border-surface-200 dark:border-surface-700 rounded-2xl flex flex-col items-center justify-center gap-2 text-surface-400 hover:border-primary-400 hover:text-primary-500 transition-colors"
                      >
                        <Plus className="w-6 h-6" />
                        <span className="text-sm font-medium">{t('compare.add_product')}</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {/* Best Price Row */}
                <tr className="bg-primary-50/50 dark:bg-primary-900/10">
                  <td className="p-3 text-sm font-semibold text-surface-700 dark:text-surface-300">
                    {t('compare.best_deal')}
                  </td>
                  {priceData.map((item) => (
                    <td key={item!.product.id} className="p-3 text-center">
                      {item!.best && (
                        <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                          {formatPrice(item!.best.price)}
                        </span>
                      )}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td />}
                </tr>
                {/* MRP Row */}
                <tr>
                  <td className="p-3 text-sm text-surface-500">{t('product.mrp')}</td>
                  {priceData.map((item) => (
                    <td key={item!.product.id} className="p-3 text-center text-sm text-surface-400 line-through">
                      {item!.best ? formatPrice(item!.best.mrp) : '—'}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td />}
                </tr>
                {/* Savings Row */}
                <tr className="bg-surface-50/50 dark:bg-surface-800/50">
                  <td className="p-3 text-sm text-surface-500">Savings</td>
                  {priceData.map((item) => {
                    const disc = item!.best ? calcDiscount(item!.best.mrp, item!.best.price) : 0;
                    return (
                      <td key={item!.product.id} className="p-3 text-center">
                        {disc > 0 && (
                          <Badge variant="success">{disc}% OFF</Badge>
                        )}
                      </td>
                    );
                  })}
                  {compareProducts.length < 4 && <td />}
                </tr>
                {/* Category */}
                <tr>
                  <td className="p-3 text-sm text-surface-500">Category</td>
                  {priceData.map((item) => {
                    const cat = mockCategories.find((c) => c.id === item!.product.category_id);
                    return (
                      <td key={item!.product.id} className="p-3 text-center text-sm text-surface-600 dark:text-surface-400">
                        {cat?.icon} {isKannada ? cat?.name_kn : cat?.name}
                      </td>
                    );
                  })}
                  {compareProducts.length < 4 && <td />}
                </tr>
                {/* Quantity */}
                <tr className="bg-surface-50/50 dark:bg-surface-800/50">
                  <td className="p-3 text-sm text-surface-500">Quantity</td>
                  {priceData.map((item) => (
                    <td key={item!.product.id} className="p-3 text-center text-sm text-surface-600 dark:text-surface-400">
                      {item!.product.base_quantity} {item!.product.unit}
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td />}
                </tr>
                {/* Available At */}
                <tr>
                  <td className="p-3 text-sm text-surface-500">Available at</td>
                  {priceData.map((item) => (
                    <td key={item!.product.id} className="p-3 text-center text-sm text-surface-600 dark:text-surface-400">
                      {item!.prices.length} stores
                    </td>
                  ))}
                  {compareProducts.length < 4 && <td />}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
