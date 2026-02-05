import { Calendar, Clock, ArrowLeft, Share2, Bookmark } from "lucide-react";
import Link from "next/link";

export default function BlogPostPage() {
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
              <Link href="/blog" className="text-sm font-semibold text-blue-600">Blog</Link>
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

      {/* Back to Blog */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-6">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              Tax Tips
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Complete Guide to Landlord Tax Deductions in Ontario (2024)
          </h1>
          
          <div className="flex items-center gap-6 text-slate-600 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>February 1, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>8 min read</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-8">
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg font-semibold transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg font-semibold transition-colors">
              <Bookmark className="w-4 h-4" />
              Save
            </button>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
            <img
              src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop"
              alt="Tax deductions guide"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              As an Ontario landlord, understanding which expenses you can deduct from your rental income is crucial for minimizing your tax burden. 
              This comprehensive guide covers all CRA-approved deductions for the 2024 tax year.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">What Are Rental Property Tax Deductions?</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Rental property tax deductions are expenses that the Canada Revenue Agency (CRA) allows you to subtract from your rental income 
              when calculating your taxable income. These deductions can significantly reduce the amount of tax you owe on your rental properties.
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-blue-900 mb-3">💡 Key Principle</h3>
              <p className="text-blue-800 mb-0">
                To be deductible, an expense must be <strong>reasonable</strong> and <strong>incurred to earn rental income</strong>. 
                Personal expenses or capital improvements are generally not deductible in the year incurred.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Common Deductible Expenses</h2>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Advertising</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              You can deduct the cost of advertising your rental property, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Online listing fees (Kijiji, Facebook Marketplace, Craigslist)</li>
              <li>Newspaper classified ads</li>
              <li>Rental agency fees for finding tenants</li>
              <li>Professional photography for listings</li>
              <li>Signage and "For Rent" signs</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Insurance</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Landlord insurance premiums are fully deductible, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Property insurance (fire, theft, liability)</li>
              <li>Rental income loss insurance</li>
              <li>Flood or earthquake insurance</li>
            </ul>

            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-yellow-900 mb-3">⚠️ Important Note</h3>
              <p className="text-yellow-800 mb-0">
                If you live in part of the property, you can only deduct the portion of insurance that relates to the rental unit. 
                For example, if you rent out a basement apartment that's 40% of your home's square footage, you can deduct 40% of your insurance premium.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Mortgage Interest</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              This is often the largest deduction for landlords. You can deduct:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Mortgage interest</strong> (NOT principal payments)</li>
              <li>Interest on loans used to purchase or improve the rental property</li>
              <li>Interest on lines of credit used for rental property expenses</li>
            </ul>

            <div className="bg-slate-100 border-2 border-slate-300 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">📊 Example Calculation</h3>
              <div className="space-y-2 text-slate-700">
                <p><strong>Monthly mortgage payment:</strong> $2,000</p>
                <p><strong>Principal portion:</strong> $800 (not deductible)</p>
                <p><strong>Interest portion:</strong> $1,200 (deductible)</p>
                <p className="pt-2 border-t-2 border-slate-400"><strong>Annual deduction:</strong> $1,200 × 12 = $14,400</p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Property Taxes</h3>
            <p className="text-slate-700 leading-relaxed mb-6">
              Municipal property taxes are fully deductible for rental properties. If you rent out part of your home, 
              you can deduct the proportionate share of property taxes.
            </p>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Utilities</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              If you pay for utilities that your tenant uses, you can deduct:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Electricity</li>
              <li>Natural gas or heating oil</li>
              <li>Water and sewer</li>
              <li>Internet (if included in rent)</li>
              <li>Cable TV (if included in rent)</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. Repairs and Maintenance</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Expenses to maintain your property in its current condition are deductible. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Painting and decorating</li>
              <li>Fixing leaks, broken windows, or damaged flooring</li>
              <li>Replacing worn-out appliances with similar models</li>
              <li>Lawn care and snow removal</li>
              <li>Pest control</li>
              <li>Cleaning between tenants</li>
            </ul>

            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-red-900 mb-3">🚫 Repairs vs. Improvements</h3>
              <p className="text-red-800 mb-3">
                <strong>Repairs</strong> maintain the property (deductible immediately). 
                <strong>Improvements</strong> add value or extend useful life (must be depreciated as Capital Cost Allowance).
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white rounded-lg p-3">
                  <p className="font-bold text-green-700 mb-2">✓ Repairs (Deductible)</p>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Fixing a broken furnace</li>
                    <li>• Repainting existing walls</li>
                    <li>• Replacing broken tiles</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <p className="font-bold text-red-700 mb-2">✗ Improvements (CCA)</p>
                  <ul className="space-y-1 text-slate-700">
                    <li>• Installing a new furnace</li>
                    <li>• Adding a new bathroom</li>
                    <li>• Finishing a basement</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Professional Fees</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              You can deduct fees paid to professionals for rental-related services:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Accountant fees for preparing your T776 form</li>
              <li>Legal fees for lease preparation or tenant disputes</li>
              <li>Property management fees (typically 8-10% of rent)</li>
              <li>Real estate agent fees for finding tenants</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. Office Expenses</h3>
            <p className="text-slate-700 leading-relaxed mb-4">
              Small office expenses related to managing your rental property:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Stationery and postage</li>
              <li>Accounting software (like Northfile!)</li>
              <li>Mileage for property-related trips</li>
              <li>Phone calls related to the rental</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">What You CANNOT Deduct</h2>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li><strong>Mortgage principal payments</strong> - Only interest is deductible</li>
              <li><strong>Land transfer tax</strong> - This is a capital cost, not an expense</li>
              <li><strong>Personal expenses</strong> - Even if you visit the property</li>
              <li><strong>Capital improvements</strong> - Must be claimed as CCA over time</li>
              <li><strong>Fines and penalties</strong> - Late payment penalties to CRA are not deductible</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">How to Track Your Deductions</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              The CRA requires you to keep all receipts and supporting documents for at least 6 years. Here's how to stay organized:
            </p>

            <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-green-900 mb-4">✓ Best Practices</h3>
              <ol className="list-decimal pl-6 space-y-3 text-green-800">
                <li><strong>Use dedicated software</strong> - Tools like Northfile automatically categorize expenses to CRA lines</li>
                <li><strong>Keep digital copies</strong> - Scan or photograph all receipts immediately</li>
                <li><strong>Separate accounts</strong> - Use a dedicated bank account for rental income and expenses</li>
                <li><strong>Track mileage</strong> - Keep a log of property-related trips with dates and purposes</li>
                <li><strong>Document everything</strong> - Write notes on receipts explaining the business purpose</li>
              </ol>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Filing Your T776 Form</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              All rental income and expenses are reported on Form T776 (Statement of Real Estate Rentals), which you file with your personal tax return. 
              The form has specific lines for each expense category, and the CRA expects you to categorize expenses correctly.
            </p>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 my-8">
              <h3 className="text-xl font-bold text-blue-900 mb-3">🚀 Simplify Your Filing with Northfile</h3>
              <p className="text-blue-800 mb-4">
                Northfile automatically categorizes your rental expenses to the correct T776 lines, tracks receipts, 
                and generates draft forms ready for your accountant. Try it free for 30 days.
              </p>
              <Link href="/auth/signup" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Start Free Trial
              </Link>
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mt-12 mb-6">Conclusion</h2>
            <p className="text-slate-700 leading-relaxed mb-6">
              Understanding and properly claiming all eligible deductions can save you thousands of dollars in taxes each year. 
              Keep detailed records, categorize expenses correctly, and consider using software to automate the tracking process.
            </p>
            <p className="text-slate-700 leading-relaxed mb-6">
              Remember: when in doubt, consult with a qualified accountant or tax professional who specializes in rental property taxation.
            </p>
          </div>

          {/* Author Bio */}
          <div className="border-t-2 border-slate-200 mt-12 pt-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                NF
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">Northfile Team</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our team of tax professionals and software engineers is dedicated to simplifying tax compliance for Ontario landlords. 
                  We stay up-to-date with CRA regulations to provide accurate, actionable guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Share Section */}
          <div className="border-t-2 border-slate-200 mt-8 pt-8">
            <p className="text-sm font-semibold text-slate-700 mb-4">Share this article:</p>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
                Twitter
              </button>
              <button className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-semibold transition-colors">
                LinkedIn
              </button>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors">
                Email
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "How to Fill Out Form T776: Complete Guide",
                category: "Tax Forms",
                readTime: "12 min read",
              },
              {
                title: "Understanding Capital Cost Allowance (CCA)",
                category: "Tax Strategy",
                readTime: "10 min read",
              },
              {
                title: "Rental Expense Categories: CRA Guidelines",
                category: "Tax Tips",
                readTime: "9 min read",
              },
            ].map((article, index) => (
              <Link
                key={index}
                href="/blog/sample"
                className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow border border-slate-200"
              >
                <span className="text-xs font-semibold text-blue-600 mb-2 block">{article.category}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-2 hover:text-blue-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-slate-500">{article.readTime}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Simplify Your Tax Filing?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of Ontario landlords using Northfile to automate their T776 preparation.
          </p>
          <Link href="/auth/signup" className="inline-block bg-white hover:bg-slate-100 text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            Start Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}
