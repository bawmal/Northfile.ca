import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog-data";
import { Metadata } from "next";

// Generate SEO metadata for blog posts
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found | Northfile',
      description: 'The requested blog post could not be found.',
    };
  }

  const baseUrl = 'https://northfile.ca';
  const url = `${baseUrl}/blog/${post.slug}`;

  return {
    title: `${post.title} | Northfile Blog`,
    description: post.excerpt,
    keywords: post.keywords?.join(', '),
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: url,
      siteName: 'Northfile',
      images: [
        {
          url: post.image,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
      locale: 'en_CA',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      authors: post.author ? [post.author] : undefined,
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Blog posts data
const blogPosts = {
  "how-to-prepare-t776-ontario-rental-taxes": {
    title: "How to Prepare a T776 in Ontario: Rental Taxes Without the Year-End Scramble",
    excerpt: "If you own a rental property in Ontario, tax season probably feels familiar. This guide explains how Ontario landlords can prepare their T776 rental income form, track deductions properly, and avoid last-minute stress every spring.",
    category: "Tax Forms",
    date: "February 11, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop",
    content: `<p>If you own a rental property in Ontario, tax season probably feels familiar.</p>
<p>March arrives and suddenly you're:</p>
<ul>
<li>exporting CSV files from your bank</li>
<li>searching for receipts</li>
<li>calculating mortgage interest</li>
<li>trying to remember repairs from last summer</li>
<li>emailing your accountant repeatedly</li>
<li>worrying you missed something</li>
</ul>
<p>This guide explains how Ontario landlords can prepare their T776 rental income form, track deductions properly, and avoid last-minute stress every spring.</p>

<h2>What Is the T776 Rental Income Form in Ontario?</h2>
<p>The T776 is the tax form used to report rental income and expenses from residential or commercial property.</p>
<p>It includes:</p>
<ul>
<li>rent collected</li>
<li>mortgage interest (not principal)</li>
<li>property taxes</li>
<li>utilities</li>
<li>condo fees</li>
<li>insurance</li>
<li>repairs and maintenance</li>
<li>advertising</li>
<li>professional fees</li>
<li>capital cost allowance (CCA)</li>
</ul>
<p>Each property — and sometimes each owner — must be handled separately.</p>
<p>Mistakes can lead to:</p>
<ul>
<li>reassessments</li>
<li>missing deductions</li>
<li>incorrect capital-gain calculations later</li>
<li>expensive follow-ups with accountants</li>
</ul>

<h2>How Ontario Landlords Prepare T776 Forms Today</h2>
<p>Most small landlords rely on:</p>
<ul>
<li>spreadsheets</li>
<li>separate bank accounts</li>
<li>manual categorization</li>
<li>pivot tables</li>
<li>end-of-year cleanup sessions</li>
</ul>
<p>Some people update things monthly and feel in control.</p>
<p>Others wait until tax season — which is when things become painful.</p>
<p>A consistent theme:</p>
<p><strong>Recurring bills are easy.</strong><br />
Mortgage payments, utilities, condo fees, property taxes.</p>
<p><strong>Non-recurring expenses get missed.</strong><br />
Repairs, appliances, special assessments, emergency plumbers.</p>
<p>Those forgotten costs quietly reduce your deductions.</p>

<h2>Why Rental Portfolios Get Harder to Manage as They Grow</h2>
<p>Spreadsheets work… until complexity creeps in.</p>
<p>Things get harder when you have:</p>
<ul>
<li>multiple properties</li>
<li>co-owners</li>
<li>partial-year rentals</li>
<li>refinancing</li>
<li>variable-rate mortgages</li>
<li>renovations</li>
<li>condo portfolios</li>
<li>rent increases or arrears</li>
</ul>
<p>Suddenly you're dealing with:</p>
<ul>
<li>ownership splits</li>
<li>proration rules</li>
<li>mortgage interest reconciliations</li>
<li>separate forms per owner</li>
<li>audit documentation</li>
</ul>
<p>This is when many landlords start paying accountants just to clean things up.</p>

<h2>The Calm Way to Prepare Rental Taxes: Track Lightly All Year</h2>
<p>The landlords who feel relaxed in April usually didn't wait until April.</p>
<p>They:</p>
<ul>
<li>log transactions monthly</li>
<li>keep digital receipts</li>
<li>note repairs when they happen</li>
<li>separate personal vs rental periods</li>
<li>review summaries occasionally</li>
<li>hand their accountant a clean export pack</li>
</ul>
<p>Instead of scrambling once a year, they spread the work across twelve months.</p>
<p>That single change removes most of the stress.</p>

<h2>What Northfile Is Building for Ontario Landlords</h2>
<p>Northfile is designed specifically for Ontario rental compliance.</p>
<p>Instead of scattered spreadsheets, Northfile helps landlords:</p>
<ul>
<li>track multiple properties in one place</li>
<li>categorize transactions using tax-ready categories</li>
<li>upload and match receipts</li>
<li>manage co-ownership correctly</li>
<li>split partial-year rentals</li>
<li>estimate mortgage interest during the year</li>
<li>reconcile official lender statements at filing time</li>
<li>generate draft T776 forms</li>
<li>prepare accountant-ready export packs</li>
<li>generate Ontario rent notices like N1 and N4</li>
</ul>
<p>Our focus is simple:</p>
<ul>
<li>reduce year-end chaos</li>
<li>prevent costly mistakes</li>
<li>make working with your accountant effortless</li>
</ul>

<h2>Who Northfile Is For</h2>
<p>Northfile is built for:</p>
<ul>
<li>Ontario landlords with growing portfolios</li>
<li>condo investors</li>
<li>co-owned properties</li>
<li>people who hate spreadsheets</li>
<li>landlords who work with accountants</li>
<li>anyone tired of tax-season panic</li>
</ul>
<p>If your rentals are starting to feel complicated, that's usually the moment software begins paying for itself.</p>

<h2>Get Ready Before Tax Season Hits</h2>
<p>Tax deadlines don't move.</p>
<p>The landlords who feel prepared in April usually started organizing long before then.</p>
<p>If you'd like to see what an Ontario-specific T776 workflow looks like, you can visit Northfile.ca and join the Ontario launch cohort.</p>
<p>Early users get priority access as we roll out province-by-province.</p>

<h2>Final Thought</h2>
<p>Spreadsheets aren't wrong.</p>
<p>They're just fragile.</p>
<p>Once rental portfolios involve co-owners, renovations, refinancing, or multiple properties, having a system built specifically for Ontario compliance can save time, money, and a lot of stress.</p>`
  },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts[slug as keyof typeof blogPosts];
  const postData = getPostBySlug(slug);
  
  if (!post || !postData) {
    notFound();
  }

  // Structured data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": postData.title,
    "description": postData.excerpt,
    "image": postData.image,
    "datePublished": new Date(postData.date).toISOString(),
    "dateModified": new Date(postData.date).toISOString(),
    "author": {
      "@type": "Organization",
      "name": postData.author || "Northfile Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Northfile",
      "logo": {
        "@type": "ImageObject",
        "url": "https://northfile.ca/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://northfile.ca/blog/${postData.slug}`
    },
    "keywords": postData.keywords?.join(', ')
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
              Northfile
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Home</Link>
              <Link href="/blog" className="text-sm font-semibold text-blue-600">Blog</Link>
              <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-slate-900">FAQ</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Blog-focused navigation - no product CTAs */}
          </div>
        </div>
      </header>

      {/* Back to Blog */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 border-b border-slate-200/60">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="mb-8">
            <span className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-8 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-slate-500 mb-10">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-10">
            <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 rounded-lg font-semibold transition-all shadow-sm hover:shadow">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-lg font-semibold transition-all shadow-sm hover:shadow">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden mb-16 shadow-2xl ring-1 ring-slate-900/5">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="space-y-12">
            <div className="text-xl text-slate-600 leading-relaxed space-y-5 border-l-4 border-blue-500 pl-6 bg-gradient-to-r from-blue-50/50 to-transparent py-6 rounded-r-lg">
              <p>If you own a rental property in Ontario, tax season probably feels familiar.</p>
              <p>March arrives and suddenly you're:</p>
              <ul className="list-disc pl-6 space-y-2 text-lg">
                <li>exporting CSV files from your bank</li>
                <li>searching for receipts</li>
                <li>calculating mortgage interest</li>
                <li>trying to remember repairs from last summer</li>
                <li>emailing your accountant repeatedly</li>
                <li>worrying you missed something</li>
              </ul>
              <p>This guide explains how Ontario landlords can prepare their T776 rental income form, track deductions properly, and avoid last-minute stress every spring.</p>
            </div>

            <div className="border-t-2 border-slate-200 pt-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">What Is the T776 Rental Income Form in Ontario?</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>The T776 is the tax form used to report rental income and expenses from residential or commercial property.</p>
                <p className="font-semibold text-slate-900">It includes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>rent collected</li>
                  <li>mortgage interest (not principal)</li>
                  <li>property taxes</li>
                  <li>utilities</li>
                  <li>condo fees</li>
                  <li>insurance</li>
                  <li>repairs and maintenance</li>
                  <li>advertising</li>
                  <li>professional fees</li>
                  <li>capital cost allowance (CCA)</li>
                </ul>
                <p>Each property — and sometimes each owner — must be handled separately.</p>
                <p className="font-semibold text-slate-900">Mistakes can lead to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>reassessments</li>
                  <li>missing deductions</li>
                  <li>incorrect capital-gain calculations later</li>
                  <li>expensive follow-ups with accountants</li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">How Ontario Landlords Prepare T776 Forms Today</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>Most small landlords rely on:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>spreadsheets</li>
                  <li>separate bank accounts</li>
                  <li>manual categorization</li>
                  <li>pivot tables</li>
                  <li>end-of-year cleanup sessions</li>
                </ul>
                <p>Some people update things monthly and feel in control.</p>
                <p>Others wait until tax season — which is when things become painful.</p>
                <p>A consistent theme:</p>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border-l-4 border-blue-600 p-6 my-8 rounded-r-lg shadow-sm">
                  <p className="font-bold text-blue-900 mb-2">👉 Recurring bills are easy.</p>
                  <p className="text-blue-800">Mortgage payments, utilities, condo fees, property taxes.</p>
                </div>
                <div className="bg-gradient-to-r from-orange-50 to-orange-100/50 border-l-4 border-orange-600 p-6 my-8 rounded-r-lg shadow-sm">
                  <p className="font-bold text-orange-900 mb-2">👉 Non-recurring expenses get missed.</p>
                  <p className="text-orange-800">Repairs, appliances, special assessments, emergency plumbers.</p>
                </div>
                <p>Those forgotten costs quietly reduce your deductions.</p>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">Why Rental Portfolios Get Harder to Manage as They Grow</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>Spreadsheets work… until complexity creeps in.</p>
                <p className="font-semibold text-slate-900">Things get harder when you have:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>multiple properties</li>
                  <li>co-owners</li>
                  <li>partial-year rentals</li>
                  <li>refinancing</li>
                  <li>variable-rate mortgages</li>
                  <li>renovations</li>
                  <li>condo portfolios</li>
                  <li>rent increases or arrears</li>
                </ul>
                <p className="font-semibold text-slate-900">Suddenly you're dealing with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>ownership splits</li>
                  <li>proration rules</li>
                  <li>mortgage interest reconciliations</li>
                  <li>separate forms per owner</li>
                  <li>audit documentation</li>
                </ul>
                <p>This is when many landlords start paying accountants just to clean things up.</p>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">The Calm Way to Prepare Rental Taxes: Track Lightly All Year</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>The landlords who feel relaxed in April usually didn't wait until April.</p>
                <p>They:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>log transactions monthly</li>
                  <li>keep digital receipts</li>
                  <li>note repairs when they happen</li>
                  <li>separate personal vs rental periods</li>
                  <li>review summaries occasionally</li>
                  <li>hand their accountant a clean export pack</li>
                </ul>
                <p>Instead of scrambling once a year, they spread the work across twelve months.</p>
                <p className="font-semibold text-slate-900">That single change removes most of the stress.</p>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">What Northfile Is Building for Ontario Landlords</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>Northfile is designed specifically for Ontario rental compliance.</p>
                <p>Instead of scattered spreadsheets, Northfile helps landlords:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>track multiple properties in one place</li>
                  <li>categorize transactions using tax-ready categories</li>
                  <li>upload and match receipts</li>
                  <li>manage co-ownership correctly</li>
                  <li>split partial-year rentals</li>
                  <li>estimate mortgage interest during the year</li>
                  <li>reconcile official lender statements at filing time</li>
                  <li>generate draft T776 forms</li>
                  <li>prepare accountant-ready export packs</li>
                  <li>generate Ontario rent notices like N1 and N4</li>
                </ul>
                <div className="bg-gradient-to-r from-slate-100 to-slate-200/50 border-l-4 border-slate-600 p-6 my-8 rounded-r-lg shadow-sm">
                  <p className="font-bold text-slate-900 mb-3">Our focus is simple:</p>
                  <ul className="space-y-2 text-slate-800">
                    <li>👉 reduce year-end chaos</li>
                    <li>👉 prevent costly mistakes</li>
                    <li>👉 make working with your accountant effortless</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">Who Northfile Is For</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>Northfile is built for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ontario landlords with growing portfolios</li>
                  <li>condo investors</li>
                  <li>co-owned properties</li>
                  <li>people who hate spreadsheets</li>
                  <li>landlords who work with accountants</li>
                  <li>anyone tired of tax-season panic</li>
                </ul>
                <p>If your rentals are starting to feel complicated, that's usually the moment software begins paying for itself.</p>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">Get Ready Before Tax Season Hits</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>Tax deadlines don't move.</p>
                <p>The landlords who feel prepared in April usually started organizing long before then.</p>
                <p>If you'd like to see what an Ontario-specific T776 workflow looks like, you can visit Northfile.ca and join the Ontario launch cohort.</p>
                <p>Early users get priority access as we roll out province-by-province.</p>
              </div>
            </div>

            <div className="border-t-2 border-slate-200 pt-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">Final Thought</h2>
              <div className="space-y-5 text-lg text-slate-700 leading-relaxed">
                <p>Spreadsheets aren't wrong.</p>
                <p>They're just fragile.</p>
                <p>Once rental portfolios involve co-owners, renovations, refinancing, or multiple properties, having a system built specifically for Ontario compliance can save time, money, and a lot of stress.</p>
              </div>
            </div>
          </div>

          {/* Waitlist CTA */}
          <div className="mt-20 border-t-2 border-slate-200 pt-16">
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-10 md:p-12 shadow-xl border border-blue-200/60 text-center">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
                Ready to Simplify Your Rental Taxes?
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-2xl mx-auto">
                Join 200+ Ontario landlords on the waitlist. Be the first to experience Northfile when we launch in Q2 2026.
              </p>
              <Link
                href="/#waitlist"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-sm text-slate-500 mt-6">
                ✓ No payment required • ✓ Early access pricing • ✓ Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
