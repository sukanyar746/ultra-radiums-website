-- ============================================================
-- PriceKart Karnataka — Seed Data
-- Realistic Karnataka grocery data
-- ============================================================

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO categories (id, name, name_kn, slug, icon, sort_order, color) VALUES
  ('cat-01', 'Vegetables', 'ತರಕಾರಿಗಳು', 'vegetables', '🥬', 1, '#22c55e'),
  ('cat-02', 'Fruits', 'ಹಣ್ಣುಗಳು', 'fruits', '🍎', 2, '#ef4444'),
  ('cat-03', 'Dairy & Eggs', 'ಡೈರಿ ಮತ್ತು ಮೊಟ್ಟೆಗಳು', 'dairy-eggs', '🥛', 3, '#3b82f6'),
  ('cat-04', 'Rice & Grains', 'ಅಕ್ಕಿ ಮತ್ತು ಧಾನ್ಯಗಳು', 'rice-grains', '🌾', 4, '#f59e0b'),
  ('cat-05', 'Cooking Oil', 'ಅಡುಗೆ ಎಣ್ಣೆ', 'cooking-oil', '🫗', 5, '#eab308'),
  ('cat-06', 'Spices & Masala', 'ಸಂಬಾರಗಳು', 'spices-masala', '🌶️', 6, '#dc2626'),
  ('cat-07', 'Pulses & Lentils', 'ಬೇಳೆಕಾಳುಗಳು', 'pulses-lentils', '🫘', 7, '#a16207'),
  ('cat-08', 'Snacks', 'ತಿಂಡಿಗಳು', 'snacks', '🍪', 8, '#f97316'),
  ('cat-09', 'Beverages', 'ಪಾನೀಯಗಳು', 'beverages', '☕', 9, '#8b5cf6'),
  ('cat-10', 'Personal Care', 'ವೈಯಕ್ತಿಕ ಆರೈಕೆ', 'personal-care', '🧴', 10, '#ec4899'),
  ('cat-11', 'Household', 'ಗೃಹ ಬಳಕೆ', 'household', '🧹', 11, '#06b6d4'),
  ('cat-12', 'Bakery & Bread', 'ಬೇಕರಿ', 'bakery-bread', '🍞', 12, '#d97706');


-- ============================================================
-- PRODUCTS (20 realistic Karnataka grocery items)
-- ============================================================
INSERT INTO products (id, name, name_kn, brand, category_id, unit, base_quantity, image_url, is_popular) VALUES
  ('prod-01', 'Tomato (Tamatar)', 'ಟೊಮೇಟೊ', 'Local Farm', 'cat-01', 'kg', 1, 'https://images.unsplash.com/photo-1546470427-0d4db3e4d29f?w=400', true),
  ('prod-02', 'Onion (Eerulli)', 'ಈರುಳ್ಳಿ', 'Local Farm', 'cat-01', 'kg', 1, 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400', true),
  ('prod-03', 'Potato (Aaloo Gadde)', 'ಆಲೂಗಡ್ಡೆ', 'Local Farm', 'cat-01', 'kg', 1, 'https://images.unsplash.com/photo-1518977676601-b28d4b4b7b16?w=400', true),
  ('prod-04', 'Nandini Toned Milk', 'ನಂದಿನಿ ಟೋನ್ಡ್ ಹಾಲು', 'Nandini', 'cat-03', 'ml', 500, 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', true),
  ('prod-05', 'Sona Masoori Rice', 'ಸೋನಾ ಮಸೂರಿ ಅಕ್ಕಿ', 'India Gate', 'cat-04', 'kg', 5, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', true),
  ('prod-06', 'Toor Dal', 'ತೊಗರಿ ಬೇಳೆ', 'Tata Sampann', 'cat-07', 'kg', 1, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400', true),
  ('prod-07', 'Sunflower Oil', 'ಸೂರ್ಯಕಾಂತಿ ಎಣ್ಣೆ', 'Fortune', 'cat-05', 'L', 1, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', true),
  ('prod-08', 'MTR Sambar Powder', 'MTR ಸಾಂಬಾರ್ ಪುಡಿ', 'MTR', 'cat-06', 'g', 200, 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400', false),
  ('prod-09', 'Amul Butter', 'ಅಮುಲ್ ಬೆಣ್ಣೆ', 'Amul', 'cat-03', 'g', 500, 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', false),
  ('prod-10', 'Banana (Balehannu)', 'ಬಾಳೆಹಣ್ಣು', 'Local Farm', 'cat-02', 'dozen', 1, 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', true),
  ('prod-11', 'Apple (Sebu)', 'ಸೇಬು', 'Imported', 'cat-02', 'kg', 1, 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', false),
  ('prod-12', 'Curd (Mosaru)', 'ಮೊಸರು', 'Nandini', 'cat-03', 'g', 400, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', true),
  ('prod-13', 'Aashirvaad Atta', 'ಆಶೀರ್ವಾದ್ ಗೋಧಿ ಹಿಟ್ಟು', 'Aashirvaad', 'cat-04', 'kg', 5, 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', true),
  ('prod-14', 'Parle-G Biscuits', 'ಪಾರ್ಲೆ-ಜಿ ಬಿಸ್ಕತ್', 'Parle', 'cat-08', 'g', 800, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', false),
  ('prod-15', 'BRU Instant Coffee', 'BRU ಕಾಫಿ', 'BRU', 'cat-09', 'g', 200, 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', true),
  ('prod-16', 'Surf Excel', 'ಸರ್ಫ್ ಎಕ್ಸೆಲ್', 'HUL', 'cat-11', 'kg', 1, 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400', false),
  ('prod-17', 'Nandini Ghee', 'ನಂದಿನಿ ತುಪ್ಪ', 'Nandini', 'cat-03', 'ml', 500, 'https://images.unsplash.com/photo-1590179068383-b9c69afd1053?w=400', true),
  ('prod-18', 'Green Chilli', 'ಹಸಿ ಮೆಣಸಿನಕಾಯಿ', 'Local Farm', 'cat-01', 'g', 250, 'https://images.unsplash.com/photo-1583119022894-919a68a3d0e3?w=400', false),
  ('prod-19', 'Coconut (Thenginkayi)', 'ತೆಂಗಿನಕಾಯಿ', 'Local Farm', 'cat-01', 'piece', 1, 'https://images.unsplash.com/photo-1580984969071-a8da8c5b4701?w=400', true),
  ('prod-20', 'Maggi 2-Minute Noodles', 'ಮ್ಯಾಗಿ ನೂಡಲ್ಸ್', 'Nestle', 'cat-08', 'g', 560, 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400', false);


-- ============================================================
-- STORES (10 stores across Bengaluru)
-- ============================================================
INSERT INTO stores (id, name, type, address, area, lat, lng, rating, total_ratings, hours) VALUES
  ('store-01', 'Reliance Fresh - Indiranagar',    'reliance',  '100 Feet Road, Indiranagar',        'Indiranagar',    12.9716, 77.6413, 4.2, 340, '7:00 AM - 10:00 PM'),
  ('store-02', 'DMart - Koramangala',              'dmart',     '4th Block, Koramangala',            'Koramangala',    12.9352, 77.6245, 4.5, 890, '9:00 AM - 9:30 PM'),
  ('store-03', 'More Supermarket - HSR Layout',    'more',      'Sector 2, HSR Layout',              'HSR Layout',     12.9116, 77.6388, 4.0, 210, '8:00 AM - 10:00 PM'),
  ('store-04', 'SPAR Hypermarket - Bannerghatta', 'spar',      'Bannerghatta Road',                 'Bannerghatta',   12.8914, 77.5972, 4.3, 520, '9:00 AM - 9:30 PM'),
  ('store-05', 'Sri Venkateshwara Stores',         'kirana',    'KR Market, Chickpete',              'Chickpete',      12.9663, 77.5763, 4.1, 78,  '6:00 AM - 9:00 PM'),
  ('store-06', 'Metro Cash & Carry - Yeshwanthpur','metro',     'Tumkur Road, Yeshwanthpur',         'Yeshwanthpur',   13.0206, 77.5358, 4.4, 310, '6:00 AM - 9:00 PM'),
  ('store-07', 'Namdhari Fresh - Jayanagar',       'other',     '11th Main, 4th Block, Jayanagar',   'Jayanagar',      12.9253, 77.5838, 4.6, 450, '7:00 AM - 9:30 PM'),
  ('store-08', 'Reliance Smart - Whitefield',      'reliance',  'ITPL Main Road, Whitefield',        'Whitefield',     12.9698, 77.7500, 4.0, 190, '8:00 AM - 10:00 PM'),
  ('store-09', 'Mahalakshmi Provisions',           'kirana',    'Gandhi Bazaar, Basavanagudi',       'Basavanagudi',   12.9426, 77.5722, 4.3, 120, '7:00 AM - 8:30 PM'),
  ('store-10', 'BigBasket (Online)',                'bigbasket', 'Online Delivery - Bengaluru',       'Pan-Bengaluru',  12.9716, 77.5946, 4.2, 15000, '24 Hours');


-- ============================================================
-- STORE PRICES (current prices — ~120 rows, 6 stores × 20 products)
-- ============================================================
-- Tomato
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-01', 32,  40, 20, true),
  ('store-02', 'prod-01', 28,  40, 30, true),
  ('store-03', 'prod-01', 35,  40, 12, true),
  ('store-04', 'prod-01', 30,  40, 25, true),
  ('store-05', 'prod-01', 25,  40, 37, true),
  ('store-06', 'prod-01', 27,  40, 32, true),
  ('store-07', 'prod-01', 38,  45, 15, true),
  ('store-10', 'prod-01', 34,  42, 19, true);

-- Onion
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-02', 38,  45, 15, true),
  ('store-02', 'prod-02', 35,  45, 22, true),
  ('store-03', 'prod-02', 40,  45, 11, true),
  ('store-05', 'prod-02', 30,  45, 33, true),
  ('store-06', 'prod-02', 33,  45, 26, true),
  ('store-10', 'prod-02', 36,  45, 20, true);

-- Potato
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-03', 28,  35, 20, true),
  ('store-02', 'prod-03', 25,  35, 28, true),
  ('store-03', 'prod-03', 30,  35, 14, true),
  ('store-05', 'prod-03', 22,  35, 37, true),
  ('store-10', 'prod-03', 27,  35, 22, true);

-- Nandini Milk
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-04', 25,  27, 7, true),
  ('store-02', 'prod-04', 24,  27, 11, true),
  ('store-03', 'prod-04', 25,  27, 7, true),
  ('store-05', 'prod-04', 27,  27, 0, true),
  ('store-09', 'prod-04', 26,  27, 3, true),
  ('store-10', 'prod-04', 25,  27, 7, true);

-- Sona Masoori Rice 5kg
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-05', 385, 450, 14, true),
  ('store-02', 'prod-05', 365, 450, 18, true),
  ('store-04', 'prod-05', 390, 450, 13, true),
  ('store-06', 'prod-05', 355, 450, 21, true),
  ('store-10', 'prod-05', 375, 450, 16, true);

-- Toor Dal
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-06', 145, 165, 12, true),
  ('store-02', 'prod-06', 135, 165, 18, true),
  ('store-05', 'prod-06', 130, 165, 21, true),
  ('store-06', 'prod-06', 128, 165, 22, true),
  ('store-10', 'prod-06', 139, 165, 15, true);

-- Sunflower Oil
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-07', 145, 175, 17, true),
  ('store-02', 'prod-07', 138, 175, 21, true),
  ('store-04', 'prod-07', 142, 175, 18, true),
  ('store-06', 'prod-07', 135, 175, 22, true),
  ('store-10', 'prod-07', 140, 175, 20, true);

-- MTR Sambar Powder
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-08', 72,  85, 15, true),
  ('store-02', 'prod-08', 68,  85, 20, true),
  ('store-05', 'prod-08', 65,  85, 23, true),
  ('store-09', 'prod-08', 70,  85, 17, true);

-- Amul Butter
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-09', 275, 295, 6, true),
  ('store-02', 'prod-09', 265, 295, 10, true),
  ('store-03', 'prod-09', 270, 295, 8, true),
  ('store-10', 'prod-09', 268, 295, 9, true);

-- Banana
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-10', 45,  60, 25, true),
  ('store-02', 'prod-10', 40,  60, 33, true),
  ('store-05', 'prod-10', 35,  60, 41, true),
  ('store-07', 'prod-10', 50,  60, 16, true),
  ('store-10', 'prod-10', 42,  60, 30, true);

-- Apple
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-11', 180, 220, 18, true),
  ('store-04', 'prod-11', 170, 220, 22, true),
  ('store-07', 'prod-11', 195, 220, 11, true),
  ('store-10', 'prod-11', 175, 220, 20, true);

-- Curd
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-12', 28,  32, 12, true),
  ('store-02', 'prod-12', 26,  32, 18, true),
  ('store-05', 'prod-12', 30,  32, 6, true),
  ('store-09', 'prod-12', 28,  32, 12, true),
  ('store-10', 'prod-12', 27,  32, 15, true);

-- Aashirvaad Atta
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-13', 295, 340, 13, true),
  ('store-02', 'prod-13', 280, 340, 17, true),
  ('store-04', 'prod-13', 290, 340, 14, true),
  ('store-06', 'prod-13', 275, 340, 19, true),
  ('store-10', 'prod-13', 285, 340, 16, true);

-- Parle-G
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-14', 85,  100, 15, true),
  ('store-02', 'prod-14', 78,  100, 22, true),
  ('store-05', 'prod-14', 82,  100, 18, true),
  ('store-10', 'prod-14', 80,  100, 20, true);

-- BRU Coffee
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-15', 285, 340, 16, true),
  ('store-02', 'prod-15', 270, 340, 20, true),
  ('store-04', 'prod-15', 278, 340, 18, true),
  ('store-10', 'prod-15', 275, 340, 19, true);

-- Surf Excel
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-16', 220, 265, 16, true),
  ('store-02', 'prod-16', 205, 265, 22, true),
  ('store-04', 'prod-16', 215, 265, 18, true),
  ('store-10', 'prod-16', 210, 265, 20, true);

-- Nandini Ghee
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-17', 295, 340, 13, true),
  ('store-02', 'prod-17', 280, 340, 17, true),
  ('store-05', 'prod-17', 275, 340, 19, true),
  ('store-09', 'prod-17', 285, 340, 16, true),
  ('store-10', 'prod-17', 282, 340, 17, true);

-- Green Chilli
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-18', 18,  25, 28, true),
  ('store-02', 'prod-18', 15,  25, 40, true),
  ('store-05', 'prod-18', 12,  25, 52, true),
  ('store-10', 'prod-18', 16,  25, 36, true);

-- Coconut
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-19', 30,  40, 25, true),
  ('store-02', 'prod-19', 28,  40, 30, true),
  ('store-05', 'prod-19', 22,  40, 45, true),
  ('store-09', 'prod-19', 25,  40, 37, true),
  ('store-10', 'prod-19', 32,  40, 20, true);

-- Maggi Noodles
INSERT INTO store_prices (store_id, product_id, price, mrp, discount_pct, in_stock) VALUES
  ('store-01', 'prod-20', 105, 120, 12, true),
  ('store-02', 'prod-20', 98,  120, 18, true),
  ('store-05', 'prod-20', 100, 120, 16, true),
  ('store-10', 'prod-20', 99,  120, 17, true);


-- ============================================================
-- OFFERS
-- ============================================================
INSERT INTO offers (store_id, title, title_kn, description, discount_type, discount_value, min_purchase, valid_until, coupon_code, is_featured) VALUES
  ('store-02', 'DMart Mega Saver', 'ಡಿಮಾರ್ಟ್ ಮೆಗಾ ಸೇವರ್', 'Flat 15% off on all groceries', 'percentage', 15, 500, CURRENT_DATE + INTERVAL '15 days', 'DMART15', true),
  ('store-01', 'Fresh Friday Sale', 'ಫ್ರೆಶ್ ಫ್ರೈಡೇ ಸೇಲ್', 'Get 20% off on fresh vegetables & fruits every Friday', 'percentage', 20, NULL, CURRENT_DATE + INTERVAL '30 days', 'FRESHFRI', true),
  ('store-04', 'SPAR Weekend Basket', 'SPAR ವಾರಾಂತ್ಯ ಬಾಸ್ಕೆಟ್', 'Buy groceries worth ₹1000, get ₹150 off', 'flat', 150, 1000, CURRENT_DATE + INTERVAL '10 days', 'SPARWEEK', true),
  ('store-06', 'Metro Bulk Deal', 'ಮೆಟ್ರೋ ಬಲ್ಕ್ ಡೀಲ್', 'Buy 2 get 1 free on all pulses', 'bogo', 33, NULL, CURRENT_DATE + INTERVAL '7 days', NULL, false),
  ('store-10', 'BigBasket First Order', 'ಬಿಗ್‌ಬಾಸ್ಕೆಟ್ ಮೊದಲ ಆರ್ಡರ್', '25% off on your first order', 'percentage', 25, 300, CURRENT_DATE + INTERVAL '60 days', 'BBFIRST25', true),
  ('store-01', 'Nandini Dairy Fest', 'ನಂದಿನಿ ಡೈರಿ ಫೆಸ್ಟ್', 'Flat ₹50 off on Nandini dairy products', 'flat', 50, 200, CURRENT_DATE + INTERVAL '20 days', 'NANDINI50', false),
  ('store-02', 'Oil & Ghee Super Saver', 'ಎಣ್ಣೆ ಮತ್ತು ತುಪ್ಪ ಸೂಪರ್ ಸೇವರ್', 'Up to 25% off on cooking oil & ghee', 'percentage', 25, NULL, CURRENT_DATE + INTERVAL '12 days', 'OILSAVE', false),
  ('store-08', 'Reliance Smart Combo', 'ರಿಲಯನ್ಸ್ ಸ್ಮಾರ್ಟ್ ಕಾಂಬೊ', 'Rice + Dal + Oil combo at ₹599', 'combo', 599, NULL, CURRENT_DATE + INTERVAL '5 days', 'COMBO599', true);
