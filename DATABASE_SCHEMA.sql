-- Northfile MVP Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE (extends Supabase auth.users)
-- =====================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- =====================================================
-- PROPERTIES TABLE
-- =====================================================
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  property_type TEXT NOT NULL CHECK (property_type IN ('house', 'condo', 'duplex', 'triplex', 'townhouse', 'basement_apartment', 'apartment_building')),
  units INTEGER NOT NULL DEFAULT 1,
  ownership_pct DECIMAL(5,2) NOT NULL DEFAULT 100.00 CHECK (ownership_pct > 0 AND ownership_pct <= 100),
  rental_start_date DATE NOT NULL,
  rental_end_date DATE,
  purchase_date DATE NOT NULL,
  purchase_price DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for properties
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own properties"
  ON properties FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own properties"
  ON properties FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own properties"
  ON properties FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own properties"
  ON properties FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- MORTGAGES TABLE
-- =====================================================
CREATE TABLE mortgages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  lender_name TEXT NOT NULL,
  monthly_payment DECIMAL(10,2) NOT NULL,
  ytd_interest DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for mortgages
ALTER TABLE mortgages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view mortgages for own properties"
  ON mortgages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = mortgages.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert mortgages for own properties"
  ON mortgages FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = mortgages.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update mortgages for own properties"
  ON mortgages FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = mortgages.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete mortgages for own properties"
  ON mortgages FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = mortgages.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- =====================================================
-- TRANSACTIONS TABLE
-- =====================================================
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    'gross_rents',
    'other_income',
    'advertising',
    'insurance',
    'interest_bank_charges',
    'office_expenses',
    'professional_fees',
    'management_fees',
    'repairs_maintenance',
    'property_taxes',
    'utilities',
    'other_expenses'
  )),
  ai_category_suggestion TEXT,
  ai_confidence DECIMAL(5,2),
  receipt_id UUID,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view transactions for own properties"
  ON transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = transactions.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert transactions for own properties"
  ON transactions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = transactions.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update transactions for own properties"
  ON transactions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = transactions.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete transactions for own properties"
  ON transactions FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = transactions.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- =====================================================
-- RECEIPTS TABLE
-- =====================================================
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  upload_date TIMESTAMPTZ DEFAULT NOW(),
  ocr_text TEXT,
  transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for receipts
ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own receipts"
  ON receipts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own receipts"
  ON receipts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own receipts"
  ON receipts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own receipts"
  ON receipts FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- T776 DRAFTS TABLE
-- =====================================================
CREATE TABLE t776_drafts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  tax_year INTEGER NOT NULL,
  income_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  expense_total DECIMAL(10,2) NOT NULL DEFAULT 0,
  net_income DECIMAL(10,2) NOT NULL DEFAULT 0,
  cca_claimed DECIMAL(10,2) NOT NULL DEFAULT 0,
  generated_pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(property_id, tax_year)
);

-- RLS Policies for t776_drafts
ALTER TABLE t776_drafts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own T776 drafts"
  ON t776_drafts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own T776 drafts"
  ON t776_drafts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own T776 drafts"
  ON t776_drafts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own T776 drafts"
  ON t776_drafts FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- NOTICES TABLE
-- =====================================================
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  notice_type TEXT NOT NULL CHECK (notice_type IN ('n1_rent_increase', 'n4_late_rent')),
  tenant_name TEXT NOT NULL,
  issue_date DATE NOT NULL,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for notices
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view notices for own properties"
  ON notices FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = notices.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert notices for own properties"
  ON notices FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = notices.property_id
      AND properties.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete notices for own properties"
  ON notices FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM properties
      WHERE properties.id = notices.property_id
      AND properties.user_id = auth.uid()
    )
  );

-- =====================================================
-- AUDIT LOGS TABLE
-- =====================================================
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies for audit_logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own audit logs"
  ON audit_logs FOR SELECT
  USING (auth.uid() = user_id);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================
CREATE INDEX idx_properties_user_id ON properties(user_id);
CREATE INDEX idx_mortgages_property_id ON mortgages(property_id);
CREATE INDEX idx_transactions_property_id ON transactions(property_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_receipts_user_id ON receipts(user_id);
CREATE INDEX idx_receipts_property_id ON receipts(property_id);
CREATE INDEX idx_t776_drafts_user_id ON t776_drafts(user_id);
CREATE INDEX idx_t776_drafts_property_id ON t776_drafts(property_id);
CREATE INDEX idx_notices_property_id ON notices(property_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to relevant tables
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mortgages_updated_at
  BEFORE UPDATE ON mortgages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_t776_drafts_updated_at
  BEFORE UPDATE ON t776_drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- STORAGE BUCKETS (Run these in Supabase Dashboard)
-- =====================================================
-- Create storage bucket for receipts
-- INSERT INTO storage.buckets (id, name, public) VALUES ('receipts', 'receipts', false);

-- Storage policies for receipts bucket
-- CREATE POLICY "Users can upload own receipts"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can view own receipts"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- CREATE POLICY "Users can delete own receipts"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'receipts' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- WAITLIST TABLE
-- =====================================================
CREATE TABLE waitlist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  properties_count TEXT,
  current_solution TEXT,
  referral_source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for email lookups and duplicate prevention
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- RLS Policies for waitlist (public insert, admin read)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert into waitlist (public signup)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist FOR INSERT
  WITH CHECK (true);

-- Only admins can view waitlist (you can adjust this based on your admin setup)
CREATE POLICY "Admins can view waitlist"
  ON waitlist FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email IN ('admin@northfile.ca', 'your-admin-email@example.com')
    )
  );
