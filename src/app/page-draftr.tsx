import { ArrowRight, FileText, Users, Shield, Download, CheckCircle, Building2, Zap, Clock, Lock } from "lucide-react";
import Link from "next/link";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-4xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>Northfile</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-600 bg-blue-50 px-3 py-1 rounded-full">
              Launching Q2 2026
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1920&h=1080&fit=crop" 
            alt="Modern office workspace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          <div className="max-w-4xl">
            <h1 className="text-7xl font-bold text-white mb-8 leading-tight">
              <TypewriterText 
                phrases={[
                  "Simplify Your Rental Tax Prep & Compliance",
                  "Organize Your Rental Finances Effortlessly",
                  "Generate Draft T776 Forms Instantly",
                  "Hand Your Accountant Clean Data"
                ]}
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2500}
              />
            </h1>
            <p className="text-2xl text-slate-200 mb-12 leading-relaxed">
              Organize rental finances, categorize expenses to CRA lines, and generate draft T776 forms - all in one powerful platform built for Ontario landlords.
            </p>
            <Link href="/auth/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-full font-semibold text-lg inline-flex items-center gap-3 transition-all shadow-lg hover:shadow-xl">
              Get Started • it's free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-3">200+</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Landlords Waiting</div>
              <div className="text-slate-600">Ready for Q2 2026 launch</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-3">3-20</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Property Range</div>
              <div className="text-slate-600">Built for small to mid-size portfolios</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-3">100%</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Ontario Focused</div>
              <div className="text-slate-600">CRA & RTA compliant</div>
            </div>
            <div>
              <div className="text-6xl font-bold text-blue-600 mb-3">24/7</div>
              <div className="text-lg font-semibold text-slate-900 mb-2">Cloud Access</div>
              <div className="text-slate-600">Work from anywhere, anytime</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            The ultimate toolkit for landlords & accountants
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to organize, categorize, and export - all in a single, easy-to-use platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Feature 1 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Transaction Inbox</h3>
            <p className="text-slate-600 leading-relaxed">
              Upload CSVs or sync your bank. Categorize expenses to CRA lines with smart dropdowns and flag capital vs repair expenses.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Draft T776 Generation</h3>
            <p className="text-slate-600 leading-relaxed">
              Auto-generate watermarked draft T776 forms with CCA schedules. Review before handing to your accountant.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Accountant Collaboration</h3>
            <p className="text-slate-600 leading-relaxed">
              Invite your accountant for read-only access. They can review, comment, and download export packs instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Workflow Steps */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Simplify your workflow
            </h2>
            <p className="text-xl text-slate-600">
              From upload to export in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {/* Step 1 */}
            <div>
              <div className="text-8xl font-bold text-blue-100 mb-6">01</div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Upload your transactions</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Import bank statements via CSV or connect your account. Our system automatically detects rental-related transactions.
              </p>
            </div>

            {/* Step 2 */}
            <div>
              <div className="text-8xl font-bold text-blue-100 mb-6">02</div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Categorize with ease</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Smart dropdowns map expenses to CRA T776 lines. Flag capital improvements, attach receipts, and add notes.
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <div className="text-8xl font-bold text-blue-100 mb-6">03</div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Export & share</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Generate draft T776 forms and comprehensive export packs. Share instantly with your accountant for review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Large Feature Showcase 1 */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
              Ontario RTA Compliance
            </div>
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Generate compliant notices in seconds
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Create Ontario RTA notice templates with prefilled tenant and property info. Export as PDFs ready to serve.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-lg text-slate-700">RTA-compliant templates for all notice types</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-lg text-slate-700">Auto-filled property and tenant data</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <span className="text-lg text-slate-700">Professional PDF exports</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=800&fit=crop" 
              alt="Legal documents"
              className="rounded-3xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Large Feature Showcase 2 */}
      <section className="bg-slate-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop" 
                alt="Financial documents"
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold mb-6">
                Accountant-Ready Exports
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Hand your accountant something clean
              </h2>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Generate comprehensive ZIP packs with ledgers, categorized expenses, receipts, draft T776s, and audit trails.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg text-slate-200">Complete ledger CSVs with CRA categories</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg text-slate-200">Organized receipts folder structure</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg text-slate-200">Audit trail logs for transparency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Power Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-slate-900 mb-6">
            Power up your workflow with next-gen features
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12">
            <Zap className="w-12 h-12 text-blue-600 mb-6" />
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Cloud-based accessibility</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Access your rental data anywhere, anytime. All your transactions, receipts, and reports sync automatically across devices.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-12">
            <Lock className="w-12 h-12 text-green-600 mb-6" />
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Fast & secure performance</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Bank-level encryption, row-level security, and audit logging. Your financial data is protected with enterprise-grade security.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Loved by landlords & accountants
            </h2>
            <p className="text-xl text-slate-600">Hear from our early access users</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  MC
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">Michael Chen</p>
                  <p className="text-slate-500 text-sm">5-Unit Portfolio | Toronto</p>
                </div>
              </div>
              <div className="text-7xl text-blue-100 mb-4">"</div>
              <p className="text-xl text-slate-700 leading-relaxed">
                Finally, a tool that understands Ontario rental tax prep. No more spreadsheet chaos before tax season.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  ST
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">Sarah Thompson</p>
                  <p className="text-slate-500 text-sm">12-Unit Portfolio | Ottawa</p>
                </div>
              </div>
              <div className="text-7xl text-purple-100 mb-4">"</div>
              <p className="text-xl text-slate-700 leading-relaxed">
                The accountant export pack saved me hours. Everything my bookkeeper needs in one clean ZIP file.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  DP
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-lg">David Park, CPA</p>
                  <p className="text-slate-500 text-sm">Park & Associates</p>
                </div>
              </div>
              <div className="text-7xl text-green-100 mb-4">"</div>
              <p className="text-xl text-slate-700 leading-relaxed">
                As an accountant, I love when clients use Northfile. Clean data, proper categories, organized receipts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Waitlist Form */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Join the Beta Waitlist
            </h2>
            <p className="text-xl text-slate-600">
              Be among the first Ontario landlords to experience Northfile when we launch in Q2 2026. Get early access and exclusive updates.
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-3xl p-12 shadow-lg">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-slate-900 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="properties" className="block text-sm font-semibold text-slate-900 mb-2">
                  Number of Properties
                </label>
                <select
                  id="properties"
                  name="properties"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="1-2">1-2 properties</option>
                  <option value="3-5">3-5 properties</option>
                  <option value="6-10">6-10 properties</option>
                  <option value="11-20">11-20 properties</option>
                  <option value="20+">20+ properties</option>
                </select>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-slate-900 mb-2">
                  I am a...
                </label>
                <select
                  id="role"
                  name="role"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Select...</option>
                  <option value="landlord">Landlord</option>
                  <option value="accountant">Accountant</option>
                  <option value="bookkeeper">Bookkeeper</option>
                  <option value="property-manager">Property Manager</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 mb-2">
                  What features are you most interested in? (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tell us what you're looking for..."
                ></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="updates"
                  name="updates"
                  className="mt-1 w-5 h-5 text-blue-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="updates" className="text-sm text-slate-600">
                  I agree to receive product updates, launch notifications, and exclusive early access offers from Northfile.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Join the Waitlist
              </button>

              <p className="text-center text-sm text-slate-500">
                <CheckCircle className="w-4 h-4 text-green-500 inline mr-1" />
                200+ landlords already on the waitlist
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 text-white py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-6xl font-bold mb-8">
            The perfect solution for every Ontario landlord
          </h2>
          <p className="text-2xl text-blue-100 mb-12">
            Join 200+ landlords preparing for Q2 2026 launch
          </p>
          <Link href="/auth/signup" className="bg-white text-blue-600 px-12 py-6 rounded-full font-bold text-xl hover:bg-blue-50 transition-all shadow-xl">
            Get Started • it's free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <span className="text-3xl font-light text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>Northfile</span>
              </div>
              <p className="text-sm leading-relaxed">
                Ontario landlord tax prep and compliance, simplified.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4 text-lg">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center">
            <p>&copy; 2026 Northfile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
