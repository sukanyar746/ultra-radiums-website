import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  BarChart3, Users, Package, Store, ShieldCheck, Clock, TrendingUp,
  AlertTriangle, CheckCircle, XCircle, Eye, Search, ChevronDown, ArrowUpRight
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, LineChart, Line
} from 'recharts';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Tabs from '@/components/ui/Tabs';
import { mockProducts, mockStores, mockCategories, mockStorePrices } from '@/lib/mockData';
import { formatPrice, cn } from '@/lib/utils';

// Mock admin data
const mockSubmissions = [
  { id: 's1', userName: 'Ramesh K.', product: 'Tomato', store: 'DMart - Koramangala', price: 26, status: 'pending' as const, time: '2 hours ago' },
  { id: 's2', userName: 'Priya S.', product: 'Onion', store: 'Reliance Fresh', price: 34, status: 'pending' as const, time: '3 hours ago' },
  { id: 's3', userName: 'Vijay M.', product: 'Rice 5kg', store: 'Metro Cash & Carry', price: 350, status: 'verified' as const, time: '5 hours ago' },
  { id: 's4', userName: 'Anitha R.', product: 'Toor Dal', store: 'Mahalakshmi Provisions', price: 125, status: 'verified' as const, time: '6 hours ago' },
  { id: 's5', userName: 'Suresh B.', product: 'Milk 500ml', store: 'Sri Venkateshwara Stores', price: 27, status: 'rejected' as const, time: '1 day ago' },
  { id: 's6', userName: 'Kavitha L.', product: 'Sunflower Oil', store: 'SPAR Hypermarket', price: 140, status: 'pending' as const, time: '1 day ago' },
];

const categoryChartData = [
  { name: 'Vegetables', products: 4, color: '#22c55e' },
  { name: 'Fruits', products: 2, color: '#ef4444' },
  { name: 'Dairy', products: 4, color: '#3b82f6' },
  { name: 'Grains', products: 2, color: '#f59e0b' },
  { name: 'Oil', products: 1, color: '#eab308' },
  { name: 'Spices', products: 1, color: '#dc2626' },
  { name: 'Pulses', products: 1, color: '#a16207' },
  { name: 'Snacks', products: 2, color: '#f97316' },
  { name: 'Beverages', products: 1, color: '#8b5cf6' },
  { name: 'Household', products: 1, color: '#06b6d4' },
];

const priceUpdateTrend = Array.from({ length: 14 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (13 - i));
  return {
    date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
    updates: Math.floor(Math.random() * 40) + 20,
    submissions: Math.floor(Math.random() * 15) + 5,
  };
});

const storeTypeDistribution = [
  { name: 'Supermarket', value: 4, color: '#3b82f6' },
  { name: 'Kirana', value: 2, color: '#22c55e' },
  { name: 'Hypermarket', value: 2, color: '#f59e0b' },
  { name: 'Online', value: 1, color: '#8b5cf6' },
  { name: 'Specialty', value: 1, color: '#ec4899' },
];

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color: string;
}

function StatCard({ icon, label, value, change, trend, color }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-surface-800 rounded-2xl p-5 shadow-soft"
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
        {change && (
          <div className={cn(
            'flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full',
            trend === 'up' && 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20',
            trend === 'down' && 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20',
            trend === 'neutral' && 'text-surface-500 bg-surface-100 dark:bg-surface-700'
          )}>
            {trend === 'up' && <ArrowUpRight className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-surface-900 dark:text-white">{value}</p>
      <p className="text-sm text-surface-500 mt-0.5">{label}</p>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const [submissions, setSubmissions] = useState(mockSubmissions);

  const pendingCount = submissions.filter(s => s.status === 'pending').length;
  const verifiedCount = submissions.filter(s => s.status === 'verified').length;

  const handleVerify = (id: string) => {
    setSubmissions(prev =>
      prev.map(s => s.id === id ? { ...s, status: 'verified' as const } : s)
    );
  };

  const handleReject = (id: string) => {
    setSubmissions(prev =>
      prev.map(s => s.id === id ? { ...s, status: 'rejected' as const } : s)
    );
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | PriceKart Karnataka</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-7 h-7 text-primary-500" />
              Admin Dashboard
            </h1>
            <p className="text-sm text-surface-500 mt-0.5">
              Manage products, stores, and community submissions
            </p>
          </div>
          {pendingCount > 0 && (
            <Badge variant="warning" size="md">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" />
              {pendingCount} pending review{pendingCount > 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
            { id: 'submissions', label: `Submissions (${pendingCount})`, icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
            { id: 'stores', label: 'Stores', icon: <Store className="w-4 h-4" /> },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
          className="mb-6"
        />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={<Users className="w-5 h-5" />}
                label="Total Users"
                value="1,247"
                change="+12%"
                trend="up"
                color="#3b82f6"
              />
              <StatCard
                icon={<Package className="w-5 h-5" />}
                label="Products Tracked"
                value={mockProducts.length}
                change="+3"
                trend="up"
                color="#22c55e"
              />
              <StatCard
                icon={<Store className="w-5 h-5" />}
                label="Active Stores"
                value={mockStores.length}
                change="0"
                trend="neutral"
                color="#f59e0b"
              />
              <StatCard
                icon={<TrendingUp className="w-5 h-5" />}
                label="Price Updates"
                value={mockStorePrices.length}
                change="+8%"
                trend="up"
                color="#8b5cf6"
              />
            </div>

            {/* Charts Row */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Price Updates Trend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-5"
              >
                <h3 className="text-base font-bold text-surface-900 dark:text-white mb-4">
                  Price Updates (14 Days)
                </h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={priceUpdateTrend}>
                      <defs>
                        <linearGradient id="adminGrad1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="adminGrad2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="date" fontSize={10} tick={{ fill: '#94a3b8' }} />
                      <YAxis fontSize={10} tick={{ fill: '#94a3b8' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'var(--color-surface-800, #1e293b)',
                          border: 'none',
                          borderRadius: '12px',
                          color: '#f1f5f9',
                          fontSize: '12px',
                        }}
                      />
                      <Area type="monotone" dataKey="updates" stroke="#10b981" strokeWidth={2} fill="url(#adminGrad1)" name="Auto Updates" />
                      <Area type="monotone" dataKey="submissions" stroke="#8b5cf6" strokeWidth={2} fill="url(#adminGrad2)" name="Community" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Store Type Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-5"
              >
                <h3 className="text-base font-bold text-surface-900 dark:text-white mb-4">
                  Store Distribution
                </h3>
                <div className="h-56 flex items-center">
                  <ResponsiveContainer width="60%" height="100%">
                    <PieChart>
                      <Pie
                        data={storeTypeDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        dataKey="value"
                        stroke="none"
                      >
                        {storeTypeDistribution.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex-1 space-y-2">
                    {storeTypeDistribution.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                        <span className="text-xs text-surface-600 dark:text-surface-400 flex-1">{item.name}</span>
                        <span className="text-xs font-bold text-surface-800 dark:text-surface-200">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Category Product Counts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft p-5"
            >
              <h3 className="text-base font-bold text-surface-900 dark:text-white mb-4">
                Products by Category
              </h3>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" fontSize={10} tick={{ fill: '#94a3b8' }} angle={-30} textAnchor="end" height={60} />
                    <YAxis fontSize={10} tick={{ fill: '#94a3b8' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-surface-800, #1e293b)',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#f1f5f9',
                        fontSize: '12px',
                      }}
                    />
                    <Bar dataKey="products" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === 'submissions' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden"
          >
            <div className="p-5 border-b border-surface-100 dark:border-surface-700 flex items-center justify-between">
              <h3 className="font-bold text-surface-900 dark:text-white">
                Community Price Submissions
              </h3>
              <div className="flex items-center gap-2 text-sm text-surface-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pendingCount} pending</span>
                <span className="text-surface-300">•</span>
                <span className="flex items-center gap-1 text-green-500"><CheckCircle className="w-3.5 h-3.5" /> {verifiedCount} verified</span>
              </div>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-700">
              {submissions.map((sub) => (
                <div key={sub.id} className="flex items-center gap-4 px-5 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                  {/* User Avatar */}
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400 flex-shrink-0">
                    {sub.userName[0]}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">
                      {sub.userName} <span className="font-normal text-surface-400">reported</span>{' '}
                      <span className="text-primary-600 dark:text-primary-400">{sub.product}</span>
                      {' at '}
                      <span className="font-bold">{formatPrice(sub.price)}</span>
                    </p>
                    <p className="text-xs text-surface-400 mt-0.5">
                      {sub.store} · {sub.time}
                    </p>
                  </div>

                  {/* Status / Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {sub.status === 'pending' ? (
                      <>
                        <Button
                          size="sm"
                          variant="primary"
                          icon={<CheckCircle className="w-3.5 h-3.5" />}
                          onClick={() => handleVerify(sub.id)}
                        >
                          Verify
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          icon={<XCircle className="w-3.5 h-3.5" />}
                          onClick={() => handleReject(sub.id)}
                        >
                          {''}
                        </Button>
                      </>
                    ) : (
                      <Badge
                        variant={sub.status === 'verified' ? 'success' : 'danger'}
                        size="sm"
                      >
                        {sub.status === 'verified' ? (
                          <><CheckCircle className="w-3 h-3 mr-1" />Verified</>
                        ) : (
                          <><XCircle className="w-3 h-3 mr-1" />Rejected</>
                        )}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden"
          >
            <div className="p-5 border-b border-surface-100 dark:border-surface-700 flex items-center justify-between">
              <h3 className="font-bold text-surface-900 dark:text-white">
                Product Management ({mockProducts.length} products)
              </h3>
              <Button size="sm" icon={<Package className="w-4 h-4" />}>Add Product</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-surface-50 dark:bg-surface-900/50">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Product</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Category</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-surface-500 uppercase tracking-wider">Brand</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-surface-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-surface-500 uppercase tracking-wider">Stores</th>
                    <th className="px-5 py-3 text-center text-xs font-semibold text-surface-500 uppercase tracking-wider">Popular</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-100 dark:divide-surface-700">
                  {mockProducts.map((product) => {
                    const cat = mockCategories.find(c => c.id === product.category_id);
                    const storeCount = mockStorePrices.filter(sp => sp.product_id === product.id).length;
                    return (
                      <tr key={product.id} className="hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img src={product.image_url} alt={product.name} className="w-9 h-9 rounded-lg object-cover" />
                            <span className="text-sm font-medium text-surface-800 dark:text-surface-100">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-sm text-surface-500">{cat?.icon} {cat?.name}</td>
                        <td className="px-5 py-3 text-sm text-surface-500">{product.brand}</td>
                        <td className="px-5 py-3 text-sm text-surface-500 text-right">{product.base_quantity} {product.unit}</td>
                        <td className="px-5 py-3 text-sm font-semibold text-surface-700 dark:text-surface-300 text-right">{storeCount}</td>
                        <td className="px-5 py-3 text-center">
                          {product.is_popular && <Badge variant="primary" size="sm">Popular</Badge>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Stores Tab */}
        {activeTab === 'stores' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-surface-800 rounded-2xl shadow-soft overflow-hidden"
          >
            <div className="p-5 border-b border-surface-100 dark:border-surface-700 flex items-center justify-between">
              <h3 className="font-bold text-surface-900 dark:text-white">
                Store Management ({mockStores.length} stores)
              </h3>
              <Button size="sm" icon={<Store className="w-4 h-4" />}>Add Store</Button>
            </div>
            <div className="divide-y divide-surface-100 dark:divide-surface-700">
              {mockStores.map((store) => {
                const priceCount = mockStorePrices.filter(sp => sp.store_id === store.id).length;
                return (
                  <div key={store.id} className="flex items-center gap-4 px-5 py-4 hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-sm font-bold text-primary-600 dark:text-primary-400 flex-shrink-0">
                      {store.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-surface-800 dark:text-surface-100">{store.name}</p>
                      <p className="text-xs text-surface-400">{store.area} · {store.type}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 text-sm text-surface-500">
                      <div className="text-right">
                        <p className="font-semibold text-surface-700 dark:text-surface-300">{priceCount}</p>
                        <p className="text-xs">products</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-surface-700 dark:text-surface-300">{store.rating}</p>
                        <p className="text-xs">rating</p>
                      </div>
                    </div>
                    <Badge variant={store.type === 'kirana' ? 'success' : 'primary'} size="sm">
                      {store.type}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
