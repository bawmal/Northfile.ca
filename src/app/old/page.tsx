import { ArrowRight, FileText, Users, Shield, Download, CheckCircle, Building2 } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-black border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl font-light text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>Northfile</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm text-slate-400">
              Coming soon • Q2 2026
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section - Framer Style */}
      <section className="bg-black min-h-[80vh] flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-8 leading-[1.1] min-h-[200px] md:min-h-[240px]">
            <TypewriterText 
              phrases={[
                "Simplify rental tax prep, faster",
                "Organize rental finances, faster",
                "Generate T776 forms, faster",
                "Hand accountants clean data, faster"
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
            />
          </h1>
          <p className="text-lg md:text-xl text-indigo-200 mb-12 leading-[1.6] max-w-2xl mx-auto font-light">
            Northfile is the tax prep tool trusted by Ontario landlords. Organize finances, categorize to CRA lines, and generate draft T776 forms—without the spreadsheet chaos.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="bg-white hover:bg-slate-100 text-black px-10 py-4 rounded-lg font-semibold transition-all text-lg">
              Join Waitlist
            </button>
            <p className="text-sm text-slate-500">
              200+ landlords waiting for launch
            </p>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-6">
              Stop guessing expense categories. Start preparing with confidence.
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Built specifically for small-scale Ontario landlords (1–20 units) who want to organize 
              rental finances, generate draft tax forms, and collaborate seamlessly with their accountants.
            </p>
            <button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-all">
              Join Waitlist
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">Features</p>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Everything you need for tax season
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From transaction categorization to accountant-ready exports, Northfile handles the heavy lifting.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop" 
                alt="Financial documents and calculator"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent"></div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Transaction Inbox</h3>
              <p className="text-slate-600 mb-4">
                Upload CSVs or sync your bank. Categorize expenses to CRA lines with smart dropdowns. 
                Flag capital vs repair expenses.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  CSV upload & bank sync
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  CRA category mapping
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Receipt attachments
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop" 
                alt="Tax forms and documents"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent"></div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Draft T776 Generation</h3>
              <p className="text-slate-600 mb-4">
                Auto-generate watermarked draft T776 forms with CCA schedules. Review before handing 
                to your accountant.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Watermarked drafts
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  CCA schedule preview
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Ownership splits
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop" 
                alt="Business meeting and collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 to-transparent"></div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accountant Collaboration</h3>
              <p className="text-slate-600 mb-4">
                Invite your accountant for read-only access. They can review, comment, and download 
                export packs instantly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Read-only invites
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Comment threads
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Export history
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop" 
                alt="Legal documents and contracts"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/60 to-transparent"></div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Ontario RTA Notices</h3>
              <p className="text-slate-600 mb-4">
                Generate Ontario RTA notice templates with prefilled tenant and property info. 
                Export as PDFs.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  RTA-compliant templates
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Auto-filled property data
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Exportable PDFs
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=400&fit=crop" 
                alt="Organized files and folders"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent"></div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Accountant Export Packs</h3>
              <p className="text-slate-600 mb-4">
                Generate comprehensive ZIP packs with ledgers, categorized expenses, receipts, 
                and draft T776s.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Complete ledger CSVs
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Organized receipts folder
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Audit trail logs
                </li>
              </ul>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-48 relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop" 
                alt="Apartment buildings and rental properties"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Property Management</h3>
              <p className="text-slate-600 mb-4">
                Set up properties, units, ownership percentages, and mortgage details. 
                Track everything in one place.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Multi-property support
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Ownership splits
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Mortgage tracking
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">Success Stories</p>
            <h2 className="text-4xl font-bold text-slate-900">
              Trusted by Ontario landlords
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-4">
                <div className="text-4xl mb-2">"</div>
                <p className="text-slate-700 leading-relaxed">
                  I've been beta testing Northfile and it's exactly what I needed. Finally, a tool that 
                  understands Ontario rental tax prep without the spreadsheet chaos.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">Ontario Landlord</p>
                <p className="text-sm text-slate-500">5-Unit Portfolio | Toronto | Beta Tester</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-4">
                <div className="text-4xl mb-2">"</div>
                <p className="text-slate-700 leading-relaxed">
                  Testing the beta has been eye-opening. The export pack feature alone will save me hours 
                  every tax season. My bookkeeper is going to love this.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">Ontario Landlord</p>
                <p className="text-sm text-slate-500">12-Unit Portfolio | Ottawa | Beta Tester</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-4">
                <div className="text-4xl mb-2">"</div>
                <p className="text-slate-700 leading-relaxed">
                  I'm excited about this product and what it means for a number of my clients. Finally, 
                  a tool that helps landlords get organized before tax season.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">Certified Accountant</p>
                <p className="text-sm text-slate-500">Ontario CPA Firm</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Waitlist Form */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-blue-600 mb-2 uppercase tracking-wide">Join the Beta</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Join the Waitlist
            </h2>
            <p className="text-lg text-slate-600">
              Be among the first Ontario landlords to experience Northfile when we launch in Q2 2026
            </p>
          </div>

          <div className="bg-white border-2 border-slate-200 rounded-2xl p-10 shadow-lg">
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

              <div className="grid md:grid-cols-2 gap-6">
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
                  <label htmlFor="units" className="block text-sm font-semibold text-slate-900 mb-2">
                    Total Number of Units
                  </label>
                  <select
                    id="units"
                    name="units"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="1-3">1-3 units</option>
                    <option value="4-10">4-10 units</option>
                    <option value="11-20">11-20 units</option>
                    <option value="21-50">21-50 units</option>
                    <option value="50+">50+ units</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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
                  <label htmlFor="propertyType" className="block text-sm font-semibold text-slate-900 mb-2">
                    Primary Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  >
                    <option value="">Select...</option>
                    <option value="basement-apartment">Basement Apartment</option>
                    <option value="single-family">Single Family Home</option>
                    <option value="duplex">Duplex</option>
                    <option value="triplex">Triplex</option>
                    <option value="fourplex">Fourplex</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="apartment-building">Apartment Building (5+ units)</option>
                    <option value="mixed-use">Mixed-Use Building</option>
                    <option value="student-housing">Student Housing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
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

      {/* Pricing hidden - will be shown at launch */}
      <section className="hidden">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Starter</h3>
            <p className="text-slate-600 mb-6">For accidental landlords</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">$19</span>
              <span className="text-slate-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                Up to 3 properties
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                Transaction categorization
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                Draft T776 generation
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                1 accountant invite
              </li>
            </ul>
            <button className="w-full border-2 border-slate-300 hover:border-slate-400 text-slate-700 py-3 rounded-lg font-semibold transition-all">
              Join Waitlist
            </button>
          </div>

          {/* Professional */}
          <div className="bg-blue-600 text-white rounded-2xl p-8 relative shadow-xl scale-105">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2">Professional</h3>
            <p className="text-blue-100 mb-6">For serious investors</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">$49</span>
              <span className="text-blue-100">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                Up to 20 properties
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                Everything in Starter
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                Ontario RTA notices
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                Export packs
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-5 h-5 text-blue-200 flex-shrink-0" />
                3 accountant invites
              </li>
            </ul>
            <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all">
              Join Waitlist
            </button>
          </div>

          {/* Enterprise */}
          <div className="bg-white border-2 border-slate-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Enterprise</h3>
            <p className="text-slate-600 mb-6">For large portfolios</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-slate-900">Custom</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                Unlimited properties
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                Everything in Professional
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                Priority support
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                Custom integrations
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                Unlimited accountant invites
              </li>
            </ul>
            <button className="w-full border-2 border-slate-300 hover:border-slate-400 text-slate-700 py-3 rounded-lg font-semibold transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Your questions, answered
            </h2>
          </div>

          <div className="space-y-6">
            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-slate-900 cursor-pointer">
                Does Northfile file my taxes with the CRA?
              </summary>
              <p className="mt-4 text-slate-600">
                No. Northfile generates draft T776 forms and export packs for your accountant. 
                We do not submit anything to the CRA. You or your accountant will file the final return.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-slate-900 cursor-pointer">
                Is this only for Ontario landlords?
              </summary>
              <p className="mt-4 text-slate-600">
                Yes. The MVP is Ontario-locked and includes Ontario RTA notice templates. 
                We may expand to other provinces post-launch.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-slate-900 cursor-pointer">
                Can my accountant access my data?
              </summary>
              <p className="mt-4 text-slate-600">
                Yes. You can invite your accountant with read-only or comment access. 
                They can review your data, download export packs, and leave comments. You control access and can revoke it anytime.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-slate-900 cursor-pointer">
                How secure is my financial data?
              </summary>
              <p className="mt-4 text-slate-600">
                Very secure. We use row-level security, encrypted storage with signed URLs, 
                audit logging, and never store sensitive data like SINs or bank credentials. 
                All data is private by default.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-sm">
              <summary className="font-semibold text-slate-900 cursor-pointer">
                When will Northfile launch?
              </summary>
              <p className="mt-4 text-slate-600">
                We're targeting Q2 2026. Join the waitlist to get early access and updates.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to simplify your rental tax prep?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join 200+ Ontario landlords waiting for launch. Get early access and exclusive updates.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg text-lg">
            Join the Waitlist
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <span className="text-3xl font-light text-white" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>Northfile</span>
              </div>
              <p className="text-sm">
                Ontario landlord tax prep and compliance, simplified.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center">
            <p>&copy; 2026 Northfile. All rights reserved. Ontario-focused rental tax preparation.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
