import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { getPublishedPosts, getCategories } from "@/lib/blog-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - Ontario Landlord Tax & Compliance Resources | Northfile",
  description: "Expert guides on T776 forms, rental tax deductions, CRA compliance, and landlord best practices for Ontario property owners.",
  keywords: "Ontario landlord blog, T776 guide, rental tax tips, CRA compliance, landlord resources",
  openGraph: {
    title: "Northfile Blog - Ontario Landlord Resources",
    description: "Expert guides on T776 forms, rental tax deductions, and landlord compliance for Ontario property owners.",
    url: "https://northfile.ca/blog",
    siteName: "Northfile",
    type: "website",
    locale: "en_CA",
  },
  alternates: {
    canonical: "https://northfile.ca/blog",
  },
};

export default function BlogPage() {
  const posts = getPublishedPosts();

  const categories = ["All Posts", "Tax Tips", "Tax Forms", "Tax Strategy", "Landlord Law", "Record Keeping"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
              Northfile
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900">Home</Link>
              <Link href="/blog" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Blog</Link>
              <Link href="/faq" className="text-sm font-medium text-slate-600 hover:text-slate-900">FAQ</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Blog-focused navigation - no product CTAs */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">Northfile Blog</h1>
            <p className="text-xl text-blue-50 mb-10 leading-relaxed">
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
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60 hover:shadow-3xl transition-all hover:-translate-y-1 duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-80 md:h-auto">
                <img
                  src={posts[0].image}
                  alt={posts[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-lg">
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
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4 leading-tight">
                  {posts[0].title}
                </h2>
                <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                  {posts[0].excerpt}
                </p>
                <Link
                  href={`/blog/${posts[0].slug}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all group"
                >
                  Read Full Article
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 backdrop-blur-sm text-slate-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
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
        <div className="mt-16 text-center">
          <button className="border-2 border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-slate-700 px-10 py-3.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow">
            Load More Articles
          </button>
        </div>
      </main>

      {/* Waitlist CTA */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg">Ready to Simplify Your Rental Taxes?</h2>
          <p className="text-xl text-blue-50 leading-relaxed mb-10 max-w-2xl mx-auto">
            Join 200+ Ontario landlords on the waitlist. Be the first to experience Northfile when we launch in Q2 2026.
          </p>
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-blue-600 px-10 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Join the Waitlist
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-sm text-blue-100 mt-6">
            ✓ No payment required • ✓ Early access pricing • ✓ Cancel anytime
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
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/#features" className="hover:text-white">Features</Link></li>
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
