import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Search, MapPin, TrendingDown, ArrowRight, Sparkles, Percent,
  ChevronRight, Mic
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ProductCard from '@/components/shared/ProductCard';
import StoreCard from '@/components/shared/StoreCard';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { mockProducts, mockStores, mockOffers, mockStorePrices, getBestPrice } from '@/lib/mockData';
import { mockCategories } from '@/lib/mockData';
import { formatPrice, calcDiscount } from '@/lib/utils';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const isKannada = i18n.language === 'kn';

  const popularProducts = mockProducts.filter((p) => p.is_popular);

  // Products with biggest discounts
  const dealProducts = useMemo(() => {
    return mockProducts
      .map((p) => ({ product: p, best: getBestPrice(p.id) }))
      .filter((x) => x.best && calcDiscount(x.best.mrp, x.best.price) > 10)
      .sort((a, b) => calcDiscount(b.best!.mrp, b.best!.price) - calcDiscount(a.best!.mrp, a.best!.price))
      .slice(0, 8);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <Helmet>
        <title>PriceKart Karnataka - Compare Grocery Prices Near You</title>
        <meta name="description" content="Compare grocery prices from kirana stores, Reliance Smart, DMart, More, Spar, and Metro in Karnataka. Find the cheapest prices for vegetables, fruits, dairy, and daily essentials." />
      </Helmet>

      <div className="min-h-screen">
        {/* ===== Hero Section ===== */}
        <section className="gradient-hero relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-10 -right-20 w-72 h-72 rounded-full bg-white/5 blur-sm" />
          <div className="absolute -bottom-10 -left-16 w-52 h-52 rounded-full bg-accent-400/10 blur-sm" />

          <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-accent-400" />
                <span className="text-xs font-medium text-white/90">
                  {t('app.tagline')}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight text-balance">
                {t('home.hero_title')}
              </h2>

              <p className="text-base md:text-lg text-white/70 mb-8 max-w-xl mx-auto">
                {t('home.hero_subtitle')}
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2.5 max-w-lg mx-auto items-stretch">
                <div className="flex-1">
                  <Input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('home.search_placeholder')}
                    icon={<Search className="w-5 h-5 text-surface-400" />}
                    className="rounded-2xl border-none shadow-elevated py-4 text-sm md:text-base"
                  />
                </div>
                <Button type="submit" variant="accent" size="md" className="rounded-2xl flex-shrink-0 px-6">
                  {t('nav.search')}
                </Button>
              </form>

              {/* Quick Links */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                {['Tomato', 'Onion', 'Milk', 'Rice', 'Dal'].map((item) => (
                  <button
                    key={item}
                    onClick={() => navigate(`/search?q=${item}`)}
                    className="px-3 py-1 text-xs font-medium text-white/80 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4">
          {/* ===== Categories Grid ===== */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="py-8 md:py-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-white">
                {t('home.categories')}
              </h3>
            </div>

            <div className="grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
              {mockCategories.map((cat) => (
                <motion.button
                  key={cat.id}
                  variants={itemVariants}
                  whileHover={{ y: -4, scale: 1.05 }}
                  onClick={() => navigate(`/search?category=${cat.id}`)}
                  className="category-card flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl bg-white dark:bg-surface-800 shadow-soft"
                >
                  <div
                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl md:text-3xl"
                    style={{ backgroundColor: cat.color + '18' }}
                  >
                    {cat.icon}
                  </div>
                  <span className="text-[11px] md:text-xs font-semibold text-surface-700 dark:text-surface-300 text-center leading-tight">
                    {isKannada ? cat.name_kn : cat.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* ===== Today's Best Deals ===== */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="pb-8 md:pb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-accent-100 dark:bg-accent-900/30">
                  <Percent className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-white">
                  {t('home.todays_deals')}
                </h3>
              </div>
              <button
                onClick={() => navigate('/offers')}
                className="flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                {t('home.view_all')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Featured Offers */}
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
              {mockOffers
                .filter((o) => o.is_featured)
                .map((offer, i) => (
                  <motion.div
                    key={offer.id}
                    variants={itemVariants}
                    className="flex-shrink-0 w-[300px] md:w-[340px] rounded-2xl overflow-hidden shadow-soft"
                    style={{
                      background: `linear-gradient(135deg, ${
                        ['#059669', '#0066b2', '#dc2626', '#7c3aed'][i % 4]
                      } 0%, ${
                        ['#047857', '#004c8c', '#b91c1c', '#6d28d9'][i % 4]
                      } 100%)`,
                    }}
                  >
                    <div className="p-5 text-white">
                      <Badge variant="accent" size="sm" className="mb-3">
                        {offer.discount_type === 'percentage'
                          ? `${offer.discount_value}% OFF`
                          : offer.discount_type === 'flat'
                          ? `₹${offer.discount_value} OFF`
                          : 'BOGO'}
                      </Badge>
                      <h4 className="text-lg font-bold mb-1 leading-tight">
                        {isKannada ? offer.title_kn || offer.title : offer.title}
                      </h4>
                      <p className="text-sm text-white/70 mb-3 line-clamp-2">
                        {isKannada ? offer.description_kn || offer.description : offer.description}
                      </p>
                      {offer.coupon_code && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg">
                          <span className="text-xs font-mono font-bold tracking-wider">
                            {offer.coupon_code}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.section>

          {/* ===== Price Drops ===== */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="pb-8 md:pb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-100 dark:bg-red-900/30">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-white">
                  {t('home.price_drops')}
                </h3>
              </div>
              <button
                onClick={() => navigate('/search?sort=price_asc')}
                className="flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                {t('home.view_all')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {dealProducts.slice(0, 4).map(({ product }) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ===== Popular Products ===== */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="pb-8 md:pb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-white">
                {t('home.popular')}
              </h3>
              <button
                onClick={() => navigate('/search')}
                className="flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                {t('home.view_all')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {popularProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ===== Nearby Stores ===== */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="pb-12 md:pb-20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                  <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-surface-900 dark:text-white">
                  {t('home.nearby_stores')}
                </h3>
              </div>
              <button
                onClick={() => navigate('/stores')}
                className="flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline"
              >
                {t('home.view_all')}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mockStores.slice(0, 6).map((store) => (
                <motion.div key={store.id} variants={itemVariants}>
                  <StoreCard store={{ ...store, distance: Math.round(Math.random() * 80) / 10 + 0.5 }} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
