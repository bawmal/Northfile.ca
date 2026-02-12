# Waitlist Setup Guide

## Overview
The waitlist system stores user signups in a Supabase database and provides an API endpoint for form submissions.

## Database Setup

### 1. Run the SQL Schema
Execute the waitlist table creation from `DATABASE_SCHEMA.sql` in your Supabase SQL Editor:

```sql
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

CREATE INDEX idx_waitlist_email ON waitlist(email);
CREATE INDEX idx_waitlist_created_at ON waitlist(created_at DESC);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON waitlist FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view waitlist"
  ON waitlist FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.email IN ('admin@northfile.ca', 'your-admin-email@example.com')
    )
  );
```

### 2. Configure Environment Variables
Add these to your `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

**Where to find these:**
- Go to your Supabase project dashboard
- Navigate to Settings > API
- Copy the Project URL, anon/public key, and service_role key

## API Endpoint

### POST `/api/waitlist`
Adds a new user to the waitlist.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "propertiesCount": "3-5",
  "currentSolution": "spreadsheet"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Successfully joined the waitlist!",
  "data": {
    "id": "uuid",
    "email": "john@example.com",
    "created_at": "2026-02-11T19:00:00Z"
  }
}
```

**Error Responses:**
- `400`: Missing required fields or invalid email format
- `409`: Email already exists on waitlist
- `500`: Server error

### GET `/api/waitlist`
Returns the total count of waitlist signups (public).

**Response (200):**
```json
{
  "count": 203,
  "message": "203 landlords on the waitlist"
}
```

## Frontend Integration

The waitlist form on the main page (`/`) automatically:
- ✅ Validates required fields (first name, last name, email)
- ✅ Shows loading state while submitting
- ✅ Displays success message on successful signup
- ✅ Shows error messages for duplicate emails or failures
- ✅ Resets form after successful submission

## Viewing Waitlist Data

### Option 1: Supabase Dashboard
1. Go to your Supabase project
2. Navigate to Table Editor
3. Select the `waitlist` table
4. View all signups with filters and export options

### Option 2: SQL Query
Run this in Supabase SQL Editor:

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

### Option 3: Export to CSV
```sql
COPY (
  SELECT * FROM waitlist ORDER BY created_at DESC
) TO '/tmp/waitlist.csv' WITH CSV HEADER;
```

## Security Features

- ✅ **Row Level Security (RLS)**: Enabled on waitlist table
- ✅ **Public Insert**: Anyone can join the waitlist
- ✅ **Admin-Only Read**: Only specified admin emails can view waitlist data
- ✅ **Email Validation**: Server-side regex validation
- ✅ **Duplicate Prevention**: Checks for existing emails before inserting
- ✅ **Rate Limiting**: Consider adding rate limiting in production

## Monitoring & Analytics

Track waitlist growth with this query:

```sql
SELECT 
  DATE(created_at) as signup_date,
  COUNT(*) as signups,
  COUNT(*) OVER (ORDER BY DATE(created_at)) as cumulative_total
FROM waitlist
GROUP BY DATE(created_at)
ORDER BY signup_date DESC;
```

## Next Steps

1. **Email Notifications**: Set up automated welcome emails using SendGrid
2. **Admin Dashboard**: Create a protected admin page to view/export waitlist
3. **Analytics**: Track conversion rates and signup sources
4. **A/B Testing**: Test different CTAs and form fields
5. **Integration**: Connect to email marketing tools (Mailchimp, ConvertKit)

## Troubleshooting

**Form not submitting:**
- Check browser console for errors
- Verify Supabase environment variables are set
- Ensure database table is created
- Check RLS policies are enabled

**Duplicate email errors:**
- This is expected behavior to prevent spam
- Users should see a clear error message

**500 errors:**
- Check Supabase service role key is correct
- Verify database connection
- Check server logs for detailed error messages
