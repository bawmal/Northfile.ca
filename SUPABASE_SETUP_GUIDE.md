# Supabase Setup Guide for Northfile

This guide will walk you through setting up Supabase for the Northfile waitlist system.

## Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign Up"**
3. Sign up with:
   - GitHub account (recommended)
   - Google account
   - Email/password

## Step 2: Create a New Project

1. After signing in, click **"New Project"**
2. Fill in the project details:
   - **Name**: `northfile` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., `US East (North Virginia)` for North America)
   - **Pricing Plan**: Start with **Free** (includes 500MB database, 1GB file storage, 50,000 monthly active users)
3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to be provisioned

## Step 3: Get Your API Keys

1. Once your project is ready, go to **Settings** (gear icon in sidebar)
2. Click **API** in the settings menu
3. You'll see your credentials:

   **Copy these values:**
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (long string)
   - **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (different long string)

   ⚠️ **Important**: Keep the `service_role` key secret! Never commit it to Git or expose it in client-side code.

## Step 4: Add Environment Variables

1. In your Northfile project, create or edit `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

2. Replace the placeholder values with your actual keys from Step 3

3. **Important**: Make sure `.env.local` is in your `.gitignore` file (it should be by default)

## Step 5: Create the Waitlist Table

1. In your Supabase dashboard, click **SQL Editor** in the sidebar
2. Click **"New query"**
3. Copy and paste this SQL code:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create waitlist table
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

-- Create indexes for performance
CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (join waitlist)
CREATE POLICY "Anyone can join waitlist"
  ON waitlist FOR INSERT
  WITH CHECK (true);

-- Only allow reading if you're an admin (update with your email)
CREATE POLICY "Admins can view waitlist"
  ON waitlist FOR SELECT
  USING (
    auth.uid() IS NOT NULL
  );
```

4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. You should see: **"Success. No rows returned"**

## Step 6: Verify the Table

1. Click **Table Editor** in the sidebar
2. You should see the `waitlist` table listed
3. Click on it to view the empty table with columns:
   - id
   - first_name
   - last_name
   - email
   - properties_count
   - current_solution
   - referral_source
   - created_at

## Step 7: Install Supabase Client (if needed)

The Supabase JavaScript client should already be in your `package.json`. If not, install it:

```bash
npm install @supabase/supabase-js
```

## Step 8: Test the Waitlist Form

1. Start your development server:
```bash
npm run dev
```

2. Open [http://localhost:3000](http://localhost:3000)

3. Scroll down to the **"Join the Waitlist"** section

4. Fill out the form with test data:
   - First Name: Test
   - Last Name: User
   - Email: test@example.com
   - Number of Properties: 1-2

5. Click **"Join the Waitlist"**

6. You should see: **"✓ Success! You've been added to the waitlist. We'll be in touch soon!"**

## Step 9: Verify Data in Supabase

1. Go back to Supabase dashboard
2. Click **Table Editor** > **waitlist**
3. You should see your test entry with all the data you submitted
4. The `created_at` timestamp should show the current time

## Step 10: View Waitlist Data

### Option A: Supabase Dashboard
- Go to **Table Editor** > **waitlist**
- View, filter, and sort all entries
- Export to CSV using the export button

### Option B: SQL Query
In the SQL Editor, run:

```sql
SELECT 
  first_name,
  last_name,
  email,
  properties_count,
  current_solution,
  created_at
FROM waitlist
ORDER BY created_at DESC;
```

### Option C: Get Count
```sql
SELECT COUNT(*) as total_signups FROM waitlist;
```

## Common Issues & Solutions

### Issue: "Failed to join waitlist"
**Solution**: 
- Check that environment variables are set correctly in `.env.local`
- Restart your dev server after adding env variables
- Verify the Supabase project is active (not paused)

### Issue: "Invalid API key"
**Solution**:
- Double-check you copied the full API key (they're very long)
- Make sure there are no extra spaces or line breaks
- Verify you're using the correct project URL

### Issue: "Row Level Security policy violation"
**Solution**:
- Make sure the RLS policies were created correctly
- The "Anyone can join waitlist" policy should allow INSERT operations
- Check the SQL Editor for any errors when creating policies

### Issue: Duplicate email error
**Solution**:
- This is expected behavior! The system prevents duplicate signups
- Use a different email for testing
- Or delete the test entry from Table Editor

## Security Best Practices

✅ **DO:**
- Keep `SUPABASE_SERVICE_ROLE_KEY` in `.env.local` (never commit to Git)
- Use the service role key only in server-side API routes
- Enable Row Level Security (RLS) on all tables
- Use the anon key for client-side operations

❌ **DON'T:**
- Commit `.env.local` to version control
- Expose the service role key in client-side code
- Disable RLS in production
- Share your API keys publicly

## Next Steps

1. ✅ **Update Admin Email**: In the RLS policy, replace the placeholder with your actual admin email
2. 📧 **Set up Email Notifications**: Configure SendGrid or Resend to send welcome emails
3. 📊 **Create Admin Dashboard**: Build a protected page to view/export waitlist data
4. 🚀 **Deploy to Production**: Deploy to Vercel/Netlify with production environment variables

## Useful Supabase Features

### Real-time Subscriptions
Monitor new signups in real-time:
```javascript
const subscription = supabase
  .from('waitlist')
  .on('INSERT', payload => {
    console.log('New signup!', payload.new)
  })
  .subscribe()
```

### Database Backups
- Free tier: Daily backups (7-day retention)
- Pro tier: Point-in-time recovery
- Access via: **Database** > **Backups**

### Monitoring
- View API usage: **Settings** > **Usage**
- Check logs: **Logs** > **API Logs**
- Monitor performance: **Database** > **Roles**

## Support Resources

- 📚 [Supabase Documentation](https://supabase.com/docs)
- 💬 [Discord Community](https://discord.supabase.com)
- 🎥 [Video Tutorials](https://www.youtube.com/c/supabase)
- 📧 [Email Support](https://supabase.com/support) (Pro plan)

## Pricing

**Free Tier** (Perfect for getting started):
- 500MB database space
- 1GB file storage
- 50,000 monthly active users
- 2GB bandwidth
- Unlimited API requests

**Pro Tier** ($25/month):
- 8GB database space
- 100GB file storage
- 100,000 monthly active users
- 50GB bandwidth
- Daily backups with 7-day retention
- Email support

You can start with the free tier and upgrade as you grow!

---

**You're all set!** 🎉 Your waitlist system is now connected to Supabase and ready to collect signups.
