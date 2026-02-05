# Northfile MVP - Simplified Scope

## Overview
Northfile MVP focuses on the essential features needed for Ontario landlords to generate accurate T776 forms with proper expense proration and co-ownership handling. Everything else is design-only for future phases.

---

## ✅ MVP Capabilities (Build These)

### **1. Property Setup**
**What's included:**
- Multi-property support (unlimited)
- Ownership % tracking
- Rental start/end dates
- Purchase price
- Mortgage details (lender, monthly payment, YTD interest)

**What's NOT included (design-only):**
- Property nicknames
- Land vs building value split
- Mortgage statement upload
- Co-owner invites/collaboration
- Property images

**Database tables:**
- `properties` (id, user_id, address, city, postal_code, property_type, units, ownership_pct, rental_start_date, rental_end_date, purchase_date, purchase_price)
- `mortgages` (id, property_id, lender_name, monthly_payment, ytd_interest)

---

### **2. Transaction Inbox**
**What's included:**
- Manual transaction entry (date, description, amount, category)
- AI category suggestions with confidence scores
- Receipt linking (1-to-1 only)
- Proration alerts for partial-year properties
- Income/expense filtering

**What's NOT included (design-only):**
- Bank account sync (Plaid integration)
- Automatic transaction import
- Bulk actions
- Split payment detection (many-to-1, 1-to-many)
- CSV import/export

**Database tables:**
- `transactions` (id, property_id, date, description, amount, category, ai_category_suggestion, ai_confidence, receipt_id, is_verified)

---

### **3. Receipt Vault**
**What's included:**
- Manual receipt upload (drag-and-drop, file picker)
- OCR text extraction (basic)
- 6-year retention reminders (banner on receipts page)
- Secure storage (Supabase Storage)
- Receipt preview & download

**What's NOT included (design-only):**
- Advanced OCR (vendor detection, line items)
- Receipt-to-transaction auto-matching
- Bulk upload
- Receipt search by vendor/amount
- Receipt tagging/categorization

**Database tables:**
- `receipts` (id, user_id, property_id, file_url, file_name, upload_date, ocr_text, transaction_id)

---

### **4. T776 Drafts**
**What's included:**
- Income totals (gross rents, other income)
- Expense totals by CRA category
- Ownership % splits (your portion only)
- Basic CCA schedule (Class 1 buildings only, no equipment)
- Proration calculations (rental period %)
- PDF export with draft watermark

**What's NOT included (design-only):**
- Multi-property T776 generation
- Co-owner separate T776s
- Detailed CCA (equipment, half-year rule, ACB warnings)
- Interactive T776 preview with AI chat
- Year-over-year comparison
- E-filing to CRA

**Database tables:**
- `t776_drafts` (id, user_id, property_id, tax_year, income_total, expense_total, net_income, cca_claimed, generated_pdf_url, created_at)

---

### **5. Accountant Packs**
**What's included:**
- ZIP file generation
- Includes: All receipts (PDFs/images), transaction ledger (CSV), rent roll (CSV), mortgage summary (PDF)
- One-click download

**What's NOT included (design-only):**
- Accountant portal/sharing
- Accountant invites with view-only access
- Real-time collaboration
- Comments/notes
- Custom pack templates

**Implementation:**
- Server-side ZIP generation
- Temporary download link (expires in 24h)

---

### **6. Ontario Notices**
**What's included:**
- Late rent notice template (N4 form)
- Rent increase notice template (N1 form)
- Pre-filled with property/tenant info
- PDF download

**What's NOT included (design-only):**
- Tenant portal
- Notice tracking/status
- Email delivery
- E-signature
- Other LTB forms (N5, N7, N12, etc.)

**Database tables:**
- `notices` (id, property_id, notice_type, tenant_name, issue_date, pdf_url)

---

### **7. Light AI Assistance**
**What's included:**
- Transaction categorization with confidence scores (e.g., "95% confident this is Property Tax")
- Inline explanations (tooltips on T776 line items)
- Proration calculation explanations

**What's NOT included (design-only):**
- AI chat assistant
- "Ask AI" buttons
- Smart alerts (business income detection, CCA warnings)
- Suggested questions
- Contextual help based on user behavior

**Implementation:**
- OpenAI API for categorization
- Static tooltip content (no dynamic AI responses)

---

### **8. Security**
**What's included:**
- Encrypted storage (Supabase default encryption)
- Row-level security (RLS) policies
- Audit logs (basic: user_id, action, timestamp)
- Secure authentication (Supabase Auth)

**What's NOT included (design-only):**
- 2FA/MFA
- IP whitelisting
- Advanced audit logs (field-level changes)
- Data export/deletion (GDPR compliance)
- Session management

**Database tables:**
- `audit_logs` (id, user_id, action, table_name, record_id, timestamp)

---

## 🎨 Design-Only Features (Not Built in MVP)

### **From Full Product:**
1. **AI-Guided Onboarding Wizard** - Design exists at `/designs/onboarding-simple`
2. **Co-Ownership Management** - Separate T776 generation, co-owner invites
3. **Advanced CCA Calculations** - Half-year rule, ACB warnings, equipment tracking
4. **Business Income Classifier** - Rental vs business income detection
5. **Bank Account Sync** - Plaid integration, automatic imports
6. **Advanced Receipt Matching** - Split payments, partial series
7. **AI Chat Assistant** - Floating button, contextual help
8. **Dashboard Analytics** - Charts, trends, YoY comparison
9. **Mobile App** - iOS/Android
10. **Multi-Province Support** - BC, AB, QC

### **From Onboarding:**
- Property nicknames
- Rental type classification (long-term vs Airbnb)
- Co-owner details collection
- Mortgage statement upload
- Land/building value split

---

## 📊 MVP Database Schema

### **Core Tables:**
```sql
-- Users (handled by Supabase Auth)
profiles (id, email, full_name, created_at)

-- Properties
properties (
  id, user_id, address, city, postal_code, 
  property_type, units, ownership_pct, 
  rental_start_date, rental_end_date, 
  purchase_date, purchase_price, created_at
)

-- Mortgages
mortgages (
  id, property_id, lender_name, 
  monthly_payment, ytd_interest, created_at
)

-- Transactions
transactions (
  id, property_id, date, description, amount, 
  category, ai_category_suggestion, ai_confidence, 
  receipt_id, is_verified, created_at
)

-- Receipts
receipts (
  id, user_id, property_id, file_url, file_name, 
  upload_date, ocr_text, transaction_id
)

-- T776 Drafts
t776_drafts (
  id, user_id, property_id, tax_year, 
  income_total, expense_total, net_income, 
  cca_claimed, generated_pdf_url, created_at
)

-- Notices
notices (
  id, property_id, notice_type, tenant_name, 
  issue_date, pdf_url, created_at
)

-- Audit Logs
audit_logs (
  id, user_id, action, table_name, 
  record_id, timestamp
)
```

---

## 🚀 MVP Tech Stack

### **Frontend:**
- Next.js 13+ (App Router)
- React
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### **Backend:**
- Supabase (PostgreSQL + Auth + Storage)
- Supabase Edge Functions (for server-side logic)

### **AI:**
- OpenAI API (GPT-4 for categorization)

### **PDF Generation:**
- jsPDF or Puppeteer (server-side)

### **File Storage:**
- Supabase Storage (receipts, PDFs)

---

## 📝 MVP User Flow

### **1. Sign Up**
- Email/password (Supabase Auth)
- No onboarding wizard (just dashboard)

### **2. Add Property**
- Simple form (not wizard)
- Required: address, city, postal code, property type, units, ownership %, rental start date, purchase date, purchase price
- Optional: rental end date, mortgage details

### **3. Add Transactions**
- Manual entry form
- AI suggests category with confidence
- Link receipt (if uploaded)

### **4. Upload Receipts**
- Drag-and-drop or file picker
- OCR extracts text
- Link to transaction (manual)

### **5. Generate T776**
- Select property
- Select tax year
- Click "Generate Draft"
- View PDF preview
- Download PDF

### **6. Create Accountant Pack**
- Select property
- Select tax year
- Click "Download Pack"
- ZIP file downloads

### **7. Generate Notice**
- Select property
- Choose notice type (N1 or N4)
- Fill in tenant details
- Download PDF

---

## 🎯 MVP Success Criteria

**Must have:**
1. ✅ User can add property with ownership % and rental dates
2. ✅ User can manually add transactions with AI category suggestions
3. ✅ User can upload receipts and link to transactions
4. ✅ User can generate T776 PDF with correct proration
5. ✅ User can download accountant pack ZIP
6. ✅ User can generate N1/N4 notice PDFs
7. ✅ All data is encrypted and RLS-protected
8. ✅ Audit logs track all user actions

**Nice to have (but not required):**
- Bulk transaction entry
- Receipt auto-matching
- Email notifications
- Mobile-responsive design

---

## 🚫 Explicitly NOT in MVP

1. ❌ Bank account sync (Plaid)
2. ❌ Co-owner collaboration
3. ❌ AI chat assistant
4. ❌ Advanced CCA (equipment, half-year rule)
5. ❌ Business income detection
6. ❌ Multi-property T776 generation
7. ❌ E-filing to CRA
8. ❌ Mobile app
9. ❌ Dashboard analytics/charts
10. ❌ Tenant portal

---

## 📅 MVP Timeline Estimate

**Phase 1: Foundation (2 weeks)**
- Supabase setup (auth, database, storage)
- Database schema creation
- RLS policies
- Basic UI components

**Phase 2: Core Features (4 weeks)**
- Property management
- Transaction inbox
- Receipt vault
- T776 generation

**Phase 3: Secondary Features (2 weeks)**
- Accountant packs
- Ontario notices
- AI categorization

**Phase 4: Polish & Testing (2 weeks)**
- Security audit
- User testing
- Bug fixes
- Documentation

**Total: ~10 weeks (2.5 months)**

---

## 💰 MVP Cost Estimate

**Development:**
- 1 full-stack developer × 10 weeks × $5,000/week = **$50,000**

**Infrastructure (monthly):**
- Supabase Pro: $25/month
- OpenAI API: ~$50/month (for categorization)
- Domain + hosting: $20/month
- **Total: ~$95/month**

**Year 1 Total: $50,000 + ($95 × 12) = **$51,140**

---

## 🎨 Design Assets Available

All design mockups exist at:
- `/dashboard` - Financial overview
- `/properties` - Property management
- `/transactions` - Transaction inbox
- `/receipts` - Receipt vault
- `/reports` - T776 generation
- `/designs/onboarding-simple` - Property setup wizard (design-only)

**Status:** All pages are fully designed with Tailwind CSS. Ready for backend integration.

---

## 📦 Deliverables

**MVP Launch:**
1. Working web application (northfile.ca)
2. User authentication
3. 8 core capabilities (listed above)
4. Database with RLS
5. Basic documentation
6. Privacy policy & terms

**Not Delivered:**
- Mobile apps
- Advanced AI features
- Co-owner collaboration
- Bank sync
- Multi-province support

---

**This MVP gets Ontario landlords 80% of the value with 20% of the complexity.** 🎯
