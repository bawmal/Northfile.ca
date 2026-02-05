import { ArrowRight } from "lucide-react";
import TypewriterText from "@/components/TypewriterText";

export default function AltLandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      {/* Header */}
      <header className="border-b border-purple-200/50 bg-white/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>Northfile</span>
          </div>
          <div className="flex items-center gap-6">
            <button className="hidden bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all text-sm">
              Login now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Draftr Style */}
      <section className="min-h-[85vh] flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center justify-center bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            Revolutionize your rental tax prep
          </div>

          {/* Main Headline with Typewriter */}
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-8 leading-[1.1] min-h-[180px] md:min-h-[210px]">
            <TypewriterText 
              phrases={[
                "Bring rental finances to order in just a few clicks.",
                "Generate T776 forms in just a few clicks.",
                "Organize tax prep in just a few clicks.",
                "Hand accountants clean data in just a few clicks."
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
            />
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Track, categorize, and collaborate in real-time - all in one powerful platform. Elevate your <span className="font-semibold text-slate-900">tax prep process</span> with <span className="font-semibold text-slate-900">seamless organization</span> and limitless possibilities.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-lg font-semibold transition-all text-lg flex items-center gap-2 shadow-lg hover:shadow-xl">
              Get Started • it's free
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-sm text-slate-500">
              200+ landlords waiting for launch
            </p>
          </div>
        </div>
      </section>

      {/* Trust Badges / Logo Cloud */}
      <section className="py-16 border-t border-purple-200/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-slate-500 mb-8">Trusted by Ontario landlords and accountants</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40">
            <div className="text-slate-600 font-bold text-lg">Ontario RTA</div>
            <div className="text-slate-600 font-bold text-lg">Accountant-Ready</div>
            <div className="text-slate-600 font-bold text-lg">Secure</div>
          </div>
        </div>
      </section>

      {/* Features Toolkit Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              The ultimate toolkit for<br />landlords & accountants
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to organize, categorize, and collaborate - all in a single, easy-to-use platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <div className="w-full h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Transaction Inbox</h3>
              <p className="text-slate-600">Upload CSVs, categorize to CRA lines, and attach receipts effortlessly.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Draft T776 Forms</h3>
              <p className="text-slate-600">Auto-generate watermarked draft forms with CCA schedules instantly.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <div className="w-full h-32 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-xl"></div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Accountant Collaboration</h3>
              <p className="text-slate-600">Invite your accountant for read-only access and seamless export packs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Features Grid */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">Features</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything you need for tax season
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From transaction categorization to accountant-ready exports, Northfile handles the heavy lifting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-purple-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop" 
                  alt="Financial documents and calculator"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Transaction Inbox</h3>
                <p className="text-slate-600 mb-4">
                  Upload CSVs or sync your bank. Categorize expenses to CRA lines with smart dropdowns. 
                  Flag capital vs repair expenses.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    CSV upload & bank sync
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    CRA category mapping
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Receipt attachments
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-purple-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
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
                    <span className="text-green-500">✓</span>
                    Watermarked drafts
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    CCA schedule preview
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Ownership splits
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-purple-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
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
                    <span className="text-green-500">✓</span>
                    Read-only invites
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Comment threads
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Export history
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-purple-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
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
                    <span className="text-green-500">✓</span>
                    RTA-compliant templates
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Auto-filled property data
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Exportable PDFs
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="bg-white border border-purple-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
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
                    <span className="text-green-500">✓</span>
                    Complete ledger CSVs
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Organized receipts folder
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Audit trail logs
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="bg-white border border-purple-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
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
                    <span className="text-green-500">✓</span>
                    Multi-property support
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Ownership splits
                  </li>
                  <li className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    Mortgage tracking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Steps Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">
                Simplify your workflow
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Start your project</h3>
                    <p className="text-slate-600">
                      Upload transactions or sync your bank. Set up your workspace effortlessly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Organize with ease</h3>
                    <p className="text-slate-600">
                      Use AI-powered categorization and smart tools to organize your finances.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Export & Share</h3>
                    <p className="text-slate-600">
                      Generate draft T776s and export packs for your accountant effortlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100">
              <img 
                src="/northfile-diagram.png" 
                alt="Northfile platform overview showing Transaction Inbox, Draft T776, Accountant Collaboration, Property Management, Accountant Export Packs, and Ontario RTA features"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 border border-purple-100">
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl"></div>
                <div className="w-16 h-16 bg-blue-600 rounded-2xl"></div>
                <div className="w-16 h-16 bg-cyan-600 rounded-2xl"></div>
                <div className="w-16 h-16 bg-purple-600 rounded-2xl"></div>
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl"></div>
                <div className="w-16 h-16 bg-pink-600 rounded-2xl"></div>
                <div className="w-16 h-16 bg-blue-600 rounded-2xl"></div>
                <div className="w-16 h-16 bg-red-600 rounded-2xl"></div>
                <div className="w-16 h-16 bg-teal-600 rounded-2xl"></div>
              </div>
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-indigo-600 rounded-2xl"></div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                One platform, unlimited integrations
              </h2>
              <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-semibold transition-all mb-8">
                View all integrations
              </button>
              <blockquote className="border-l-4 border-indigo-600 pl-6">
                <p className="text-lg text-slate-700 mb-4">
                  "Our platform empowers teams to collaborate, innovate, and bring ideas to life—seamlessly and effortlessly."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
                  <div>
                    <p className="font-semibold text-slate-900">Ontario Landlord</p>
                    <p className="text-sm text-slate-500">Founder & CEO</p>
                  </div>
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
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
                <p className="text-sm text-slate-500">5-Unit Portfolio | Toronto</p>
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
                <p className="text-sm text-slate-500">12-Unit Portfolio | Ottawa</p>
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
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-indigo-600 mb-2 uppercase tracking-wide">Join the Beta</p>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Join the Waitlist
            </h2>
            <p className="text-lg text-slate-600">
              Be among the first Ontario landlords to experience Northfile when we launch in Q2 2026
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-10 shadow-lg">
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
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white"
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
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white"
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
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white"
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
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white"
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
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white"
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
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white"
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
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors bg-white"
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
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors resize-none bg-white"
                  placeholder="Tell us what you're looking for..."
                ></textarea>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="updates"
                  name="updates"
                  className="mt-1 w-5 h-5 text-indigo-600 border-2 border-purple-300 rounded focus:ring-2 focus:ring-indigo-500"
                />
                <label htmlFor="updates" className="text-sm text-slate-600">
                  I agree to receive product updates, launch notifications, and exclusive early access offers from Northfile.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                Join the Waitlist
              </button>

              <p className="text-center text-sm text-slate-500">
                ✓ 200+ landlords already on the waitlist
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <span className="text-2xl font-light" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>Northfile</span>
              <p className="text-slate-400 mt-4 text-sm">
                Simplifying rental tax prep for Ontario landlords.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Download</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">All Pages</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Waitlist</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Follow us on:</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-sm">𝕏</span>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-colors">
                  <span className="text-sm">in</span>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>Designed for Ontario landlords. Powered by Northfile.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
