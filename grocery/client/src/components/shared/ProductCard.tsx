import { motion } from 'framer-motion';
import { ShoppingCart, TrendingDown, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Badge from '@/components/ui/Badge';
import { formatPrice, calcDiscount } from '@/lib/utils';
import { getBestPrice } from '@/lib/mockData';
import { useAppStore } from '@/stores/appStore';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showCompare?: boolean;
}

export default function ProductCard({ product, showCompare = true }: ProductCardProps) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { addToCompare, compareProducts } = useAppStore();
  const bestPrice = getBestPrice(product.id);
  const discount = bestPrice ? calcDiscount(bestPrice.mrp, bestPrice.price) : 0;
  const isKannada = i18n.language === 'kn';
  const isInCompare = compareProducts.includes(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white dark:bg-surface-800 rounded-2xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 cursor-pointer relative"
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10 max-w-[calc(100%-48px)]">
          <Badge variant="danger" size="sm">
            {discount}% OFF
          </Badge>
        </div>
      )}

      {/* Compare Button */}
      {showCompare && !isInCompare && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCompare(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 dark:bg-surface-700/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white dark:hover:bg-surface-700"
          title="Add to compare"
        >
          <Plus className="w-4 h-4 text-surface-600 dark:text-surface-300" />
        </button>
      )}

      {/* Image */}
      <div className="relative h-40 sm:h-44 bg-surface-50 dark:bg-surface-900 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-3.5">
        {/* Brand */}
        <p className="text-xs text-surface-400 dark:text-surface-500 font-medium mb-0.5">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="text-sm font-semibold text-surface-800 dark:text-surface-100 leading-tight line-clamp-2 mb-1.5">
          {isKannada ? product.name_kn : product.name}
        </h3>

        {/* Quantity */}
        <p className="text-xs text-surface-400 dark:text-surface-500 mb-2">
          {product.base_quantity} {product.unit}
        </p>

        {/* Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {bestPrice ? (
              <>
                <span className="text-lg font-bold text-surface-900 dark:text-white">
                  {formatPrice(bestPrice.price)}
                </span>
                {discount > 0 && (
                  <span className="text-xs text-surface-400 line-through">
                    {formatPrice(bestPrice.mrp)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm text-surface-400">Price unavailable</span>
            )}
          </div>

          {bestPrice && bestPrice.price < bestPrice.mrp && (
            <div className="flex items-center gap-0.5 text-primary-600 dark:text-primary-400">
              <TrendingDown className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">
                {formatPrice(bestPrice.mrp - bestPrice.price)}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
