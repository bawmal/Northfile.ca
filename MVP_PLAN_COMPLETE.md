# Northfile MVP - Complete Plan with Income & CCA

## ✅ Confirmed Scope

**INCLUDES:**
- ✅ Income tracking (gross rents + other income)
- ✅ Expense tracking with AI classification
- ✅ Capital vs. Current expense classification
- ✅ CCA (Capital Cost Allowance) calculation
- ✅ Complete T776 form generation (income + expenses + CCA)
- ✅ Receipt OCR and auto-matching
- ✅ Net rental income/loss calculation
- ✅ Accountant export packs

---

## 📊 Updated Database Schema

### **Transactions Table (Enhanced)**
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  date DATE NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  
  -- Transaction Type (NEW)
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  
  -- Income Classification (NEW)
  income_type TEXT CHECK (income_type IN ('gross_rents', 'other_income')),
  
  -- Expense Classification
  expense_category TEXT, -- CRA T776 line item
  is_capital BOOLEAN DEFAULT false,
  capital_addition_id UUID REFERENCES capital_additions(id),
  
  -- AI Classification
  ai_suggested_type TEXT,
  ai_suggested_category TEXT,
  ai_confidence DECIMAL(3, 2),
  ai_reasoning TEXT,
  
  -- Receipt Linking
  receipt_id UUID REFERENCES receipts(id),
  
  -- Verification
  user_verified BOOLEAN DEFAULT false,
  verified_at TIMESTAMP,
  
  -- Metadata
  source TEXT, -- 'csv_upload', 'manual_entry', 'bank_sync'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_transactions_property ON transactions(property_id);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_type ON transactions(type);
```

### **Properties Table (Enhanced for CCA)**
```sql
CREATE TABLE properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Info
  address TEXT NOT NULL,
  city TEXT,
  province TEXT DEFAULT 'ON',
  postal_code TEXT,
  property_type TEXT NOT NULL,
  units INTEGER DEFAULT 1,
  
  -- Ownership
  ownership_percentage DECIMAL(5, 2) DEFAULT 100.00,
  
  -- Purchase Info (NEW - for CCA)
  purchase_date DATE,
  purchase_price DECIMAL(12, 2),
  land_value DECIMAL(12, 2), -- Not depreciable
  building_value DECIMAL(12, 2), -- Depreciable portion
  
  -- CCA Settings (NEW)
  cca_class TEXT DEFAULT 'Class 1',
  cca_rate DECIMAL(4, 2) DEFAULT 4.00, -- 4% for Class 1
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Capital Additions Table (NEW)**
```sql
CREATE TABLE capital_additions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  transaction_id UUID REFERENCES transactions(id),
  
  -- Addition Details
  description TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  addition_type TEXT CHECK (addition_type IN (
    'building_improvement',
    'major_renovation',
    'addition',
    'equipment',
    'other'
  )),
  
  -- CCA Classification
  cca_class TEXT DEFAULT 'Class 1',
  cca_rate DECIMAL(4, 2),
  
  -- Status
  included_in_cca BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **CCA Claims Table (NEW)**
```sql
CREATE TABLE cca_claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  tax_year INTEGER NOT NULL,
  
  -- UCC Calculation
  ucc_opening DECIMAL(12, 2) NOT NULL, -- Undepreciated Capital Cost
  additions DECIMAL(12, 2) DEFAULT 0,
  disposals DECIMAL(12, 2) DEFAULT 0,
  ucc_before_cca DECIMAL(12, 2),
  
  -- CCA Claim
  cca_rate DECIMAL(4, 2),
  cca_claimable DECIMAL(12, 2), -- Maximum available
  cca_claimed DECIMAL(12, 2), -- What user chose to claim
  
  -- Closing Balance
  ucc_closing DECIMAL(12, 2),
  
  -- User Decision
  user_opted_to_claim BOOLEAN DEFAULT false,
  claimed_at TIMESTAMP,
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(property_id, tax_year)
);
```

### **Receipts Table (Existing - No Changes)**
```sql
CREATE TABLE receipts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES properties(id),
  
  -- File Info
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT,
  
  -- OCR Data
  ocr_data JSONB,
  merchant TEXT,
  date DATE,
  amount DECIMAL(10, 2),
  
  -- Matching
  matched_transaction_id UUID REFERENCES transactions(id),
  match_confidence DECIMAL(3, 2),
  match_status TEXT CHECK (match_status IN (
    'auto_matched',
    'manually_matched',
    'unmatched',
    'processing'
  )),
  
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🤖 Enhanced AI Classification

### **Updated Classification Prompt**

```typescript
const enhancedClassificationPrompt = `
You are an expert Canadian tax accountant specializing in rental property income and CRA T776 forms.

Analyze this transaction and provide detailed classification:

Transaction Details:
- Description: "${transaction.description}"
- Amount: $${transaction.amount}
- Date: ${transaction.date}
- Merchant: "${transaction.merchant || 'Unknown'}"

Your Task:
1. Determine if this is INCOME or EXPENSE
2. Classify according to CRA T776 requirements
3. For expenses, determine if CURRENT (deductible now) or CAPITAL (depreciable)

INCOME Types:
- Gross Rents: Monthly rent payments from tenants
- Other Income: Parking fees, laundry, storage, vending, late fees

EXPENSE Categories (Current):
- Advertising
- Insurance
- Interest & bank charges
- Office expenses
- Professional fees (legal, accounting)
- Management & administration fees
- Repairs & maintenance (maintains current condition)
- Salaries, wages & benefits
- Property taxes
- Travel
- Utilities (heat, hydro, water)
- Motor vehicle expenses
- Other expenses

CAPITAL Expenses (Depreciable):
Indicators:
- Improvements that increase property value
- Major renovations (kitchen, bathroom, roof replacement)
- Additions (new deck, garage, room addition)
- Equipment with useful life > 1 year
- Amount typically > $500

Examples:
- New roof: CAPITAL
- Roof repair (patch): CURRENT
- Kitchen renovation: CAPITAL
- Fix broken faucet: CURRENT
- New appliances: CAPITAL (if > $500)
- Replace light bulb: CURRENT

Respond in JSON format:
{
  "type": "income" | "expense",
  "income_type": "gross_rents" | "other_income" | null,
  "expense_category": "category name" | null,
  "is_capital": boolean,
  "capital_reasoning": "why this is/isn't capital" | null,
  "confidence": 0.0 to 1.0,
  "reasoning": "brief explanation of classification"
}
`;
```

---

## 📱 Updated Interface Designs

### **1. Enhanced Dashboard**

Add Income vs Expenses card:

```tsx
{/* Income vs Expenses Summary */}
<div className="bg-white rounded-xl p-6 border border-slate-200">
  <h3 className="text-lg font-bold text-slate-900 mb-4">2025 Financial Summary</h3>
  
  <div className="space-y-4">
    {/* Income */}
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-600">Total Income</span>
        <span className="text-2xl font-bold text-green-600">$48,000</span>
      </div>
      <div className="text-xs text-slate-500 space-y-1">
        <div className="flex justify-between">
          <span>Gross Rents</span>
          <span>$46,800</span>
        </div>
        <div className="flex justify-between">
          <span>Other Income</span>
          <span>$1,200</span>
        </div>
      </div>
    </div>
    
    {/* Expenses */}
    <div className="pt-3 border-t border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-600">Total Expenses</span>
        <span className="text-2xl font-bold text-orange-600">$42,350</span>
      </div>
      <div className="text-xs text-slate-500">
        <span>Current: $40,150 • Capital: $2,200</span>
      </div>
    </div>
    
    {/* Net Before CCA */}
    <div className="pt-3 border-t border-slate-200">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-slate-900">Net Before CCA</span>
        <span className="text-2xl font-bold text-blue-600">$5,650</span>
      </div>
    </div>
    
    {/* CCA Option */}
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-purple-900">CCA Available</p>
          <p className="text-xs text-purple-600">4% of $60,000 building value</p>
        </div>
        <span className="text-lg font-bold text-purple-900">$2,400</span>
      </div>
      <label className="flex items-center gap-2 text-sm text-purple-700 cursor-pointer">
        <input type="checkbox" className="rounded" />
        Claim CCA this year?
      </label>
      <p className="text-xs text-purple-600 mt-2">
        ⚠️ Reduces income now but affects capital gains later
      </p>
    </div>
    
    {/* Final Net Income */}
    <div className="pt-3 border-t-2 border-slate-300">
      <div className="flex items-center justify-between">
        <span className="font-bold text-slate-900">Net Rental Income</span>
        <span className="text-3xl font-bold text-blue-600">$3,250</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">After CCA deduction</p>
    </div>
  </div>
</div>
```

### **2. Enhanced Transaction Table**

Add income/expense toggle and type indicators:

```tsx
{/* Transaction Type Filter */}
<div className="flex items-center gap-2">
  <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold">
    Income (47)
  </button>
  <button className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg font-semibold">
    Expenses (200)
  </button>
  <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold">
    All (247)
  </button>
</div>

{/* Income Transaction Row */}
<div className="px-6 py-4 bg-green-50">
  <div className="flex items-center gap-4">
    <div className="w-2 h-12 bg-green-600 rounded-full"></div>
    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
      <div className="col-span-2">
        <p className="text-sm font-medium text-slate-900">Jan 1, 2025</p>
        <p className="text-xs text-slate-500">123 Main St</p>
      </div>
      <div className="col-span-4">
        <p className="text-sm font-medium text-slate-900">Rent Payment - Unit 1A</p>
        <p className="text-xs text-slate-500">E-Transfer from John Tenant</p>
      </div>
      <div className="col-span-1">
        <p className="text-sm font-semibold text-green-600">+$1,950</p>
      </div>
      <div className="col-span-3">
        <select className="px-3 py-2 border-2 border-green-200 bg-green-50 rounded-lg text-sm font-medium text-green-900">
          <option>Gross Rents</option>
          <option>Other Income</option>
        </select>
      </div>
    </div>
  </div>
</div>

{/* Capital Expense Row */}
<div className="px-6 py-4 bg-purple-50">
  <div className="flex items-center gap-4">
    <div className="w-2 h-12 bg-purple-600 rounded-full"></div>
    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
      <div className="col-span-2">
        <p className="text-sm font-medium text-slate-900">Jan 10, 2025</p>
        <p className="text-xs text-slate-500">123 Main St</p>
      </div>
      <div className="col-span-4">
        <p className="text-sm font-medium text-slate-900">Kitchen Renovation</p>
        <p className="text-xs text-slate-500">ABC Contractors</p>
      </div>
      <div className="col-span-1">
        <p className="text-sm font-semibold text-slate-900">-$8,500</p>
      </div>
      <div className="col-span-3">
        <div className="space-y-2">
          <select className="w-full px-3 py-2 border-2 border-purple-200 bg-purple-50 rounded-lg text-sm font-medium text-purple-900">
            <option>Capital Improvement</option>
            <option>Repairs & Maintenance</option>
          </select>
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-purple-600 text-white px-2 py-1 rounded font-semibold">
              CAPITAL
            </span>
            <span className="text-purple-700">Added to CCA</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### **3. Property Settings - CCA Configuration**

```tsx
{/* CCA Settings Section */}
<div className="bg-white rounded-xl border border-slate-200 p-6">
  <h3 className="text-lg font-bold text-slate-900 mb-4">
    CCA (Depreciation) Settings
  </h3>
  
  <div className="grid md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">
        Purchase Date
      </label>
      <input
        type="date"
        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg"
        defaultValue="2020-06-15"
      />
    </div>
    
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">
        Purchase Price
      </label>
      <input
        type="number"
        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg"
        defaultValue="500000"
        placeholder="500,000"
      />
    </div>
    
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">
        Land Value (Not Depreciable)
      </label>
      <input
        type="number"
        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg"
        defaultValue="200000"
        placeholder="200,000"
      />
    </div>
    
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-2">
        Building Value (Depreciable)
      </label>
      <input
        type="number"
        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg bg-blue-50"
        value="300000"
        disabled
      />
      <p className="text-xs text-slate-500 mt-1">
        Auto-calculated: Purchase Price - Land Value
      </p>
    </div>
  </div>
  
  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
    <h4 className="font-semibold text-blue-900 mb-2">CCA Calculation</h4>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-blue-700">Class 1 Rate:</span>
        <span className="font-semibold text-blue-900">4%</span>
      </div>
      <div className="flex justify-between">
        <span className="text-blue-700">Annual CCA (Max):</span>
        <span className="font-semibold text-blue-900">$12,000</span>
      </div>
      <div className="flex justify-between">
        <span className="text-blue-700">UCC (Current):</span>
        <span className="font-semibold text-blue-900">$285,000</span>
      </div>
    </div>
  </div>
</div>
```

---

## 🎯 Updated MVP Sprint Plan

### **Sprint 1: Foundation (Week 1-2)**
1. Supabase setup
2. Authentication (email + Google OAuth)
3. Database schema with income/CCA tables
4. Basic dashboard layout
5. Property CRUD with CCA fields

### **Sprint 2: Transaction Core + AI (Week 3-4)**
1. CSV upload & parsing
2. **Income/Expense type detection**
3. OpenAI integration for classification
4. **Capital vs. Current expense AI logic**
5. Transaction list with type indicators
6. Manual category override

### **Sprint 3: Receipt OCR & Matching (Week 5-6)**
1. Google Cloud Vision API setup
2. Bulk receipt upload
3. OCR processing pipeline
4. Auto-matching algorithm
5. Match review UI

### **Sprint 4: Income & CCA (Week 7-8)**
1. **Income transaction entry**
2. **Gross rents vs. other income categorization**
3. **CCA calculation engine**
4. **Capital additions tracking**
5. **Net income summary dashboard**

### **Sprint 5: Reporting (Week 9-10)**
1. **Complete T776 form generation (income + expenses + CCA)**
2. PDF export with watermark
3. **CCA schedule generation**
4. Export pack with all documents
5. Accountant invite system

---

## 📋 T776 Form Sections (Complete)

### **Part 1: Income**
- Line 8141: Gross rents
- Line 8230: Other income
- Line 8299: Total income

### **Part 2: Expenses**
- All expense categories (as previously defined)
- Line 9369: Total expenses

### **Part 3: Net Income Calculation**
- Net income before CCA
- CCA claimed (optional)
- Final net rental income/loss

### **Schedule: CCA (Class 1)**
- UCC at start of year
- Additions during year
- Disposals during year
- CCA claimed
- UCC at end of year

---

## 💡 Key Features Summary

✅ **Complete Financial Picture**
- Income tracking (rents + other)
- Expense tracking (current + capital)
- Net income calculation
- CCA optional deduction

✅ **AI-Powered Classification**
- Income vs. expense detection
- Gross rents vs. other income
- Current vs. capital expense logic
- 95%+ accuracy with user override

✅ **CCA Management**
- Property purchase tracking
- Land/building value split
- Capital additions tracking
- Annual CCA calculation
- User choice to claim or not

✅ **Complete T776 Generation**
- Both income and expense sections
- CCA schedule
- Net rental income/loss
- CRA-compliant formatting

---

This is now a **complete rental tax prep solution**, not just an expense tracker!
