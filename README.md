# Northfile - Ontario Landlord Tax & Compliance Prep

A modern SaaS platform helping Ontario landlords organize rental finances, categorize expenses to CRA lines, generate draft T776 forms, and create accountant-ready export packs.

## Features

- **Transaction Inbox**: Upload CSVs or sync your bank, categorize expenses to CRA lines
- **Draft T776 Generation**: Auto-generate watermarked draft T776 forms with CCA schedules
- **Accountant Collaboration**: Invite accountants for read-only access with comment threads
- **Ontario RTA Notices**: Generate RTA-compliant notice templates with prefilled data
- **Export Packs**: Comprehensive ZIP packs with ledgers, receipts, and audit trails
- **Property Management**: Track multiple properties, units, ownership splits, and mortgages

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **Backend**: Supabase (Postgres + Auth + Storage with RLS)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

### Build for Production

```bash
npm run build
npm start
```

## Security Architecture

- **Row-Level Security (RLS)** on all database tables
- **Private storage** with signed URLs (5-15 min expiry)
- **Org-scoped multi-tenancy** for data isolation
- **Role-based access control** (owner, accountant_read, accountant_comment)
- **Server-side PDF generation** with sanitization
- **Audit logging** for all sensitive operations
- **No sensitive data storage** (no SINs, bank credentials, CRA logins)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Landing page
│   └── globals.css         # Global styles
```

## MVP Scope

### In Scope
- Ontario-only (province-locked)
- Transaction categorization to CRA lines
- Draft T776 generation (watermarked, not filed)
- Ontario RTA notice templates
- Accountant collaboration (read-only invites)
- Export packs for accountants

### Out of Scope
- CRA e-filing
- Multi-province support
- Legal certification
- Mobile apps

## Target Users

- **Primary**: Small-scale investors (3-20 units), accidental landlords (1-2 units)
- **Secondary**: Rental-focused accountants and bookkeepers

## License

Proprietary - All rights reserved

## Contact

For early access, join our waitlist at [northfile.ca](https://northfile.ca)
