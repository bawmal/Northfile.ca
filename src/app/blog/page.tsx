import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      slug: "landlord-tax-deductions-ontario-2024",
      title: "Complete Guide to Landlord Tax Deductions in Ontario (2024)",
      excerpt: "Maximize your rental property deductions with this comprehensive guide to CRA-approved expenses for Ontario landlords.",
      category: "Tax Tips",
      date: "February 1, 2024",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop",
    },
    {
      slug: "t776-form-guide-rental-income",
      title: "How to Fill Out Form T776: Statement of Real Estate Rentals",
      excerpt: "Step-by-step walkthrough of completing your T776 form, including common mistakes to avoid and line-by-line explanations.",
      category: "Tax Forms",
      date: "January 28, 2024",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
    },
    {
      slug: "capital-cost-allowance-rental-property",
      title: "Understanding Capital Cost Allowance (CCA) for Rental Properties",
      excerpt: "Learn when to claim CCA, how to calculate it, and why you might want to avoid claiming it on your rental property.",
      category: "Tax Strategy",
      date: "January 25, 2024",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop",
    },
    {
      slug: "ontario-rta-notice-requirements",
      title: "Ontario RTA Notice Requirements: N1, N4, and More",
      excerpt: "Complete guide to serving legal notices to tenants in Ontario, including timelines, formats, and common pitfalls.",
      category: "Landlord Law",
      date: "January 22, 2024",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
    },
    {
      slug: "rental-expense-categories-cra",
      title: "Rental Expense Categories: What the CRA Allows You to Deduct",
      excerpt: "Detailed breakdown of all CRA-approved rental expense categories with real-world examples and documentation requirements.",
      category: "Tax Tips",
      date: "January 18, 2024",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&h=400&fit=crop",
    },
    {
      slug: "organizing-rental-receipts-cra-audit",
      title: "How to Organize Rental Receipts for CRA Audits",
      excerpt: "Best practices for receipt management, digital storage, and what documentation the CRA requires during an audit.",
      category: "Record Keeping",
      date: "January 15, 2024",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=400&fit=crop",
    },
  ];

  const categories = ["All Posts", "Tax Tips", "Tax Forms", "Tax Strategy", "Landlord Law", "Record Keeping"];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
              Northfile
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</Link>
              <Link href="/properties" className="text-sm font-medium text-slate-600 hover:text-slate-900">Properties</Link>
              <Link href="/blog" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Blog</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Sign In</Link>
            <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Northfile Blog</h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Tax tips, landlord guides, and rental property insights for Ontario property owners. 
              Learn how to maximize deductions, stay compliant, and simplify your tax filing.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-colors ${
                  index === 0
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Featured Post */}
        <div className="mb-16">
          <p className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wide">Featured Article</p>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-200 hover:shadow-2xl transition-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-80 md:h-auto">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {posts[0].category}
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{posts[0].date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{posts[0].readTime}</span>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {posts[0].title}
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                >
                  Read Full Article
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 hover:shadow-2xl transition-shadow group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Articles
          </button>
        </div>
      </main>

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest tax tips and landlord guides delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
            <button className="bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold mb-4">Northfile</h3>
              <p className="text-sm text-slate-400">
                Tax compliance made simple for Ontario landlords.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/properties" className="hover:text-white">Properties</Link></li>
                <li><Link href="/transactions" className="hover:text-white">Transactions</Link></li>
                <li><Link href="/receipts" className="hover:text-white">Receipts</Link></li>
                <li><Link href="/reports" className="hover:text-white">Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white">Guides</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 Northfile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
