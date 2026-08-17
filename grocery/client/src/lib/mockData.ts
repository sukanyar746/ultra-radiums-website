import type { Category, Product, Store, StorePrice, Offer, PriceHistory } from '@/types';

/* =========================================================
   MOCK DATA — Karnataka Grocery Market
   Used when Supabase is not configured (development mode)
   ========================================================= */

export const mockCategories: Category[] = [
  { id: 'cat-1', name: 'Vegetables', name_kn: 'ತರಕಾರಿಗಳು', slug: 'vegetables', icon: '🥬', image_url: null, parent_id: null, sort_order: 1, color: '#22c55e' },
  { id: 'cat-2', name: 'Fruits', name_kn: 'ಹಣ್ಣುಗಳು', slug: 'fruits', icon: '🍎', image_url: null, parent_id: null, sort_order: 2, color: '#ef4444' },
  { id: 'cat-3', name: 'Dairy', name_kn: 'ಡೈರಿ ಉತ್ಪನ್ನಗಳು', slug: 'dairy', icon: '🥛', image_url: null, parent_id: null, sort_order: 3, color: '#3b82f6' },
  { id: 'cat-4', name: 'Groceries', name_kn: 'ದಿನಸಿ', slug: 'groceries', icon: '🛒', image_url: null, parent_id: null, sort_order: 4, color: '#f59e0b' },
  { id: 'cat-5', name: 'Household', name_kn: 'ಗೃಹ ಬಳಕೆ', slug: 'household', icon: '🏠', image_url: null, parent_id: null, sort_order: 5, color: '#8b5cf6' },
  { id: 'cat-6', name: 'Personal Care', name_kn: 'ವೈಯಕ್ತಿಕ ಆರೈಕೆ', slug: 'personal-care', icon: '🧴', image_url: null, parent_id: null, sort_order: 6, color: '#ec4899' },
  { id: 'cat-7', name: 'Snacks', name_kn: 'ತಿಂಡಿಗಳು', slug: 'snacks', icon: '🍪', image_url: null, parent_id: null, sort_order: 7, color: '#f97316' },
  { id: 'cat-8', name: 'Beverages', name_kn: 'ಪಾನೀಯಗಳು', slug: 'beverages', icon: '🥤', image_url: null, parent_id: null, sort_order: 8, color: '#06b6d4' },
];

export const mockProducts: Product[] = [
  // Vegetables
  { id: 'prod-1', name: 'Tomato', name_kn: 'ಟೊಮೆಟೊ', brand: 'Fresh', category_id: 'cat-1', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=300&h=300&fit=crop', barcode: null, description: 'Fresh red tomatoes from local farms', description_kn: 'ಸ್ಥಳೀಯ ಕೃಷಿಯಿಂದ ತಾಜಾ ಕೆಂಪು ಟೊಮೆಟೊ', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-2', name: 'Onion', name_kn: 'ಈರುಳ್ಳಿ', brand: 'Fresh', category_id: 'cat-1', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&h=300&fit=crop', barcode: null, description: 'Medium sized onions', description_kn: 'ಮಧ್ಯಮ ಗಾತ್ರದ ಈರುಳ್ಳಿ', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-3', name: 'Potato', name_kn: 'ಆಲೂಗಡ್ಡೆ', brand: 'Fresh', category_id: 'cat-1', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1518977676601-b53f82ber0e3?w=300&h=300&fit=crop', barcode: null, description: 'Clean washed potatoes', description_kn: 'ಶುಚಿಗೊಳಿಸಿದ ಆಲೂಗಡ್ಡೆ', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-4', name: 'Green Chilli', name_kn: 'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ', brand: 'Fresh', category_id: 'cat-1', unit: 'kg', base_quantity: 0.25, image_url: 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=300&h=300&fit=crop', barcode: null, description: 'Spicy green chillies', description_kn: 'ಖಾರದ ಹಸಿ ಮೆಣಸಿನಕಾಯಿ', is_popular: false, created_at: '2024-01-01' },
  { id: 'prod-5', name: 'Carrot', name_kn: 'ಗಜ್ಜರಿ', brand: 'Fresh', category_id: 'cat-1', unit: 'kg', base_quantity: 0.5, image_url: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=300&h=300&fit=crop', barcode: null, description: 'Fresh orange carrots', description_kn: 'ತಾಜಾ ಕಿತ್ತಳೆ ಗಜ್ಜರಿ', is_popular: false, created_at: '2024-01-01' },
  { id: 'prod-6', name: 'Capsicum', name_kn: 'ದೊಣ್ಣೆ ಮೆಣಸಿನಕಾಯಿ', brand: 'Fresh', category_id: 'cat-1', unit: 'kg', base_quantity: 0.5, image_url: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=300&h=300&fit=crop', barcode: null, description: 'Green capsicum / bell pepper', description_kn: 'ಹಸಿರು ದೊಣ್ಣೆ ಮೆಣಸಿನಕಾಯಿ', is_popular: false, created_at: '2024-01-01' },

  // Fruits
  { id: 'prod-7', name: 'Banana', name_kn: 'ಬಾಳೆಹಣ್ಣು', brand: 'Fresh', category_id: 'cat-2', unit: 'dozen', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop', barcode: null, description: 'Nendran / Yelakki banana', description_kn: 'ನೇಂದ್ರನ್ / ಏಲಕ್ಕಿ ಬಾಳೆಹಣ್ಣು', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-8', name: 'Apple', name_kn: 'ಸೇಬು', brand: 'Shimla', category_id: 'cat-2', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop', barcode: null, description: 'Shimla apples, fresh and crispy', description_kn: 'ಶಿಮ್ಲಾ ಸೇಬು, ತಾಜಾ ಮತ್ತು ಗರಿಗರಿ', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-9', name: 'Mango (Alphonso)', name_kn: 'ಮಾವಿನಹಣ್ಣು (ಆಲ್ಫೊನ್ಸೊ)', brand: 'Ratnagiri', category_id: 'cat-2', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&h=300&fit=crop', barcode: null, description: 'Premium Alphonso mangoes', description_kn: 'ಪ್ರೀಮಿಯಂ ಆಲ್ಫೊನ್ಸೊ ಮಾವಿನಹಣ್ಣು', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-10', name: 'Grapes (Green)', name_kn: 'ದ್ರಾಕ್ಷಿ (ಹಸಿರು)', brand: 'Nashik', category_id: 'cat-2', unit: 'kg', base_quantity: 0.5, image_url: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=300&h=300&fit=crop', barcode: null, description: 'Seedless green grapes', description_kn: 'ಬೀಜರಹಿತ ಹಸಿರು ದ್ರಾಕ್ಷಿ', is_popular: false, created_at: '2024-01-01' },

  // Dairy
  { id: 'prod-11', name: 'Amul Toned Milk', name_kn: 'ಅಮುಲ್ ಟೋನ್ಡ್ ಹಾಲು', brand: 'Amul', category_id: 'cat-3', unit: 'litre', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop', barcode: '8901262011525', description: 'Amul Toned Milk 1L pack', description_kn: 'ಅಮುಲ್ ಟೋನ್ಡ್ ಹಾಲು 1L ಪ್ಯಾಕ್', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-12', name: 'Nandini Curd', name_kn: 'ನಂದಿನಿ ಮೊಸರು', brand: 'Nandini', category_id: 'cat-3', unit: 'kg', base_quantity: 0.5, image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop', barcode: null, description: 'Nandini fresh curd 500g', description_kn: 'ನಂದಿನಿ ತಾಜಾ ಮೊಸರು 500g', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-13', name: 'Amul Butter', name_kn: 'ಅಮುಲ್ ಬೆಣ್ಣೆ', brand: 'Amul', category_id: 'cat-3', unit: 'gm', base_quantity: 500, image_url: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc0d?w=300&h=300&fit=crop', barcode: '8901262150309', description: 'Amul Pasteurised Butter 500g', description_kn: 'ಅಮುಲ್ ಪಾಶ್ಚರೀಕೃತ ಬೆಣ್ಣೆ 500g', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-14', name: 'Paneer', name_kn: 'ಪನೀರ್', brand: 'Amul', category_id: 'cat-3', unit: 'gm', base_quantity: 200, image_url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop', barcode: null, description: 'Fresh paneer 200g block', description_kn: 'ತಾಜಾ ಪನೀರ್ 200g ಬ್ಲಾಕ್', is_popular: true, created_at: '2024-01-01' },

  // Groceries
  { id: 'prod-15', name: 'Tata Salt', name_kn: 'ಟಾಟಾ ಉಪ್ಪು', brand: 'Tata', category_id: 'cat-4', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1518110925495-5fe2c8bbd7aa?w=300&h=300&fit=crop', barcode: '8901725181031', description: 'Tata Iodised Salt 1kg', description_kn: 'ಟಾಟಾ ಅಯೋಡಿನ್ ಉಪ್ಪು 1kg', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-16', name: 'Toor Dal', name_kn: 'ತೊಗರಿ ಬೇಳೆ', brand: 'Tata Sampann', category_id: 'cat-4', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop', barcode: null, description: 'Toor Dal / Arhar Dal 1kg', description_kn: 'ತೊಗರಿ ಬೇಳೆ 1kg', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-17', name: 'Basmati Rice', name_kn: 'ಬಾಸ್ಮತಿ ಅಕ್ಕಿ', brand: 'India Gate', category_id: 'cat-4', unit: 'kg', base_quantity: 5, image_url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop', barcode: null, description: 'India Gate Basmati Rice 5kg', description_kn: 'ಇಂಡಿಯಾ ಗೇಟ್ ಬಾಸ್ಮತಿ ಅಕ್ಕಿ 5kg', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-18', name: 'Sunflower Oil', name_kn: 'ಸೂರ್ಯಕಾಂತಿ ಎಣ್ಣೆ', brand: 'Fortune', category_id: 'cat-4', unit: 'litre', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop', barcode: null, description: 'Fortune Sunflower Refined Oil 1L', description_kn: 'ಫಾರ್ಚೂನ್ ಸೂರ್ಯಕಾಂತಿ ಶುದ್ಧೀಕರಿಸಿದ ಎಣ್ಣೆ 1L', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-19', name: 'Sugar', name_kn: 'ಸಕ್ಕರೆ', brand: 'Madhur', category_id: 'cat-4', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1550411294-098b1f65c9a7?w=300&h=300&fit=crop', barcode: null, description: 'Madhur Pure Sugar 1kg', description_kn: 'ಮಧುರ ಶುದ್ಧ ಸಕ್ಕರೆ 1kg', is_popular: true, created_at: '2024-01-01' },
  { id: 'prod-20', name: 'Wheat Flour (Atta)', name_kn: 'ಗೋಧಿ ಹಿಟ್ಟು (ಅಟ್ಟ)', brand: 'Aashirvaad', category_id: 'cat-4', unit: 'kg', base_quantity: 5, image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop', barcode: null, description: 'Aashirvaad Whole Wheat Atta 5kg', description_kn: 'ಆಶೀರ್ವಾದ ಪೂರ್ಣ ಗೋಧಿ ಹಿಟ್ಟು 5kg', is_popular: true, created_at: '2024-01-01' },

  // Household
  { id: 'prod-21', name: 'Vim Dishwash Bar', name_kn: 'ವಿಮ್ ಡಿಶ್‌ವಾಶ್ ಬಾರ್', brand: 'Vim', category_id: 'cat-5', unit: 'gm', base_quantity: 500, image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&h=300&fit=crop', barcode: null, description: 'Vim Dishwash Bar 500g', description_kn: 'ವಿಮ್ ಡಿಶ್‌ವಾಶ್ ಬಾರ್ 500g', is_popular: false, created_at: '2024-01-01' },
  { id: 'prod-22', name: 'Surf Excel', name_kn: 'ಸರ್ಫ್ ಎಕ್ಸೆಲ್', brand: 'Surf Excel', category_id: 'cat-5', unit: 'kg', base_quantity: 1, image_url: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=300&h=300&fit=crop', barcode: null, description: 'Surf Excel Easy Wash 1kg', description_kn: 'ಸರ್ಫ್ ಎಕ್ಸೆಲ್ ಈಸಿ ವಾಶ್ 1kg', is_popular: false, created_at: '2024-01-01' },

  // Snacks
  { id: 'prod-23', name: 'Lays Classic Salted', name_kn: 'ಲೇಸ್ ಕ್ಲಾಸಿಕ್ ಸಾಲ್ಟೆಡ್', brand: 'Lays', category_id: 'cat-7', unit: 'gm', base_quantity: 52, image_url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop', barcode: null, description: 'Lays Classic Salted Chips 52g', description_kn: 'ಲೇಸ್ ಕ್ಲಾಸಿಕ್ ಸಾಲ್ಟೆಡ್ ಚಿಪ್ಸ್ 52g', is_popular: false, created_at: '2024-01-01' },
  { id: 'prod-24', name: 'Parle-G Biscuit', name_kn: 'ಪಾರ್ಲೆ-ಜಿ ಬಿಸ್ಕೆಟ್', brand: 'Parle', category_id: 'cat-7', unit: 'gm', base_quantity: 800, image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=300&h=300&fit=crop', barcode: null, description: 'Parle-G Gold 800g Family Pack', description_kn: 'ಪಾರ್ಲೆ-ಜಿ ಗೋಲ್ಡ್ 800g ಫ್ಯಾಮಿಲಿ ಪ್ಯಾಕ್', is_popular: false, created_at: '2024-01-01' },

  // Beverages
  { id: 'prod-25', name: 'Brooke Bond Red Label Tea', name_kn: 'ಬ್ರೂಕ್ ಬಾಂಡ್ ರೆಡ್ ಲೇಬಲ್ ಚಹಾ', brand: 'Brooke Bond', category_id: 'cat-8', unit: 'gm', base_quantity: 500, image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop', barcode: null, description: 'Brooke Bond Red Label Tea 500g', description_kn: 'ಬ್ರೂಕ್ ಬಾಂಡ್ ರೆಡ್ ಲೇಬಲ್ ಚಹಾ 500g', is_popular: true, created_at: '2024-01-01' },
];

export const mockStores: Store[] = [
  { id: 'store-1', name: 'Reliance Smart - Koramangala', type: 'reliance', address: '80 Feet Road, Koramangala', area: 'Koramangala', city: 'Bengaluru', lat: 12.9352, lng: 77.6245, rating: 4.2, total_ratings: 856, image_url: null, logo_url: null, phone: '+91-80-40001234', hours: '8:00 AM - 10:00 PM', is_active: true },
  { id: 'store-2', name: 'DMart - Indiranagar', type: 'dmart', address: '100 Feet Road, Indiranagar', area: 'Indiranagar', city: 'Bengaluru', lat: 12.9784, lng: 77.6408, rating: 4.3, total_ratings: 1245, image_url: null, logo_url: null, phone: '+91-80-40005678', hours: '9:00 AM - 9:30 PM', is_active: true },
  { id: 'store-3', name: 'More Supermarket - HSR Layout', type: 'more', address: 'Sector 2, HSR Layout', area: 'HSR Layout', city: 'Bengaluru', lat: 12.9116, lng: 77.6474, rating: 3.9, total_ratings: 432, image_url: null, logo_url: null, phone: '+91-80-40009012', hours: '8:30 AM - 9:30 PM', is_active: true },
  { id: 'store-4', name: 'Spar Hypermarket - Bannerghatta Road', type: 'spar', address: 'Forum Mall, Bannerghatta Road', area: 'JP Nagar', city: 'Bengaluru', lat: 12.9010, lng: 77.5889, rating: 4.1, total_ratings: 678, image_url: null, logo_url: null, phone: '+91-80-40003456', hours: '10:00 AM - 10:00 PM', is_active: true },
  { id: 'store-5', name: 'Metro Cash & Carry - Yeshwanthpur', type: 'metro', address: 'Tumkur Road, Yeshwanthpur', area: 'Yeshwanthpur', city: 'Bengaluru', lat: 13.0282, lng: 77.5446, rating: 4.0, total_ratings: 345, image_url: null, logo_url: null, phone: '+91-80-40007890', hours: '6:00 AM - 10:00 PM', is_active: true },
  { id: 'store-6', name: 'Lakshmi Kirana Store', type: 'kirana', address: '4th Cross, Jayanagar 4th Block', area: 'Jayanagar', city: 'Bengaluru', lat: 12.9258, lng: 77.5838, rating: 4.5, total_ratings: 189, image_url: null, logo_url: null, phone: '+91-9876543210', hours: '7:00 AM - 9:00 PM', is_active: true },
  { id: 'store-7', name: 'Sri Balaji Provision Store', type: 'kirana', address: '2nd Main, BTM Layout', area: 'BTM Layout', city: 'Bengaluru', lat: 12.9166, lng: 77.6101, rating: 4.3, total_ratings: 156, image_url: null, logo_url: null, phone: '+91-9876543211', hours: '7:30 AM - 9:30 PM', is_active: true },
  { id: 'store-8', name: 'Reliance Smart - Whitefield', type: 'reliance', address: 'ITPL Road, Whitefield', area: 'Whitefield', city: 'Bengaluru', lat: 12.9698, lng: 77.7500, rating: 4.0, total_ratings: 567, image_url: null, logo_url: null, phone: '+91-80-40004321', hours: '8:00 AM - 10:00 PM', is_active: true },
  { id: 'store-9', name: 'DMart - Electronic City', type: 'dmart', address: 'Phase 1, Electronic City', area: 'Electronic City', city: 'Bengaluru', lat: 12.8456, lng: 77.6620, rating: 4.4, total_ratings: 980, image_url: null, logo_url: null, phone: '+91-80-40008765', hours: '9:00 AM - 9:30 PM', is_active: true },
  { id: 'store-10', name: 'KR Market Vendor - Nagaraj', type: 'kirana', address: 'KR Market, Chamarajpet', area: 'Chamarajpet', city: 'Bengaluru', lat: 12.9627, lng: 77.5753, rating: 4.6, total_ratings: 234, image_url: null, logo_url: null, phone: '+91-9876543212', hours: '6:00 AM - 8:00 PM', is_active: true },
];

// Price data: [storeId, productId, price, mrp]
const priceData: [string, string, number, number][] = [
  // Tomato prices across stores
  ['store-1', 'prod-1', 32, 40], ['store-2', 'prod-1', 28, 40], ['store-3', 'prod-1', 35, 40],
  ['store-4', 'prod-1', 30, 40], ['store-5', 'prod-1', 25, 40], ['store-6', 'prod-1', 38, 40],
  ['store-7', 'prod-1', 36, 40], ['store-10', 'prod-1', 22, 40],
  // Onion
  ['store-1', 'prod-2', 28, 35], ['store-2', 'prod-2', 25, 35], ['store-3', 'prod-2', 30, 35],
  ['store-4', 'prod-2', 27, 35], ['store-5', 'prod-2', 22, 35], ['store-6', 'prod-2', 32, 35],
  ['store-10', 'prod-2', 20, 35],
  // Potato
  ['store-1', 'prod-3', 30, 35], ['store-2', 'prod-3', 28, 35], ['store-3', 'prod-3', 32, 35],
  ['store-5', 'prod-3', 26, 35], ['store-6', 'prod-3', 33, 35],
  // Banana
  ['store-1', 'prod-7', 45, 60], ['store-2', 'prod-7', 40, 60], ['store-3', 'prod-7', 50, 60],
  ['store-4', 'prod-7', 42, 60], ['store-6', 'prod-7', 55, 60], ['store-10', 'prod-7', 35, 60],
  // Apple
  ['store-1', 'prod-8', 180, 220], ['store-2', 'prod-8', 165, 220], ['store-4', 'prod-8', 175, 220],
  ['store-5', 'prod-8', 155, 220],
  // Mango
  ['store-1', 'prod-9', 350, 450], ['store-2', 'prod-9', 320, 450], ['store-4', 'prod-9', 380, 450],
  ['store-10', 'prod-9', 280, 450],
  // Milk
  ['store-1', 'prod-11', 56, 58], ['store-2', 'prod-11', 54, 58], ['store-3', 'prod-11', 56, 58],
  ['store-4', 'prod-11', 55, 58], ['store-6', 'prod-11', 58, 58], ['store-7', 'prod-11', 57, 58],
  // Curd
  ['store-1', 'prod-12', 30, 32], ['store-2', 'prod-12', 28, 32], ['store-6', 'prod-12', 32, 32],
  // Butter
  ['store-1', 'prod-13', 270, 295], ['store-2', 'prod-13', 258, 295], ['store-4', 'prod-13', 265, 295],
  ['store-5', 'prod-13', 250, 295],
  // Paneer
  ['store-1', 'prod-14', 90, 100], ['store-2', 'prod-14', 85, 100], ['store-3', 'prod-14', 92, 100],
  ['store-6', 'prod-14', 95, 100],
  // Salt
  ['store-1', 'prod-15', 24, 28], ['store-2', 'prod-15', 22, 28], ['store-3', 'prod-15', 25, 28],
  ['store-5', 'prod-15', 20, 28], ['store-6', 'prod-15', 26, 28],
  // Toor Dal
  ['store-1', 'prod-16', 155, 180], ['store-2', 'prod-16', 142, 180], ['store-3', 'prod-16', 160, 180],
  ['store-5', 'prod-16', 135, 180], ['store-6', 'prod-16', 170, 180],
  // Rice
  ['store-1', 'prod-17', 420, 499], ['store-2', 'prod-17', 395, 499], ['store-5', 'prod-17', 380, 499],
  // Oil
  ['store-1', 'prod-18', 135, 160], ['store-2', 'prod-18', 125, 160], ['store-3', 'prod-18', 140, 160],
  ['store-5', 'prod-18', 118, 160],
  // Sugar
  ['store-1', 'prod-19', 45, 50], ['store-2', 'prod-19', 42, 50], ['store-5', 'prod-19', 40, 50],
  ['store-6', 'prod-19', 48, 50],
  // Atta
  ['store-1', 'prod-20', 275, 320], ['store-2', 'prod-20', 255, 320], ['store-5', 'prod-20', 245, 320],
  // Tea
  ['store-1', 'prod-25', 280, 310], ['store-2', 'prod-25', 265, 310], ['store-3', 'prod-25', 285, 310],
  ['store-5', 'prod-25', 255, 310],
  // Chips
  ['store-1', 'prod-23', 20, 20], ['store-2', 'prod-23', 20, 20], ['store-6', 'prod-23', 20, 20],
  // Biscuit
  ['store-1', 'prod-24', 85, 95], ['store-2', 'prod-24', 80, 95], ['store-5', 'prod-24', 78, 95],
];

export const mockStorePrices: StorePrice[] = priceData.map(([store_id, product_id, price, mrp], i) => ({
  id: `sp-${i + 1}`,
  store_id,
  product_id,
  price,
  mrp,
  discount_pct: Math.round(((mrp - price) / mrp) * 100),
  in_stock: Math.random() > 0.08,
  updated_at: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
}));

// Generate price history for last 30 days
export const mockPriceHistory: PriceHistory[] = [];
const historyProducts = ['prod-1', 'prod-2', 'prod-7', 'prod-11', 'prod-16', 'prod-17'];
const historyStores = ['store-1', 'store-2', 'store-5'];
let histId = 1;
for (const pid of historyProducts) {
  for (const sid of historyStores) {
    const sp = mockStorePrices.find((s) => s.store_id === sid && s.product_id === pid);
    if (!sp) continue;
    const basePrice = sp.price;
    for (let day = 30; day >= 0; day--) {
      const date = new Date();
      date.setDate(date.getDate() - day);
      const variance = (Math.random() - 0.5) * basePrice * 0.2;
      mockPriceHistory.push({
        id: `ph-${histId++}`,
        store_id: sid,
        product_id: pid,
        price: Math.round((basePrice + variance) * 100) / 100,
        recorded_at: date.toISOString(),
      });
    }
  }
}

export const mockOffers: Offer[] = [
  { id: 'off-1', store_id: 'store-2', title: 'Weekly Saver - 20% Off on Fruits', title_kn: 'ವಾರದ ಉಳಿತಾಯ - ಹಣ್ಣುಗಳ ಮೇಲೆ 20% ರಿಯಾಯಿತಿ', description: 'Get 20% off on all fresh fruits this week at DMart', description_kn: 'ಈ ವಾರ DMart ನಲ್ಲಿ ಎಲ್ಲಾ ತಾಜಾ ಹಣ್ಣುಗಳ ಮೇಲೆ 20% ರಿಯಾಯಿತಿ ಪಡೆಯಿರಿ', discount_type: 'percentage', discount_value: 20, min_purchase: 200, valid_from: '2024-12-01', valid_until: '2024-12-31', image_url: null, coupon_code: 'FRUIT20', category_id: 'cat-2', is_featured: true },
  { id: 'off-2', store_id: 'store-1', title: 'Buy 2 Get 1 Free - Dairy', title_kn: '2 ಖರೀದಿಸಿ 1 ಉಚಿತ - ಡೈರಿ', description: 'Buy any 2 dairy products and get 1 free', description_kn: 'ಯಾವುದೇ 2 ಡೈರಿ ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ ಮತ್ತು 1 ಉಚಿತ ಪಡೆಯಿರಿ', discount_type: 'bogo', discount_value: 33, min_purchase: null, valid_from: '2024-12-01', valid_until: '2024-12-15', image_url: null, coupon_code: null, category_id: 'cat-3', is_featured: true },
  { id: 'off-3', store_id: 'store-5', title: '₹100 Off on ₹1000+ Purchase', title_kn: '₹1000+ ಖರೀದಿಯ ಮೇಲೆ ₹100 ರಿಯಾಯಿತಿ', description: 'Flat ₹100 off on orders above ₹1000 at Metro', description_kn: 'Metro ನಲ್ಲಿ ₹1000 ಮೇಲಿನ ಆರ್ಡರ್‌ಗಳ ಮೇಲೆ ₹100 ಫ್ಲಾಟ್ ರಿಯಾಯಿತಿ', discount_type: 'flat', discount_value: 100, min_purchase: 1000, valid_from: '2024-12-01', valid_until: '2024-12-31', image_url: null, coupon_code: 'METRO100', category_id: null, is_featured: true },
  { id: 'off-4', store_id: 'store-4', title: 'Weekend Special - 15% Off on Groceries', title_kn: 'ವಾರಾಂತ್ಯ ವಿಶೇಷ - ದಿನಸಿ ಮೇಲೆ 15% ರಿಯಾಯಿತಿ', description: 'Every weekend, enjoy 15% off on grocery staples', description_kn: 'ಪ್ರತಿ ವಾರಾಂತ್ಯ, ದಿನಸಿ ಮೇಲೆ 15% ರಿಯಾಯಿತಿ ಆನಂದಿಸಿ', discount_type: 'percentage', discount_value: 15, min_purchase: 500, valid_from: '2024-12-01', valid_until: '2025-03-31', image_url: null, coupon_code: 'WKND15', category_id: 'cat-4', is_featured: false },
  { id: 'off-5', store_id: 'store-9', title: 'New Store Launch - Flat 25% Off', title_kn: 'ಹೊಸ ಅಂಗಡಿ ಉದ್ಘಾಟನೆ - ಫ್ಲಾಟ್ 25% ರಿಯಾಯಿತಿ', description: 'Grand opening offer at DMart Electronic City', description_kn: 'DMart ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ ಭವ್ಯ ಉದ್ಘಾಟನೆ ಕೊಡುಗೆ', discount_type: 'percentage', discount_value: 25, min_purchase: null, valid_from: '2024-12-01', valid_until: '2024-12-20', image_url: null, coupon_code: 'NEWDMART', category_id: null, is_featured: true },
];

/**
 * Helper: get best price for a product across all stores
 */
export function getBestPrice(productId: string): StorePrice | undefined {
  return mockStorePrices
    .filter((sp) => sp.product_id === productId && sp.in_stock)
    .sort((a, b) => a.price - b.price)[0];
}

/**
 * Helper: get all prices for a product
 */
export function getPricesForProduct(productId: string): (StorePrice & { store: Store })[] {
  return mockStorePrices
    .filter((sp) => sp.product_id === productId)
    .map((sp) => ({
      ...sp,
      store: mockStores.find((s) => s.id === sp.store_id)!,
    }))
    .filter((sp) => sp.store)
    .sort((a, b) => a.price - b.price);
}

/**
 * Helper: search products
 */
export function searchProducts(query: string, categoryId?: string | null): Product[] {
  let results = mockProducts;
  if (categoryId) {
    results = results.filter((p) => p.category_id === categoryId);
  }
  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.name_kn.includes(q) ||
        p.brand.toLowerCase().includes(q)
    );
  }
  return results;
}
