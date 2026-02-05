import { FileText, Download, Eye, AlertCircle, CheckCircle, Calendar, Home, User, DollarSign, Sparkles } from "lucide-react";

export default function NoticesPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <span className="text-3xl font-light text-slate-900" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
              Northfile
            </span>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900">Dashboard</a>
              <a href="/properties" className="text-sm font-medium text-slate-600 hover:text-slate-900">Properties</a>
              <a href="/transactions" className="text-sm font-medium text-slate-600 hover:text-slate-900">Transactions</a>
              <a href="/receipts" className="text-sm font-medium text-slate-600 hover:text-slate-900">Receipts</a>
              <a href="/reports" className="text-sm font-medium text-slate-600 hover:text-slate-900">Reports</a>
              <a href="/notices" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Notices</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">JL</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Ontario RTA Notices</h1>
          <p className="text-slate-500 text-lg">Generate RTA-compliant notice templates with prefilled property data</p>
        </div>

        {/* RTA Compliance Banner */}
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-green-900 mb-2">✓ RTA-Compliant Templates</h3>
              <p className="text-sm text-green-800 mb-4">
                All notice templates are compliant with the Ontario <span className="font-bold">Residential Tenancies Act (RTA)</span> and 
                follow the official Landlord and Tenant Board (LTB) formats.
              </p>
              
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-900 mb-3">Important reminders:</p>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Always serve notices in person or by mail (not email unless tenant agrees)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Keep proof of service (photo, receipt, witness signature)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Follow proper notice periods (90 days for rent increase, varies for N4)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>These are templates - consult a lawyer for complex situations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notice Type Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Select Notice Type</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* N1 - Rent Increase */}
            <div className="bg-white rounded-2xl border-2 border-blue-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-8 h-8" />
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">Form N1</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Rent Increase Notice</h3>
                <p className="text-blue-100 mb-4">
                  Notify tenant of rent increase with proper 90-day notice period
                </p>
                <div className="space-y-2 text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Auto-calculates guideline increase (2.5% for 2024)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Validates 90-day notice period</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Prefills property and tenant info</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-blue-50 border-t-2 border-blue-200">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generate N1 Notice
                </button>
              </div>
            </div>

            {/* N4 - Late Rent */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">Form N4</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Late Rent Notice</h3>
                <p className="text-orange-100 mb-4">
                  Notice to end tenancy for non-payment of rent (14-day notice)
                </p>
                <div className="space-y-2 text-sm text-orange-100">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Calculates total arrears automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Sets proper termination date (14 days)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Includes payment instructions</span>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-orange-50 border-t-2 border-orange-200">
                <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generate N4 Notice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* N1 Form - Rent Increase */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden mb-8">
          <div className="bg-blue-50 border-b-2 border-blue-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Form N1: Notice of Rent Increase</h3>
                  <p className="text-sm text-slate-600">Complete the form below to generate your notice</p>
                </div>
              </div>
              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Step 1 of 2</span>
            </div>
          </div>

          <div className="p-8">
            <div className="space-y-6">
              {/* Property Selection */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Select Property <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>123 Main Street, Toronto, ON M5V 1A1</option>
                  <option>456 Oak Avenue, Ottawa, ON K1A 0B1</option>
                  <option>789 Maple Drive, Mississauga, ON L5B 2C3</option>
                </select>
                <p className="text-xs text-slate-500 mt-1">Property address will be auto-filled on the notice</p>
              </div>

              {/* Tenant Information */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Tenant Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Tenant Full Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Smith"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      defaultValue="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Unit Number <span className="text-slate-400 font-normal">(if applicable)</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Unit 201"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      defaultValue="Unit 201"
                    />
                  </div>
                </div>
              </div>

              {/* Rent Details */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Rent Details
                </h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Current Monthly Rent <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                      <input 
                        type="text" 
                        placeholder="2,000"
                        className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                        defaultValue="2,000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      New Monthly Rent <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                      <input 
                        type="text" 
                        placeholder="2,050"
                        className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                        defaultValue="2,050"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Increase Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                      <input 
                        type="text" 
                        className="w-full pl-8 pr-4 py-3 border-2 border-green-200 rounded-lg bg-green-50 font-bold text-green-700"
                        value="50"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      <p className="font-semibold mb-1">2024 Rent Increase Guideline: 2.5%</p>
                      <p>For a $2,000/month rent, the maximum guideline increase is <span className="font-bold">$50/month</span>. 
                      Your proposed increase of $50 (2.5%) is <span className="font-bold text-green-700">within the guideline</span>.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Effective Date */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Effective Date
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Date of Notice <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      defaultValue="2025-02-04"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Rent Increase Effective Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-lg bg-green-50 font-bold text-green-700"
                      value="2025-05-05"
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-green-900">
                      <p className="font-semibold mb-1">✓ 90-Day Notice Period Met</p>
                      <p>Notice given on Feb 4, 2025. Effective date is May 5, 2025 (90 days later). This meets the RTA requirement.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Landlord Information */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Landlord Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Jane Landlord"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      defaultValue="Jane Landlord"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="tel" 
                      placeholder="(416) 555-1234"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      defaultValue="(416) 555-1234"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Eye className="w-5 h-5" />
                Preview Notice
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Recent Notices */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Notices</h2>
          
          <div className="space-y-4">
            {/* Notice 1 */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">Form N1 - Rent Increase Notice</h3>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">N1</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">123 Main Street, Unit 201 • John Smith</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Created: Feb 4, 2025</span>
                      <span>•</span>
                      <span>Effective: May 5, 2025</span>
                      <span>•</span>
                      <span className="text-green-600 font-semibold">$2,000 → $2,050</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-colors">
                    <Eye className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="p-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Notice 2 */}
            <div className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-slate-900">Form N4 - Notice for Non-Payment of Rent</h3>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">N4</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">456 Oak Avenue • Sarah Johnson</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <span>Created: Jan 15, 2025</span>
                      <span>•</span>
                      <span>Termination: Jan 29, 2025</span>
                      <span>•</span>
                      <span className="text-orange-600 font-semibold">Arrears: $4,000</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-colors">
                    <Eye className="w-5 h-5 text-slate-600" />
                  </button>
                  <button className="p-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-slate-100 border border-slate-300 rounded-xl p-6">
          <h3 className="font-bold text-slate-900 mb-4">Need Help?</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-slate-900 mb-2">📚 LTB Resources</p>
              <ul className="space-y-1 text-slate-600">
                <li>• <a href="#" className="text-blue-600 hover:underline">Form N1 Instructions (LTB)</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">Form N4 Instructions (LTB)</a></li>
                <li>• <a href="#" className="text-blue-600 hover:underline">Rent Increase Guidelines</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-2">⚖️ Legal Disclaimer</p>
              <p className="text-slate-600">
                These templates are for informational purposes only and do not constitute legal advice. 
                Consult with a lawyer or paralegal for complex situations.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
