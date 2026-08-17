import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trophy, Send, Medal, Star, Camera, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { mockStores, mockProducts } from '@/lib/mockData';
import { cn } from '@/lib/utils';

// Mock community data
const mockLeaderboard = [
  { rank: 1, name: 'Ramesh K.', points: 2450, level: 'platinum' as const, submissions: 89 },
  { rank: 2, name: 'Priya S.', points: 1890, level: 'gold' as const, submissions: 67 },
  { rank: 3, name: 'Vijay M.', points: 1540, level: 'gold' as const, submissions: 52 },
  { rank: 4, name: 'Anitha R.', points: 980, level: 'silver' as const, submissions: 35 },
  { rank: 5, name: 'Suresh B.', points: 720, level: 'silver' as const, submissions: 28 },
];

const levelColors = {
  bronze: 'text-amber-700 bg-amber-100 dark:text-amber-300 dark:bg-amber-900/30',
  silver: 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-800',
  gold: 'text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30',
  platinum: 'text-purple-600 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/30',
};

export default function CommunityPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [storeId, setStoreId] = useState('');
  const [productId, setProductId] = useState('');
  const [price, setPrice] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeId || !productId || !price) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <Helmet>
        <title>Community Prices | PriceKart Karnataka</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-6 h-6 text-accent-500" />
            <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">
              {t('community.title')}
            </h1>
          </div>
          <p className="text-sm text-surface-500">{t('community.subtitle')}</p>
        </div>

        <Tabs
          tabs={[
            { id: 'leaderboard', label: t('community.leaderboard'), icon: <Trophy className="w-4 h-4" /> },
            { id: 'submit', label: t('community.submit_price'), icon: <Send className="w-4 h-4" /> },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
          className="mb-6"
        />

        {activeTab === 'leaderboard' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden"
          >
            {/* Top 3 Podium */}
            <div className="p-6 gradient-hero">
              <div className="flex items-end justify-center gap-4">
                {[mockLeaderboard[1], mockLeaderboard[0], mockLeaderboard[2]].map((user, i) => (
                  <div key={user.rank} className={cn('text-center', i === 1 ? 'order-2' : i === 0 ? 'order-1' : 'order-3')}>
                    <div className={cn(
                      'w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold',
                      i === 1 ? 'bg-accent-400 text-white w-16 h-16' : 'bg-white/20 text-white'
                    )}>
                      {i === 1 ? '👑' : user.name[0]}
                    </div>
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-white/70">{user.points} pts</p>
                    <div className={cn(
                      'mt-2 w-full rounded-t-lg',
                      i === 1 ? 'h-20 bg-accent-400/30' : i === 0 ? 'h-14 bg-white/10' : 'h-10 bg-white/10'
                    )} />
                  </div>
                ))}
              </div>
            </div>

            {/* Full Leaderboard */}
            <div className="divide-y divide-surface-100 dark:divide-surface-700">
              {mockLeaderboard.map((user) => (
                <div key={user.rank} className="flex items-center px-5 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                  <span className="w-8 text-sm font-bold text-surface-400">#{user.rank}</span>
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400">
                    {user.name[0]}
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">{user.name}</p>
                    <p className="text-xs text-surface-400">{user.submissions} verified submissions</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary-600 dark:text-primary-400">{user.points}</p>
                    <Badge variant="neutral" size="sm" className={levelColors[user.level]}>
                      {t(`community.badge.${user.level}`)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-6"
          >
            {submitted ? (
              <div className="text-center py-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-bold text-surface-800 dark:text-white mb-2">Thank you! 🎉</h3>
                <p className="text-sm text-surface-500">
                  Your price submission is pending verification. You'll earn 10 points once verified!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    {t('community.select_store')}
                  </label>
                  <select
                    value={storeId}
                    onChange={(e) => setStoreId(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:border-primary-500 focus:outline-none text-surface-800 dark:text-surface-100"
                    required
                  >
                    <option value="">Select a store...</option>
                    {mockStores.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    {t('community.select_product')}
                  </label>
                  <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full px-4 py-3 text-sm bg-surface-50 dark:bg-surface-700 border border-surface-200 dark:border-surface-600 rounded-xl focus:border-primary-500 focus:outline-none text-surface-800 dark:text-surface-100"
                    required
                  >
                    <option value="">Select a product...</option>
                    {mockProducts.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} ({p.base_quantity} {p.unit})</option>
                    ))}
                  </select>
                </div>

                <Input
                  label={t('community.enter_price')}
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="₹ 0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    {t('community.upload_photo')}
                  </label>
                  <div className="border-2 border-dashed border-surface-200 dark:border-surface-600 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                    <p className="text-sm text-surface-400">Click to upload a photo of the price tag</p>
                  </div>
                </div>

                <Button type="submit" icon={<Send className="w-4 h-4" />} className="w-full" size="lg">
                  {t('community.submit')}
                </Button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}
