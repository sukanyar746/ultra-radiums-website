import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Plus, Trash2, Check, ShoppingCart, Sparkles, Share2, X, ChevronRight
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockProducts, getBestPrice } from '@/lib/mockData';
import { formatPrice, cn, uid } from '@/lib/utils';

interface ListItem {
  id: string;
  product_id: string;
  quantity: number;
  checked: boolean;
}

interface SList {
  id: string;
  name: string;
  items: ListItem[];
}

export default function ShoppingListPage() {
  const { t } = useTranslation();
  const [lists, setLists] = useState<SList[]>([
    {
      id: 'list-1',
      name: 'Weekly Groceries',
      items: [
        { id: uid(), product_id: 'prod-1', quantity: 2, checked: false },
        { id: uid(), product_id: 'prod-2', quantity: 1, checked: true },
        { id: uid(), product_id: 'prod-11', quantity: 2, checked: false },
        { id: uid(), product_id: 'prod-16', quantity: 1, checked: false },
        { id: uid(), product_id: 'prod-17', quantity: 1, checked: false },
      ],
    },
  ]);
  const [activeListId, setActiveListId] = useState('list-1');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newListName, setNewListName] = useState('');

  const activeList = lists.find((l) => l.id === activeListId);

  const toggleItem = (itemId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              items: list.items.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
              ),
            }
          : list
      )
    );
  };

  const removeItem = (itemId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? { ...list, items: list.items.filter((item) => item.id !== itemId) }
          : list
      )
    );
  };

  const addProduct = (productId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === activeListId
          ? { ...list, items: [...list.items, { id: uid(), product_id: productId, quantity: 1, checked: false }] }
          : list
      )
    );
    setShowAddProduct(false);
  };

  const createList = () => {
    if (!newListName.trim()) return;
    const newList: SList = { id: uid(), name: newListName, items: [] };
    setLists((prev) => [...prev, newList]);
    setActiveListId(newList.id);
    setNewListName('');
  };

  const totalEstimate = activeList
    ? activeList.items.reduce((sum, item) => {
        const best = getBestPrice(item.product_id);
        return sum + (best ? best.price * item.quantity : 0);
      }, 0)
    : 0;

  const checkedCount = activeList ? activeList.items.filter((i) => i.checked).length : 0;

  return (
    <>
      <Helmet>
        <title>Shopping Lists | PriceKart Karnataka</title>
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">
            {t('list.title')}
          </h1>
          <Button
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              const name = prompt('List name:');
              if (name) {
                setNewListName(name);
                createList();
              }
            }}
          >
            {t('list.create_new')}
          </Button>
        </div>

        {/* List Selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6 -mx-4 px-4">
          {lists.map((list) => (
            <button
              key={list.id}
              onClick={() => setActiveListId(list.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 text-sm font-medium rounded-xl transition-colors',
                activeListId === list.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-300'
              )}
            >
              {list.name} ({list.items.length})
            </button>
          ))}
        </div>

        {activeList && (
          <div className="space-y-4">
            {/* Summary Card */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl p-5 text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-white/80">{t('list.total_estimate')}</p>
                <Badge variant="accent" size="md">
                  {t('list.items', { count: activeList.items.length })}
                </Badge>
              </div>
              <p className="text-3xl font-bold">{formatPrice(totalEstimate)}</p>
              <p className="text-sm text-white/70 mt-1">
                {t('list.checked', { count: checkedCount })}
              </p>
              <div className="flex gap-2 mt-4">
                <Button variant="accent" size="sm" icon={<Sparkles className="w-4 h-4" />}>
                  {t('list.optimize')}
                </Button>
                <Button variant="secondary" size="sm" icon={<Share2 className="w-4 h-4" />}>
                  {t('list.share')}
                </Button>
              </div>
            </div>

            {/* Items */}
            <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden">
              {activeList.items.length === 0 ? (
                <div className="py-12 text-center">
                  <ShoppingCart className="w-12 h-12 text-surface-300 mx-auto mb-3" />
                  <p className="text-surface-500">{t('list.empty')}</p>
                </div>
              ) : (
                <div className="divide-y divide-surface-100 dark:divide-surface-700">
                  {activeList.items.map((item) => {
                    const product = mockProducts.find((p) => p.id === item.product_id);
                    const best = getBestPrice(item.product_id);
                    if (!product) return null;

                    return (
                      <motion.div
                        key={item.id}
                        layout
                        className={cn(
                          'flex items-center px-4 py-3 gap-3',
                          item.checked && 'opacity-50'
                        )}
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          className={cn(
                            'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0',
                            item.checked
                              ? 'bg-primary-500 border-primary-500 text-white'
                              : 'border-surface-300 dark:border-surface-600'
                          )}
                        >
                          {item.checked && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className={cn(
                            'text-sm font-medium text-surface-800 dark:text-surface-100',
                            item.checked && 'line-through'
                          )}>
                            {product.name}
                          </p>
                          <p className="text-xs text-surface-400">
                            {item.quantity} × {best ? formatPrice(best.price) : '—'}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-surface-800 dark:text-surface-100">
                          {best ? formatPrice(best.price * item.quantity) : '—'}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Add Product Button */}
              <button
                onClick={() => setShowAddProduct(!showAddProduct)}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm text-primary-600 dark:text-primary-400 font-medium hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                {t('list.add_item')}
              </button>

              {showAddProduct && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="border-t border-surface-100 dark:border-surface-700 px-4 py-3 max-h-48 overflow-y-auto"
                >
                  {mockProducts.slice(0, 10).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => addProduct(p.id)}
                      className="w-full flex items-center gap-3 px-2 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 rounded-lg"
                    >
                      <img src={p.image_url} alt={p.name} className="w-8 h-8 rounded object-cover" />
                      <span>{p.name}</span>
                      <ChevronRight className="w-4 h-4 ml-auto text-surface-400" />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
