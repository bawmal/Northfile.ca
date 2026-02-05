# Northfile - Complete Product Capabilities Summary

## Overview
Northfile is an AI-powered tax compliance platform specifically designed for Ontario landlords to simplify T776 (Statement of Real Estate Rentals) form preparation and filing. The platform automates expense tracking, receipt management, and tax calculations while providing educational guidance throughout the process.

---

## Core Features

### 1. **Property Management**
**Location:** `/properties`

**Capabilities:**
- Multi-property portfolio tracking (unlimited properties)
- Property type classification (duplex, single-family, condo, basement apartment, etc.)
- Ownership percentage tracking (sole ownership or co-ownership splits)
- Co-owner management with separate T776 generation for each owner
- Rental period tracking with automatic proration for partial-year rentals
- Mortgage information tracking with interest/principal split calculations
- Real-time financial summaries (YTD income, expenses, net income)
- Transaction and receipt counts per property

**Key Innovation:**
- **Partial Year Rental Support:** Automatically prorates expenses when property was personal use for part of the year (e.g., converted principal residence to rental mid-year)
- **Co-Ownership Intelligence:** Tracks multiple owners and generates separate T776 forms for each, with proper expense splitting

---

### 2. **AI-Guided Property Onboarding**
**Location:** `/designs/onboarding` (7-step wizard)

**Step-by-Step Flow:**

**Step 1: Property Basics**
- Address, city, postal code
- Property type selection (9 options)
- Number of units

**Step 2: Rental Period** ⭐ Critical for Tax Compliance
- Rental start date picker
- Previous use classification (personal residence, vacation property, or investment)
- **AI Smart Detection:** Automatically identifies partial-year rentals and explains proration
- Visual breakdown of personal vs rental use periods

**Step 3: Rental Type Classification** 🆕 CRA Compliance
- Long-term rental (12+ months) → T776 form
- Short-term rental (Airbnb, VRBO) → May require business income filing
- Hotel/B&B/rooming house → Business income filing
- **AI Warning:** Explains when rental income becomes business income per CRA guidelines

**Step 4: Ownership Structure**
- Sole owner (100%) or co-ownership
- Co-owner details (name, relationship, percentage split)
- **AI Alert:** Explains that co-owners file separate T776 forms
- Optional: Send invite to co-owner

**Step 5: Purchase Information**
- Purchase date and price
- Optional: Land vs building value split (for CCA calculations)
- AI explanation of why this matters for depreciation

**Step 6: Mortgage Information** (Optional)
- Lender name, interest rate, monthly payment
- **AI Auto-Calculation:** Splits payment into deductible interest vs non-deductible principal
- Shows YTD interest tracking

**Step 7: Review & Confirm**
- Complete property summary card
- Visual confirmation of all entered data
- Next steps guidance (connect bank, upload receipts)

**Time to Complete:** ~2 minutes

---

### 3. **Transaction Management**
**Location:** `/transactions`

**Capabilities:**
- Comprehensive transaction table with filtering (All, Income, Expenses)
- AI-powered automatic categorization with confidence scores
- Manual category override with dropdown selection
- Receipt matching and linking
- Transaction status tracking (verified, pending review, AI-suggested)
- Bulk actions (select multiple, export, categorize)
- Property-specific transaction filtering
- Date range filtering

**AI Features:**
- **Smart Categorization:** Automatically assigns CRA-compliant expense categories
- **Confidence Scoring:** Shows AI confidence level (e.g., 95% match)
- **Proration Alerts:** Blue banner explains expense proration for partial-year properties
- **Mortgage Split Detection:** Automatically identifies and splits mortgage payments

**Visual Indicators:**
- Green rows for income transactions
- Blue highlighted rows for split transactions (mortgage payments)
- Purple badges for AI-suggested categories
- Receipt status icons (matched, missing, pending)

**Example Categories:**
- Income: Gross Rents, Other Income
- Expenses: Advertising, Insurance, Interest & Bank Charges, Office, Professional Fees, Management Fees, Repairs & Maintenance, Property Taxes, Utilities, Other

---

### 4. **Receipt Management**
**Location:** `/receipts`

**Capabilities:**
- Drag-and-drop receipt upload
- Multi-file upload support (PDF, JPG, PNG)
- OCR text extraction from receipts
- Automatic expense amount detection
- Receipt-to-transaction matching (1-to-1, many-to-1, 1-to-many)
- Receipt status tracking (matched, unmatched, pending review)
- Receipt preview and download
- Search and filter by date, amount, vendor

**Advanced Matching:**
- **Split Payment Detection:** Identifies when 2+ receipts match one transaction
- **Partial Payment Series:** Detects multiple receipts over time matching single transaction
- **AI Match Suggestions:** Proposes likely matches with confidence scores
- **Manual Override:** User can confirm, reject, or modify AI suggestions

**CRA Compliance:**
- **Record Retention Banner:** Prominent reminder to keep records for 6 years
- **Audit Protection Checklist:** Lists all documents to keep:
  - Original receipts/invoices
  - Bank statements
  - Credit card statements
  - Cancelled cheques/e-transfers
  - Contracts/agreements
  - Property tax bills
  - Insurance documents
  - Mortgage statements
- **Secure Storage:** All receipts backed up and downloadable for audits

---

### 5. **Dashboard & Financial Overview**
**Location:** `/dashboard`

**Capabilities:**
- Portfolio-wide financial summary
- Key metrics cards:
  - YTD Income (with breakdown)
  - YTD Expenses (with breakdown)
  - Net Income (before and after CCA)
  - Active properties count
- **Income vs Expenses Breakdown:**
  - Detailed income sources (Gross Rents, Other Income)
  - Detailed expense categories (Mortgage Interest highlighted separately)
  - Net income calculation with optional CCA
  - Visual color coding (green for income, orange for expenses, blue for net)
- **CCA Decision Tool:**
  - Optional CCA checkbox
  - Explanation of tax implications
  - Warning about capital gains impact
- **Action Items Panel:**
  - AI classification reviews pending
  - Receipt matching suggestions
  - Missing information alerts
- **Recent Activity Feed:**
  - Latest transactions
  - Recent receipt uploads
  - System notifications

**Educational Elements:**
- 💡 Note about principal payments not being deductible
- Inline explanations for each metric
- Links to detailed pages

---

### 6. **T776 Form Generation & Preview**
**Location:** `/reports`

**Capabilities:**
- Complete T776 form preview with CRA-compliant formatting
- Multi-property T776 generation (select 1 or all properties)
- Draft watermark for review before submission
- PDF download functionality
- Year selection (2024, 2025, etc.)

**T776 Form Sections:**

**Header:**
- Taxpayer identification (name, SIN)
- Tax year
- Property address and details

**Property Information:**
- Address, type, units
- Ownership percentage
- Co-owner details (if applicable)
- **Partial Year Notice:** Yellow alert showing rental period breakdown

**Part 1: Income**
- Gross rents (prorated for partial year)
- Other rental income
- Total income calculation
- **Inline tooltips** (ⓘ) explaining each line
- **Live proration examples** shown

**Part 2: Expenses** ⭐ Advanced Proration
- **4-Column Table Format:**
  1. Expense Category
  2. Total Cost (Full Year)
  3. Personal Portion (e.g., 91.5% for Jan-Nov)
  4. Rental Portion (e.g., 8.5% × 50% ownership)
- All CRA expense categories included
- **Mortgage Interest Breakdown:**
  - Shows deductible interest amount
  - Notes non-deductible principal amount
  - Bank fees included
- **Calculation Explanation Box:**
  - Step-by-step formula shown
  - Example: $6,000 × 8.5% × 50% = $255
  - Color-coded totals

**Part 3: Capital Cost Allowance (CCA)** 🆕 Enhanced

**Area A: CCA Calculation by Class**
- **Half-Year Rule Notice:** Yellow alert for first-year properties
- Detailed table showing:
  - Class number (1 for buildings, 8 for equipment)
  - Description
  - CCA rate (with half-year adjustment shown)
  - UCC start balance
  - Additions this year
  - CCA claimed
  - UCC end balance
- **Visual indicators:** "1st year" badges, rate adjustments (20% × 50%)

**Area B: Equipment Additions**
- Lists all equipment purchases (appliances, furniture)
- Class assignment
- Total cost
- Example: Refrigerator - $800 (Class 8)

**Area C: Building Additions**
- Lists all building improvements
- Shows $0 if no additions
- Note explaining no major renovations

**⚠️ CCA Warning - ACB Impact** 🆕 Critical Education
- **Large red warning box** explaining:
  - CCA is optional
  - Reduces taxes now but increases capital gains later
- **Example calculation:**
  - Original building: $400,000
  - CCA claimed (5 years): -$12,000
  - New ACB: $388,000
  - Extra capital gain: $12,000
  - Additional tax: ~$3,000
- **Blue box:** When TO claim CCA (3 scenarios)
- **Green box:** When NOT to claim CCA (3 scenarios)
- Accountant consultation reminder

**Net Income Calculation:**
- Rental income (prorated)
- Total rental expenses (prorated)
- Net income before CCA
- Optional CCA deduction
- **Final net rental income** (your ownership %)
- **Co-owner notice:** Explains partner files separate T776

**Footer:**
- Draft watermark
- Generation date
- Review reminder

**AI Assistance:**
- **"Ask AI" buttons** in section headers
- **Floating AI chat assistant** (bottom-right)
- Suggested questions on hover
- Always-available help

---

### 7. **AI-Powered Guidance System**

**Throughout the App:**

**Smart Alerts:**
- **Proration Explanation:** Blue banners on transactions page
- **Co-ownership Warnings:** Orange alerts about separate filing
- **Business Income Detection:** Identifies when T776 may not apply
- **CCA Decision Support:** Red warnings about ACB impact
- **Record Retention Reminders:** Blue banners on receipts page

**Inline Help:**
- Tooltips (ⓘ) next to every T776 line item
- Hover explanations for technical terms
- Live calculation examples
- Color-coded information boxes

**AI Chat Assistant:**
- Floating button on all pages
- Sparkles icon indicating AI
- Expands to show suggested questions
- Context-aware help based on current page

**Educational Content:**
- Plain language explanations (no tax jargon)
- Real-world examples with actual numbers
- Visual breakdowns of calculations
- Links to CRA guidelines
- Accountant consultation prompts

---

### 8. **Compliance & Tax Rules Engine**

**Automatic Calculations:**
- **Proration for Partial Year Rentals:**
  - Formula: Total Expense × (Rental Days / 365) × Ownership %
  - Applied to all expenses automatically
  - Visual breakdown shown in T776
- **Mortgage Interest/Principal Split:**
  - Based on amortization schedule
  - Only interest portion deductible
  - Principal tracked separately for equity
- **Co-Ownership Splits:**
  - Expenses divided by ownership percentage
  - Separate T776 for each owner
  - Income split proportionally
- **CCA Depreciation:**
  - Class-based rates (4% buildings, 20% equipment)
  - Half-year rule for first year
  - UCC tracking year-over-year
  - ACB reduction calculations

**CRA Compliance Features:**
- All expense categories match CRA T776 form
- Line numbers correspond to official form
- Proper treatment of capital vs operating expenses
- Business income vs rental income classification
- Record retention requirements enforced
- Audit-ready documentation

---

### 9. **Data Security & Storage**

**Features:**
- Secure cloud storage for all receipts and documents
- Automatic backups
- Encrypted data transmission
- Download anytime for personal records
- 6-year retention for CRA compliance
- Multi-device access

---

### 10. **Reporting & Export**

**Capabilities:**
- T776 PDF generation
- Export pack (all receipts + T776 + summary)
- Accountant sharing (invite with view-only access)
- CSV export of transactions
- Year-end summary reports
- Multi-year comparison

---

## Technical Specifications

### **Tech Stack:**
- **Frontend:** Next.js 13+ (App Router), React, TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI:** OpenAI API (for categorization and chat)
- **File Storage:** Supabase Storage

### **Database Schema:**
- `profiles` - User accounts
- `properties` - Property details, ownership, rental periods
- `co_owners` - Co-ownership relationships
- `transactions` - Income and expense transactions
- `receipts` - Uploaded receipt files and metadata
- `capital_additions` - Equipment and building improvements
- `cca_claims` - CCA history by property and class
- `equipment` - Depreciable assets tracking

### **Key Algorithms:**
- Proration calculator for partial-year rentals
- Mortgage amortization calculator for interest/principal split
- CCA depreciation calculator with half-year rule
- ACB tracking for capital gains calculations
- AI expense categorization with confidence scoring
- Receipt-to-transaction matching algorithm

---

## User Experience Highlights

### **Minimalist Design:**
- Clean white cards with subtle shadows
- Generous white space
- Soft color palette (blues, greens, purples, oranges)
- Clear typography hierarchy
- Intuitive navigation

### **Progressive Disclosure:**
- Only show complexity when needed
- Collapsible sections
- Step-by-step wizards
- Contextual help

### **Visual Feedback:**
- Color-coded categories (green=income, orange=expenses, blue=net)
- Status badges (Active, Verified, AI-suggested, 1st year)
- Progress indicators
- Confirmation messages
- Warning alerts

### **Mobile Responsive:**
- Adapts to all screen sizes
- Touch-friendly interfaces
- Optimized for tablet and phone

---

## Competitive Advantages

### **1. Ontario-Specific:**
- Built specifically for Ontario landlords
- CRA T776 form compliance
- Provincial tax rules embedded

### **2. Partial Year Rental Support:**
- Only platform that handles mid-year conversions correctly
- Automatic proration calculations
- Personal vs rental period tracking

### **3. Co-Ownership Intelligence:**
- Proper expense splitting
- Separate T776 generation
- Co-owner collaboration features

### **4. Mortgage Intelligence:**
- Automatic interest/principal split
- Only deductible portion tracked
- Amortization-based calculations

### **5. CCA Education:**
- Half-year rule explained
- ACB impact warnings
- Decision support tools
- When to claim vs not claim guidance

### **6. AI-Powered Education:**
- Proactive guidance before mistakes happen
- Plain language explanations
- Real-world examples
- Always-available chat assistant

### **7. Audit Protection:**
- 6-year record retention
- Complete documentation trail
- Receipt-transaction matching
- CRA-compliant categorization

---

## Target Users

### **Primary:**
- Ontario landlords with 1-10 properties
- First-time landlords unfamiliar with T776
- Landlords who converted principal residence to rental
- Co-owners filing separately
- DIY tax filers

### **Secondary:**
- Accountants managing multiple landlord clients
- Property managers
- Real estate investors

---

## Use Cases

### **Scenario 1: First-Time Landlord**
Sarah bought a duplex in 2024. She has no tax experience.
- **Onboarding:** 7-step wizard collects all property details
- **Transactions:** AI categorizes all expenses automatically
- **Receipts:** Upload photos, AI matches to transactions
- **T776:** Complete form generated with explanations
- **Result:** Files correctly without accountant

### **Scenario 2: Partial Year Rental**
John converted his principal residence to rental on Dec 1, 2024.
- **Onboarding:** AI detects partial year, explains proration
- **Expenses:** All expenses automatically prorated (8.5% of year)
- **T776:** Shows personal vs rental portions clearly
- **Result:** Only deducts 1 month of expenses correctly

### **Scenario 3: Co-Ownership**
Mike and Sarah own 50/50, filing separately.
- **Onboarding:** Both owners added with 50% split
- **Expenses:** All expenses split 50/50 automatically
- **T776:** Separate forms generated for each owner
- **Result:** Both file correctly with matching amounts

### **Scenario 4: CCA Decision**
Lisa wants to know if she should claim CCA.
- **Dashboard:** Optional CCA checkbox with explanation
- **T776:** Red warning box shows ACB impact example
- **Guidance:** When to claim vs not claim scenarios
- **Result:** Makes informed decision with accountant

### **Scenario 5: Airbnb Host**
Tom runs a short-term rental with cleaning services.
- **Onboarding:** Step 3 asks about rental type
- **Warning:** AI alerts this may be business income, not rental
- **Guidance:** Suggests consulting accountant
- **Result:** Avoids incorrect T776 filing

---

## Future Enhancements (Not Yet Built)

### **Phase 2:**
- Bank account integration (Plaid)
- Automatic transaction import
- Real-time categorization
- Mobile app (iOS/Android)

### **Phase 3:**
- Multi-province support (BC, AB, QC)
- Business income filing (T2125)
- Capital gains calculator
- Property sale tracking

### **Phase 4:**
- Accountant portal
- Client management
- Bulk T776 generation
- E-filing to CRA

---

## Summary

**Northfile is the only tax platform specifically designed for Ontario landlords that:**
1. ✅ Handles partial-year rentals with automatic proration
2. ✅ Manages co-ownership with separate T776 generation
3. ✅ Splits mortgage payments into deductible/non-deductible
4. ✅ Educates users about CCA, ACB, and capital gains
5. ✅ Classifies rental vs business income per CRA rules
6. ✅ Enforces 6-year record retention requirements
7. ✅ Provides AI-powered guidance throughout
8. ✅ Generates CRA-compliant T776 forms with explanations

**Result:** Landlords file accurate T776 forms without tax knowledge, avoiding costly mistakes and audit penalties.

---

**Current Status:** Fully designed mockups with complete UI/UX flows. Ready for backend implementation and database integration.

**Demo Pages:**
- `/dashboard` - Financial overview
- `/properties` - Property management
- `/transactions` - Transaction tracking
- `/receipts` - Receipt management
- `/reports` - T776 generation
- `/designs/onboarding` - Property setup wizard
