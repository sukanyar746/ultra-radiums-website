import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X, Grid3X3, List, ChevronDown } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '@/components/shared/ProductCard';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { mockProducts, mockCategories, mockStorePrices, getBestPrice, searchProducts } from '@/lib/mockData';
import { cn } from '@/lib/utils';

export default function SearchPage() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isKannada = i18n.language === 'kn';

  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';

  const [query, setQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('price_asc');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const results = useMemo(() => {
    let products = searchProducts(query, selectedCategory || null);

    // Sort
    switch (sortBy) {
      case 'price_asc':
        products = [...products].sort((a, b) => {
          const pa = getBestPrice(a.id)?.price ?? Infinity;
          const pb = getBestPrice(b.id)?.price ?? Infinity;
          return pa - pb;
        });
        break;
      case 'price_desc':
        products = [...products].sort((a, b) => {
          const pa = getBestPrice(a.id)?.price ?? 0;
          const pb = getBestPrice(b.id)?.price ?? 0;
          return pb - pa;
        });
        break;
      case 'name':
        products = [...products].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return products;
  }, [query, selectedCategory, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: query, ...(selectedCategory ? { category: selectedCategory } : {}) });
  };

  return (
    <>
      <Helmet>
        <title>{query ? `${query} - Search` : 'Search Products'} | PriceKart Karnataka</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('home.search_placeholder')}
            icon={<Search className="w-5 h-5 text-surface-400" />}
            className="shadow-soft"
          />
        </form>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <p className="text-sm text-surface-500 dark:text-surface-400">
              {t('search.results', { count: results.length })}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm px-3 py-2 border border-surface-200 dark:border-surface-700 rounded-xl bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300 focus:outline-none focus:border-primary-500"
            >
              <option value="price_asc">{t('search.price_low')}</option>
              <option value="price_desc">{t('search.price_high')}</option>
              <option value="name">{t('search.name_az')}</option>
              <option value="popularity">{t('search.popularity')}</option>
            </select>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-xl border transition-colors',
                showFilters
                  ? 'bg-primary-50 border-primary-200 text-primary-600 dark:bg-primary-900/20 dark:border-primary-800 dark:text-primary-400'
                  : 'bg-white dark:bg-surface-800 border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-300'
              )}
            >
              <SlidersHorizontal className="w-4 h-4" />
              {t('search.filters')}
            </button>

            {/* View Mode */}
            <div className="hidden sm:flex items-center rounded-xl border border-surface-200 dark:border-surface-700 overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'grid' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-white dark:bg-surface-800 text-surface-400'
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'list' ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400' : 'bg-white dark:bg-surface-800 text-surface-400'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:block w-64 flex-shrink-0"
            >
              <div className="bg-white dark:bg-surface-800 rounded-2xl p-5 shadow-soft sticky top-28 space-y-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-surface-800 dark:text-white">
                    {t('search.filters')}
                  </h4>
                  <button
                    onClick={() => {
                      setSelectedCategory('');
                      setQuery('');
                    }}
                    className="text-xs text-primary-600 dark:text-primary-400 font-medium"
                  >
                    {t('search.clear_filters')}
                  </button>
                </div>

                {/* Category Filter */}
                <div>
                  <h5 className="text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    {t('search.category')}
                  </h5>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory('')}
                      className={cn(
                        'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors',
                        !selectedCategory
                          ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                          : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                      )}
                    >
                      {t('common.all')}
                    </button>
                    {mockCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={cn(
                          'w-full text-left px-3 py-2 text-sm rounded-lg transition-colors flex items-center gap-2',
                          selectedCategory === cat.id
                            ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                            : 'text-surface-600 dark:text-surface-400 hover:bg-surface-50 dark:hover:bg-surface-700'
                        )}
                      >
                        <span>{cat.icon}</span>
                        {isKannada ? cat.name_kn : cat.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}

          {/* Results Grid */}
          <div className="flex-1">
            {/* Mobile Category Pills */}
            <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar md:hidden -mx-4 px-4">
              <button
                onClick={() => setSelectedCategory('')}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors',
                  !selectedCategory
                    ? 'bg-primary-600 text-white'
                    : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300'
                )}
              >
                {t('common.all')}
              </button>
              {mockCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    'flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full transition-colors flex items-center gap-1',
                    selectedCategory === cat.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300'
                  )}
                >
                  {cat.icon} {isKannada ? cat.name_kn : cat.name}
                </button>
              ))}
            </div>

            {results.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg font-semibold text-surface-700 dark:text-surface-300 mb-2">
                  {t('search.no_results', { query })}
                </p>
                <p className="text-sm text-surface-400">
                  Try searching with different keywords
                </p>
              </motion.div>
            ) : (
              <div
                className={cn(
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4'
                    : 'space-y-3'
                )}
              >
                {results.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
