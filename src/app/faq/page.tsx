export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100">
      {/* Header */}
      <header className="border-b border-purple-200/50 bg-white/60 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <span className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>Northfile</span>
          </a>
          <a href="/" className="text-slate-600 hover:text-slate-900 transition-colors text-sm font-medium">
            ← Back to Home
          </a>
        </div>
      </header>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-slate-900 mb-16 text-center">
            Frequently Asked Questions
          </h1>

          <div className="space-y-12">
            {/* FAQ 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Is Northfile a replacement for my accountant?
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>
                  Not necessarily. Northfile organizes everything so your accountant spends less time (charges less), or you can file yourself with confidence. Many users do both: use Northfile year-round, then have accountant review before filing.
                </p>
                <p className="font-semibold text-slate-900">
                  Think of it as "TurboTax, but built specifically for Ontario landlords with T776-specific features."
                </p>
              </div>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What if I'm not tech-savvy?
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>
                  If you can send an email, you can use Northfile. Clean interface, plain language, and hover-over explanations for everything. Plus, we offer email support if you get stuck.
                </p>
                <p className="font-semibold text-slate-900">
                  Average onboarding time: 15 minutes.
                </p>
              </div>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Does it work for Airbnb/short-term rentals?
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>
                  Yes, with a caveat. Northfile detects if your rental income should be filed as business income (T2125) instead of rental income (T776). We'll alert you and recommend consulting an accountant for complex situations.
                </p>
                <ul className="space-y-2 ml-4">
                  <li><strong>For long-term rentals (12+ months):</strong> Perfect fit.</li>
                  <li><strong>For short-term with minimal services:</strong> Works great.</li>
                  <li><strong>For hotel-like operations:</strong> Consult accountant.</li>
                </ul>
              </div>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What if CRA changes the T776 form?
              </h2>
              <div className="text-slate-700 leading-relaxed">
                <p>
                  We update the form generator every year to match CRA's latest version. Included in your annual subscription.
                </p>
              </div>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Can I claim expenses from before I started using Northfile?
              </h2>
              <div className="text-slate-700 leading-relaxed">
                <p>
                  Yes! When you sign up, you can backfill prior year expenses (upload past receipts, enter transactions). Your T776 will include the full year.
                </p>
              </div>
            </div>

            {/* FAQ 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What about CCA (Capital Cost Allowance)?
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>Northfile includes a CCA calculator that shows:</p>
                <ul className="space-y-2 ml-4">
                  <li>• How much depreciation you CAN claim</li>
                  <li>• Tax savings this year if you claim it</li>
                  <li>• Capital gains impact when you sell</li>
                  <li>• Recommendation based on your situation</li>
                </ul>
                <p className="font-semibold text-slate-900">
                  You decide whether to claim—we just make it transparent.
                </p>
              </div>
            </div>

            {/* FAQ 7 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Do you store my financial data?
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>Yes, securely. We use:</p>
                <ul className="space-y-2 ml-4">
                  <li>✅ Bank-level 256-bit encryption</li>
                  <li>✅ Canadian data centers (Supabase)</li>
                  <li>✅ SOC 2 compliant infrastructure</li>
                  <li>✅ 2-factor authentication available</li>
                </ul>
                <p className="font-semibold text-slate-900">
                  Your data is as safe as your online banking.
                </p>
              </div>
            </div>

            {/* FAQ 8 */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-purple-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                What's the refund policy?
              </h2>
              <div className="text-slate-700 leading-relaxed space-y-4">
                <p>
                  30-day money-back guarantee. If you don't love Northfile, email us within 30 days for full refund—no questions asked.
                </p>
                <p className="font-semibold text-slate-900">
                  We're confident you'll save more than $149 in time and accountant fees, but if we're wrong, we'll refund you.
                </p>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-16 text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-12 border border-indigo-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Still have questions?</h3>
            <p className="text-slate-700 mb-6">We're here to help</p>
            <a 
              href="mailto:info@northfile.ca"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-all"
            >
              Email us: info@northfile.ca
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <a href="/" className="text-2xl font-light mb-4 inline-block" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>Northfile</a>
            <p className="text-slate-400 text-sm">Designed for Ontario landlords. Powered by Northfile.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
