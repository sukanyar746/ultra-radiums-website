-- ============================================================
-- PriceKart Karnataka — Supabase Migration
-- Full schema with Row Level Security (RLS)
-- ============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL DEFAULT '',
  phone         TEXT,
  avatar_url    TEXT,
  preferred_language TEXT NOT NULL DEFAULT 'en' CHECK (preferred_language IN ('en', 'kn')),
  location_lat  DOUBLE PRECISION,
  location_lng  DOUBLE PRECISION,
  role          TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  reward_points INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    NEW.phone
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- CATEGORIES
-- ============================================================
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  name_kn     TEXT NOT NULL DEFAULT '',
  slug        TEXT NOT NULL UNIQUE,
  icon        TEXT NOT NULL DEFAULT '',
  image_url   TEXT,
  parent_id   UUID REFERENCES categories(id),
  sort_order  INTEGER NOT NULL DEFAULT 0,
  color       TEXT NOT NULL DEFAULT '#6b7280'
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT USING (true);

CREATE POLICY "Only admins can modify categories"
  ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- ============================================================
-- PRODUCTS
-- ============================================================
CREATE TABLE products (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name            TEXT NOT NULL,
  name_kn         TEXT NOT NULL DEFAULT '',
  brand           TEXT NOT NULL DEFAULT '',
  category_id     UUID REFERENCES categories(id) ON DELETE SET NULL,
  unit            TEXT NOT NULL DEFAULT 'kg',
  base_quantity   NUMERIC(10,2) NOT NULL DEFAULT 1,
  image_url       TEXT NOT NULL DEFAULT '',
  barcode         TEXT,
  description     TEXT,
  description_kn  TEXT,
  is_popular      BOOLEAN NOT NULL DEFAULT false,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_name ON products USING gin(to_tsvector('english', name));
CREATE INDEX idx_products_barcode ON products(barcode) WHERE barcode IS NOT NULL;
CREATE INDEX idx_products_popular ON products(is_popular) WHERE is_popular = true;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT USING (true);

CREATE POLICY "Only admins can modify products"
  ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- ============================================================
-- STORES
-- ============================================================
CREATE TYPE store_type AS ENUM (
  'kirana', 'reliance', 'dmart', 'more', 'spar', 'metro', 'bigbasket', 'other'
);

CREATE TABLE stores (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name          TEXT NOT NULL,
  type          store_type NOT NULL DEFAULT 'other',
  address       TEXT NOT NULL DEFAULT '',
  area          TEXT NOT NULL DEFAULT '',
  city          TEXT NOT NULL DEFAULT 'Bengaluru',
  lat           DOUBLE PRECISION NOT NULL,
  lng           DOUBLE PRECISION NOT NULL,
  rating        NUMERIC(2,1) NOT NULL DEFAULT 0,
  total_ratings INTEGER NOT NULL DEFAULT 0,
  image_url     TEXT,
  logo_url      TEXT,
  phone         TEXT,
  hours         TEXT NOT NULL DEFAULT '9:00 AM - 9:00 PM',
  is_active     BOOLEAN NOT NULL DEFAULT true
);

CREATE INDEX idx_stores_type ON stores(type);
CREATE INDEX idx_stores_city ON stores(city);
CREATE INDEX idx_stores_location ON stores(lat, lng);
CREATE INDEX idx_stores_active ON stores(is_active) WHERE is_active = true;

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stores are viewable by everyone"
  ON stores FOR SELECT USING (true);

CREATE POLICY "Only admins can modify stores"
  ON stores FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- ============================================================
-- STORE PRICES (current prices for each product at each store)
-- ============================================================
CREATE TABLE store_prices (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id    UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price       NUMERIC(10,2) NOT NULL,
  mrp         NUMERIC(10,2) NOT NULL,
  discount_pct NUMERIC(5,2) NOT NULL DEFAULT 0,
  in_stock    BOOLEAN NOT NULL DEFAULT true,
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(store_id, product_id)
);

CREATE INDEX idx_store_prices_product ON store_prices(product_id);
CREATE INDEX idx_store_prices_store ON store_prices(store_id);
CREATE INDEX idx_store_prices_price ON store_prices(price);

ALTER TABLE store_prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Store prices are viewable by everyone"
  ON store_prices FOR SELECT USING (true);

CREATE POLICY "Only admins can modify store prices"
  ON store_prices FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

CREATE TRIGGER store_prices_updated_at
  BEFORE UPDATE ON store_prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- PRICE HISTORY (track historical price changes)
-- ============================================================
CREATE TABLE price_history (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id    UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  price       NUMERIC(10,2) NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_price_history_product ON price_history(product_id, recorded_at DESC);
CREATE INDEX idx_price_history_store ON price_history(store_id, product_id);

ALTER TABLE price_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Price history is viewable by everyone"
  ON price_history FOR SELECT USING (true);

-- Auto-record price history when store_prices update
CREATE OR REPLACE FUNCTION record_price_history()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.price IS DISTINCT FROM NEW.price THEN
    INSERT INTO price_history (store_id, product_id, price)
    VALUES (NEW.store_id, NEW.product_id, NEW.price);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_price_change
  AFTER UPDATE ON store_prices
  FOR EACH ROW EXECUTE FUNCTION record_price_history();

-- Also record on insert
CREATE OR REPLACE FUNCTION record_initial_price()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO price_history (store_id, product_id, price)
  VALUES (NEW.store_id, NEW.product_id, NEW.price);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_price_insert
  AFTER INSERT ON store_prices
  FOR EACH ROW EXECUTE FUNCTION record_initial_price();


-- ============================================================
-- OFFERS
-- ============================================================
CREATE TYPE discount_type AS ENUM ('percentage', 'flat', 'bogo', 'combo');

CREATE TABLE offers (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_id        UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  title           TEXT NOT NULL,
  title_kn        TEXT,
  description     TEXT NOT NULL DEFAULT '',
  description_kn  TEXT,
  discount_type   discount_type NOT NULL DEFAULT 'percentage',
  discount_value  NUMERIC(10,2) NOT NULL DEFAULT 0,
  min_purchase    NUMERIC(10,2),
  valid_from      DATE NOT NULL DEFAULT CURRENT_DATE,
  valid_until     DATE NOT NULL,
  image_url       TEXT,
  coupon_code     TEXT,
  category_id     UUID REFERENCES categories(id),
  is_featured     BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX idx_offers_store ON offers(store_id);
CREATE INDEX idx_offers_valid ON offers(valid_until) WHERE valid_until >= CURRENT_DATE;
CREATE INDEX idx_offers_featured ON offers(is_featured) WHERE is_featured = true;

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Offers are viewable by everyone"
  ON offers FOR SELECT USING (true);

CREATE POLICY "Only admins can modify offers"
  ON offers FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );


-- ============================================================
-- SHOPPING LISTS
-- ============================================================
CREATE TABLE shopping_lists (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL DEFAULT 'My List',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_shopping_lists_user ON shopping_lists(user_id);

ALTER TABLE shopping_lists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own lists"
  ON shopping_lists FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own lists"
  ON shopping_lists FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own lists"
  ON shopping_lists FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own lists"
  ON shopping_lists FOR DELETE USING (auth.uid() = user_id);

CREATE TRIGGER shopping_lists_updated_at
  BEFORE UPDATE ON shopping_lists
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- SHOPPING LIST ITEMS
-- ============================================================
CREATE TABLE shopping_list_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id     UUID NOT NULL REFERENCES shopping_lists(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity    INTEGER NOT NULL DEFAULT 1,
  checked     BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(list_id, product_id)
);

CREATE INDEX idx_list_items_list ON shopping_list_items(list_id);

ALTER TABLE shopping_list_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage items in their lists"
  ON shopping_list_items FOR ALL USING (
    EXISTS (
      SELECT 1 FROM shopping_lists
      WHERE shopping_lists.id = shopping_list_items.list_id
        AND shopping_lists.user_id = auth.uid()
    )
  );


-- ============================================================
-- PRICE ALERTS
-- ============================================================
CREATE TABLE price_alerts (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id    UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  target_price  NUMERIC(10,2) NOT NULL,
  alert_type    TEXT NOT NULL DEFAULT 'push' CHECK (alert_type IN ('email', 'sms', 'push')),
  is_active     BOOLEAN NOT NULL DEFAULT true,
  triggered_at  TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_price_alerts_user ON price_alerts(user_id);
CREATE INDEX idx_price_alerts_product ON price_alerts(product_id) WHERE is_active = true;

ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own alerts"
  ON price_alerts FOR ALL USING (auth.uid() = user_id);


-- ============================================================
-- COMMUNITY SUBMISSIONS
-- ============================================================
CREATE TYPE submission_status AS ENUM ('pending', 'verified', 'rejected');

CREATE TABLE community_submissions (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  store_id        UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  submitted_price NUMERIC(10,2) NOT NULL,
  photo_url       TEXT,
  status          submission_status NOT NULL DEFAULT 'pending',
  verified_by     UUID REFERENCES auth.users(id),
  reward_points   INTEGER NOT NULL DEFAULT 0,
  notes           TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_submissions_user ON community_submissions(user_id);
CREATE INDEX idx_submissions_status ON community_submissions(status);
CREATE INDEX idx_submissions_product ON community_submissions(product_id);

ALTER TABLE community_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Submissions are viewable by everyone"
  ON community_submissions FOR SELECT USING (true);

CREATE POLICY "Authenticated users can submit prices"
  ON community_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Only admins/moderators can verify"
  ON community_submissions FOR UPDATE USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'moderator'))
  );

-- Award points when a submission is verified
CREATE OR REPLACE FUNCTION award_submission_points()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'verified' AND OLD.status = 'pending' THEN
    UPDATE profiles
    SET reward_points = reward_points + 10
    WHERE id = NEW.user_id;

    UPDATE community_submissions
    SET reward_points = 10
    WHERE id = NEW.id;

    -- Auto-update the store price
    INSERT INTO store_prices (store_id, product_id, price, mrp)
    VALUES (NEW.store_id, NEW.product_id, NEW.submitted_price, NEW.submitted_price)
    ON CONFLICT (store_id, product_id)
    DO UPDATE SET price = EXCLUDED.price, updated_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_submission_verified
  AFTER UPDATE ON community_submissions
  FOR EACH ROW EXECUTE FUNCTION award_submission_points();


-- ============================================================
-- USER REWARDS (aggregate view)
-- ============================================================
CREATE OR REPLACE VIEW user_rewards AS
SELECT
  p.id AS user_id,
  p.reward_points AS points,
  CASE
    WHEN p.reward_points >= 2000 THEN 'platinum'
    WHEN p.reward_points >= 1000 THEN 'gold'
    WHEN p.reward_points >= 500 THEN 'silver'
    ELSE 'bronze'
  END AS level,
  COUNT(cs.id)::INTEGER AS total_submissions,
  COUNT(cs.id) FILTER (WHERE cs.status = 'verified')::INTEGER AS verified_submissions
FROM profiles p
LEFT JOIN community_submissions cs ON cs.user_id = p.id
GROUP BY p.id, p.reward_points;


-- ============================================================
-- ADMIN STATS (aggregate view)
-- ============================================================
CREATE OR REPLACE VIEW admin_stats AS
SELECT
  (SELECT COUNT(*) FROM profiles)::INTEGER AS total_users,
  (SELECT COUNT(*) FROM products)::INTEGER AS total_products,
  (SELECT COUNT(*) FROM stores WHERE is_active)::INTEGER AS total_stores,
  (SELECT COUNT(*) FROM community_submissions)::INTEGER AS total_submissions,
  (SELECT COUNT(*) FROM community_submissions WHERE status = 'pending')::INTEGER AS pending_submissions,
  (SELECT COUNT(*) FROM price_alerts WHERE is_active)::INTEGER AS active_alerts,
  COALESCE(
    (SELECT ROUND(AVG(discount_pct)::NUMERIC, 1) FROM store_prices WHERE discount_pct > 0),
    0
  )::NUMERIC AS avg_savings;
