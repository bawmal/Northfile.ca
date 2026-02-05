# Northfile MVP - Setup Instructions

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new project (choose a region close to you)
4. Wait for project to be ready (~2 minutes)

---

## Step 2: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `DATABASE_SCHEMA.sql`
4. Paste into the SQL editor
5. Click "Run" (bottom right)
6. Verify all tables were created (check "Table Editor" tab)

**Expected tables:**
- profiles
- properties
- mortgages
- transactions
- receipts
- t776_drafts
- notices
- audit_logs

---

## Step 3: Create Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click "Create a new bucket"
3. Name: `receipts`
4. Public: **OFF** (keep private)
5. Click "Create bucket"

---

## Step 4: Configure Environment Variables

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** and **anon/public key**
3. Create `.env.local` file in project root:

```bash
cp .env.local.example .env.local
```

4. Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
OPENAI_API_KEY=your-openai-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Step 5: Install Dependencies

```bash
npm install
```

---

## Step 6: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Step 7: Test Authentication

1. Go to `/auth/signup`
2. Create a test account
3. Verify you can sign in
4. Check Supabase dashboard → Authentication → Users

---

## Next Steps

Once setup is complete, we'll build:
1. ✅ Database schema (DONE)
2. 🔄 Authentication pages
3. 🔄 Property management
4. 🔄 Transaction inbox
5. 🔄 Receipt vault
6. 🔄 T776 generation

---

## Troubleshooting

**Error: "Invalid API key"**
- Check `.env.local` has correct Supabase URL and keys
- Restart dev server after changing env vars

**Error: "relation does not exist"**
- Run `DATABASE_SCHEMA.sql` again in Supabase SQL Editor
- Check all tables exist in Table Editor

**Error: "Row Level Security policy violation"**
- RLS policies are enabled - this is correct
- Make sure you're authenticated before accessing data

---

## Development Workflow

1. Make changes to code
2. Test in browser (auto-reloads)
3. Check Supabase logs for errors
4. Commit changes to git

**Ready to start building!** 🚀
