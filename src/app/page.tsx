'use client';

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import TypewriterText from "@/components/TypewriterText";
import { useState } from "react";

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleWaitlistSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      propertiesCount: formData.get('properties') as string,
      currentSolution: formData.get('units') as string,
    };

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      {/* Header */}
      <header className="border-b border-purple-200/50 bg-white/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>Northfile</span>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all text-sm"
            >
              Get Started
            </button>
            <Link href="/dashboard" className="hidden bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium transition-all text-sm">
              Login now
            </Link>
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
                "Hand accountants clean data in just a few clicks.",
                "File Your T776 in 30 Minutes"
              ]}
              typingSpeed={80}
              deletingSpeed={40}
              pauseDuration={2500}
            />
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Organize your rental income & expenses into CRA-compliant T776 forms. No tax knowledge required. Built specifically for Ontario landlords.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-lg font-semibold transition-all text-lg flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Join Waitlist
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
            <div className="text-slate-600 font-bold text-lg">CRA-compliant</div>
            <div className="text-slate-600 font-bold text-lg">Accountant-Ready</div>
            <div className="text-slate-600 font-bold text-lg">30-day guarantee</div>
          </div>
        </div>
      </section>

      {/* Workflow Steps Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-8">
                How it works
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Add your properties (2 min)</h3>
                    <p className="text-slate-600">
                      Enter basic details like address, purchase date, and ownership split. We'll handle the rest.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Upload receipts & transactions (10 min)</h3>
                    <p className="text-slate-600">
                      Upload bank CSVs and receipts. The system categorizes everything to the correct CRA line items.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Download your T776 (instant)</h3>
                    <p className="text-slate-600 mb-3">
                      One button. Complete CRA-compliant T776 with:
                    </p>
                    <ul className="text-slate-600 space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>All income and expenses categorized</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>Mortgage interest auto-calculated (principal excluded)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>Partial-year proration (if you rented mid-year)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>Co-owner splits (separate T776s generated)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-indigo-600 mt-1">•</span>
                        <span>CCA impact preview (see how it affects future taxes)</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>📚 Learn more:</strong> Read our comprehensive guide on 
                        <Link href="/blog/how-to-prepare-t776-ontario-rental-taxes" className="text-blue-600 hover:text-blue-700 underline ml-1">
                          how to prepare T776 forms in Ontario
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-purple-100">
              <img 
                src="/screenshot-t776.png" 
                alt="T776 form preview"
                className="w-full h-auto"
              />
            </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=200&fit=crop&q=80" 
                  alt="Transaction Inbox - Receipt"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Transaction Inbox</h3>
              <p className="text-slate-600">Upload CSVs, categorize to CRA lines, and attach receipts effortlessly.</p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=400&h=200&fit=crop&q=80" 
                  alt="Draft T776 Forms - Tax form"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Draft T776 Forms</h3>
              <p className="text-slate-600">Auto-generate watermarked draft forms with CCA schedules instantly.</p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop&q=80" 
                  alt="Accountant Collaboration - Business meeting"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Accountant Collaboration</h3>
              <p className="text-slate-600">Invite your accountant for read-only access and seamless export packs.</p>
            </div>

            {/* Feature Card 4 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=400&h=200&fit=crop&q=80" 
                  alt="Ontario RTA Notices - Legal documents"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Ontario RTA Notices</h3>
              <p className="text-slate-600">Generate RTA-compliant notice templates with prefilled property data.</p>
            </div>

            {/* Feature Card 5 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border border-indigo-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1544396821-4dd40b938ad3?w=400&h=200&fit=crop&q=80" 
                  alt="Accountant Export Packs - Organized documents"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Accountant Export Packs</h3>
              <p className="text-slate-600">Generate comprehensive ZIP packs with ledgers and receipts.</p>
            </div>

            {/* Feature Card 6 */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 border border-teal-100">
              <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                <img 
                  src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=200&fit=crop&q=80" 
                  alt="Property Management - Residential house"
                  className="w-full h-32 object-cover rounded-xl"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Property Management</h3>
              <p className="text-slate-600">Track properties, units, ownership splits, and mortgage details.</p>
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

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-4">
                <div className="text-4xl mb-2">"</div>
                <p className="text-slate-700 leading-relaxed">
                  I need this yesterday. My accountant charged me $800 last year and I still had to organize everything myself.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">Early access waitlist member</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-4">
                <div className="text-4xl mb-2">"</div>
                <p className="text-slate-700 leading-relaxed">
                  Finally, software that understands Ontario rental laws. The N-form integration is brilliant.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">Property manager</p>
                <p className="text-sm text-slate-500">Toronto</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="mb-4">
                <div className="text-4xl mb-2">"</div>
                <p className="text-slate-700 leading-relaxed">
                  The CCA decision tool alone is worth it. I had no idea claiming depreciation would increase my capital gains tax.
                </p>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="font-semibold text-slate-900">Beta tester</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
            <p className="text-slate-400 text-lg">Join early and lock in founding member rates</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Early Access Card */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Early Access</h3>
                <p className="text-slate-400">Founding member pricing</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">$99</span>
                  <span className="text-slate-400">/year</span>
                </div>
                <p className="text-slate-500 text-sm line-through">Regular: $199/year</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✓</span>
                  <span className="text-slate-300">Lifetime $99/year rate</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✓</span>
                  <span className="text-slate-300">Priority onboarding</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✓</span>
                  <span className="text-slate-300">Direct access to founders</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-indigo-400 mt-1">✓</span>
                  <span className="text-slate-300">All features included</span>
                </div>
              </div>

              <button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Join Waitlist
              </button>
            </div>

            {/* Regular Card */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 opacity-75">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Regular</h3>
                <p className="text-slate-400">Standard pricing after launch</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-white">$199</span>
                  <span className="text-slate-400">/year</span>
                </div>
                <p className="text-slate-500 text-sm">Available after March 2026</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <span className="text-slate-400">All features included</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <span className="text-slate-400">Standard support</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 mt-1">✓</span>
                  <span className="text-slate-400">Regular updates</span>
                </div>
              </div>

              <button 
                disabled
                className="w-full bg-slate-700 text-slate-500 py-3 rounded-lg font-semibold cursor-not-allowed"
              >
                Available at Launch
              </button>
            </div>
          </div>

          <p className="text-center text-slate-400 mt-12">
            <span className="font-semibold text-white">200+ landlords</span> already on the waitlist. No payment until launch.
          </p>
        </div>
      </section>

      {/* Beta Waitlist Form */}
      <section id="waitlist" className="py-24 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Join the Waitlist
            </h2>
            <p className="text-lg text-slate-600">
              Be among the first Ontario landlords to experience Northfile when we launch in Q2 2026
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-2xl p-10 shadow-lg">
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                <p className="text-green-800 font-semibold text-center">
                  ✓ Success! You've been added to the waitlist. We'll be in touch soon!
                </p>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-800 font-semibold text-center">
                  ✗ {errorMessage}
                </p>
              </div>
            )}

            <form onSubmit={handleWaitlistSubmit} className="space-y-6">
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
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
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
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">All Pages</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
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
