-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  sin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create properties table
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  province TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  property_type TEXT NOT NULL, -- 'duplex', 'single_family', 'basement', 'condo', etc.
  units INTEGER DEFAULT 1,
  ownership_percentage DECIMAL DEFAULT 100,
  purchase_date DATE,
  purchase_price DECIMAL,
  land_value DECIMAL,
  building_value DECIMAL,
  personal_use_percentage DECIMAL DEFAULT 0,
  status TEXT DEFAULT 'active', -- 'active', 'sold', 'inactive'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create co_owners table
CREATE TABLE co_owners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  sin TEXT,
  ownership_percentage DECIMAL NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  amount DECIMAL NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL, -- 'income' or 'expense'
  category TEXT NOT NULL, -- 'Gross Rent', 'Repairs', 'Insurance', etc.
  subcategory TEXT,
  is_capital BOOLEAN DEFAULT FALSE, -- true if capital expense/addition
  payment_method TEXT, -- 'credit_card', 'debit', 'cash', 'check', 'etransfer'
  vendor TEXT,
  ai_suggested_category TEXT,
  ai_confidence DECIMAL,
  ai_reasoning TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create receipts table
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'image/jpeg', 'application/pdf', etc.
  file_size INTEGER,
  ocr_text TEXT,
  ocr_amount DECIMAL,
  ocr_date DATE,
  ocr_vendor TEXT,
  match_status TEXT DEFAULT 'unmatched', -- 'unmatched', 'auto_matched', 'manual_matched', 'pending_review'
  match_confidence DECIMAL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create capital_additions table (for CCA tracking)
CREATE TABLE capital_additions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
  description TEXT NOT NULL,
  class_number INTEGER NOT NULL, -- CCA class (1 for buildings, 8 for equipment, etc.)
  purchase_date DATE NOT NULL,
  cost DECIMAL NOT NULL,
  personal_use_percentage DECIMAL DEFAULT 0,
  disposed_date DATE,
  proceeds DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cca_claims table (annual CCA claims)
CREATE TABLE cca_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  tax_year INTEGER NOT NULL,
  class_number INTEGER NOT NULL,
  ucc_start DECIMAL NOT NULL, -- Undepreciated Capital Cost at start of year
  additions DECIMAL DEFAULT 0,
  dispositions DECIMAL DEFAULT 0,
  ucc_before_cca DECIMAL NOT NULL,
  cca_rate DECIMAL NOT NULL, -- e.g., 0.04 for 4%
  cca_claimed DECIMAL NOT NULL,
  ucc_end DECIMAL NOT NULL,
  is_claimed BOOLEAN DEFAULT FALSE, -- whether user chose to claim CCA this year
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(property_id, tax_year, class_number)
);

-- Create equipment table (for non-building capital items)
CREATE TABLE equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  class_number INTEGER NOT NULL, -- 8, 10, etc.
  purchase_date DATE NOT NULL,
  cost DECIMAL NOT NULL,
  personal_use_percentage DECIMAL DEFAULT 0,
  disposed_date DATE,
  proceeds DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_property_id ON transactions(property_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_receipts_user_id ON receipts(user_id);
CREATE INDEX idx_receipts_transaction_id ON receipts(transaction_id);
CREATE INDEX idx_capital_additions_property_id ON capital_additions(property_id);
CREATE INDEX idx_cca_claims_property_year ON cca_claims(property_id, tax_year);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE co_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE capital_additions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cca_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for properties
CREATE POLICY "Users can view own properties" ON properties
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own properties" ON properties
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties" ON properties
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties" ON properties
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for co_owners
CREATE POLICY "Users can view co_owners of their properties" ON co_owners
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = co_owners.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage co_owners of their properties" ON co_owners
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = co_owners.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Create RLS policies for transactions
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON transactions
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON transactions
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for receipts
CREATE POLICY "Users can view own receipts" ON receipts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own receipts" ON receipts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own receipts" ON receipts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own receipts" ON receipts
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for capital_additions
CREATE POLICY "Users can view capital_additions of their properties" ON capital_additions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = capital_additions.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage capital_additions of their properties" ON capital_additions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = capital_additions.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Create RLS policies for cca_claims
CREATE POLICY "Users can view cca_claims of their properties" ON cca_claims
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = cca_claims.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage cca_claims of their properties" ON cca_claims
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = cca_claims.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Create RLS policies for equipment
CREATE POLICY "Users can view equipment of their properties" ON equipment
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = equipment.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage equipment of their properties" ON equipment
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = equipment.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call function on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
