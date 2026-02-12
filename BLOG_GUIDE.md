# Blog Management Guide

## Overview
The Northfile blog system is designed to be easily extendable and SEO-optimized. All blog data is centralized in a single location for easy management.

## Adding a New Blog Post

### Step 1: Add Post Data
Edit `/src/lib/blog-data.ts` and add your new post to the `blogPosts` array:

```typescript
{
  slug: "your-post-slug",
  title: "Your Post Title",
  excerpt: "A brief description of your post (150-160 characters for SEO)",
  category: "Tax Forms", // or "Tax Tips", "Tax Strategy", "Landlord Law", "Record Keeping"
  date: "Month DD, YYYY",
  readTime: "X min read",
  image: "https://images.unsplash.com/...", // 1200x600px recommended
  author: "Northfile Team",
  keywords: ["keyword1", "keyword2", "keyword3"], // SEO keywords
  published: true, // Set to false to hide the post
}
```

### Step 2: Add Post Content
Edit `/src/app/blog/[slug]/page.tsx` and add your post content to the `blogPosts` object:

```typescript
"your-post-slug": {
  title: "Your Post Title",
  excerpt: "Same excerpt as in blog-data.ts",
  category: "Tax Forms",
  date: "Month DD, YYYY",
  readTime: "X min read",
  image: "https://images.unsplash.com/...",
  content: `<p>Your content here...</p>`
}
```

### Step 3: Create the JSX Content
In the same file, add your structured content in the JSX section (around line 300+). Follow the existing pattern:

```tsx
<div className="border-t border-slate-200 pt-8">
  <h2 className="text-3xl font-bold text-slate-900 mb-6">Your Section Title</h2>
  <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
    <p>Your paragraph content...</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  </div>
</div>
```

## SEO Features

### Automatic SEO Optimization
Every blog post automatically includes:

1. **Meta Tags**
   - Title tag with post title
   - Meta description from excerpt
   - Keywords from keywords array

2. **Open Graph Tags** (for social media)
   - og:title
   - og:description
   - og:image (1200x600px)
   - og:type (article)
   - og:url (canonical URL)

3. **Twitter Card Tags**
   - twitter:card (summary_large_image)
   - twitter:title
   - twitter:description
   - twitter:image

4. **Structured Data (JSON-LD)**
   - BlogPosting schema
   - Author information
   - Publisher information
   - Publication date
   - Keywords

5. **Sitemap**
   - Automatically updated with new posts
   - Proper lastModified dates
   - SEO-friendly priorities

## Best Practices

### SEO Guidelines
1. **Title**: 50-60 characters, include main keyword
2. **Excerpt**: 150-160 characters, compelling and keyword-rich
3. **Keywords**: 5-8 relevant keywords, include long-tail variations
4. **Image**: 1200x600px, relevant to content
5. **Content**: 1000+ words for better SEO ranking
6. **Headings**: Use H2 for main sections, H3 for subsections
7. **Internal Links**: Link to other relevant blog posts and pages

### Content Structure
1. **Introduction**: Hook the reader, state the problem
2. **Main Content**: Break into clear sections with H2 headings
3. **Lists**: Use bullet points for easy scanning
4. **Callouts**: Use colored boxes for important information
5. **Conclusion**: Summarize key points, include CTA

### Visual Elements
- **Highlighted Boxes**: Use for key insights
  ```tsx
  <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
    <p className="font-bold text-blue-900 mb-2">Key Point</p>
    <p className="text-blue-800">Explanation...</p>
  </div>
  ```

## Extensibility

### Adding New Categories
1. Update the `categories` array in `/src/app/blog/page.tsx`
2. Add the category to new posts in `/src/lib/blog-data.ts`

### Filtering by Category
The system includes helper functions:
- `getPublishedPosts()` - Get all published posts
- `getPostBySlug(slug)` - Get a specific post
- `getPostsByCategory(category)` - Get posts by category
- `getCategories()` - Get all unique categories

### Draft Posts
Set `published: false` in the blog data to hide a post while working on it.

## File Structure
```
src/
├── lib/
│   └── blog-data.ts          # Centralized blog data
├── app/
│   ├── blog/
│   │   ├── page.tsx           # Blog index page
│   │   └── [slug]/
│   │       └── page.tsx       # Individual blog post page
│   └── sitemap.ts             # Auto-generated sitemap
```

## Testing Checklist
- [ ] Post appears on blog index
- [ ] Post loads at `/blog/your-slug`
- [ ] Meta tags are correct (view page source)
- [ ] Open Graph tags work (test with Facebook debugger)
- [ ] Twitter card works (test with Twitter card validator)
- [ ] Structured data is valid (test with Google Rich Results Test)
- [ ] Post appears in sitemap.xml
- [ ] Images load correctly
- [ ] Internal links work
- [ ] Mobile responsive

## SEO Tools
- **Google Search Console**: Submit sitemap, monitor indexing
- **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
