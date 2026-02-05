import { Upload, Filter, Grid3x3, List, CheckCircle, AlertCircle, Clock, Sparkles, Eye, Link2, Trash2, FileText } from "lucide-react";

export default function ReceiptsPage() {
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
              <a href="/receipts" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Receipts</a>
              <a href="/reports" className="text-sm font-medium text-slate-600 hover:text-slate-900">Reports</a>
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Receipts</h1>
          <p className="text-slate-500 text-lg">Upload and organize your expense receipts</p>
        </div>

        {/* Record Retention Guidance */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-blue-900 mb-2">📋 CRA Record Retention Requirements</h3>
              <p className="text-sm text-blue-800 mb-4">
                The Canada Revenue Agency requires you to keep all supporting documents for <span className="font-bold">6 years</span> after filing your tax return.
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-slate-900 mb-3">What to keep for each expense:</p>
                <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Original receipts or invoices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Bank statements showing payment</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Credit card statements</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Cancelled cheques or e-transfer confirmations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Contracts or agreements</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Property tax bills</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Insurance policy documents</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Mortgage statements</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                <p className="text-sm font-semibold text-green-900 mb-1">✓ Northfile keeps your records safe</p>
                <p className="text-xs text-green-800">
                  All receipts uploaded to Northfile are securely stored and backed up. 
                  You can download them anytime for CRA audits or your records.
                </p>
              </div>

              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
                <p className="text-sm font-semibold text-yellow-900 mb-1">⚠️ Audit Protection</p>
                <p className="text-xs text-yellow-800">
                  If you're audited, the CRA will ask for proof of every expense claimed. 
                  Missing receipts = disallowed deductions = higher taxes owed + penalties.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="bg-white border-2 border-dashed border-slate-300 rounded-2xl p-12 mb-12 text-center hover:border-slate-400 transition-colors cursor-pointer">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Upload Receipts</h3>
            <p className="text-slate-500 mb-6">
              Drag and drop your receipt images or PDFs here, or click to browse
            </p>
            <div className="flex items-center justify-center gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                Choose Files
              </button>
              <p className="text-sm text-slate-400">Supports JPG, PNG, PDF</p>
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
              <Sparkles className="w-4 h-4" />
              <span>AI will automatically extract data and match to transactions</span>
            </div>
          </div>
        </div>

        {/* Stats & Actions Bar */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Total Receipts</p>
            <p className="text-3xl font-bold text-slate-900">189</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Auto-Matched</p>
            <p className="text-3xl font-bold text-green-600">142</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">38</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Unmatched</p>
            <p className="text-3xl font-bold text-orange-600">9</p>
          </div>
        </div>

        {/* Filters & View Toggle */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <select className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none">
                <option>All Status</option>
                <option>Auto-Matched</option>
                <option>Pending Review</option>
                <option>Unmatched</option>
              </select>
              <select className="px-4 py-2 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none">
                <option>All Properties</option>
                <option>123 Main St</option>
                <option>456 Oak Ave</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg">
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Multi-Receipt Matching Review */}
        <div className="bg-white rounded-xl border-2 border-purple-200 overflow-hidden mb-6">
          <div className="bg-purple-50 p-6 border-b-2 border-purple-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-purple-900 mb-1">Split Payment Detected</h3>
                <p className="text-purple-700">
                  AI found 2 receipts that total $5,000 matching a single transaction. Review and confirm the match.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Transaction Being Matched */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-blue-600 mb-2">MATCHING TO TRANSACTION:</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Appliance Purchase - Home Depot</p>
                  <p className="text-sm text-slate-600">Jan 15, 2025 • 123 Main St</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">$5,000.00</p>
              </div>
            </div>

            {/* Suggested Receipt Matches */}
            <div className="space-y-4 mb-6">
              <p className="text-sm font-semibold text-slate-900">Suggested Receipts (2):</p>
              
              {/* Receipt 1 */}
              <div className="flex items-start gap-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 text-green-600 border-slate-300 rounded" />
                <div className="w-20 h-24 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=200&h=300&fit=crop" 
                    alt="Receipt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">Credit Card Payment</p>
                      <p className="text-sm text-slate-600">Home Depot • Jan 15, 2025</p>
                      <p className="text-xs text-slate-500 mt-1">Card ending ****1234</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-700">$2,500.00</p>
                      <span className="inline-block mt-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        95% Match
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Same merchant • Same date • Amount matches 50% of transaction</span>
                  </div>
                </div>
              </div>

              {/* Receipt 2 */}
              <div className="flex items-start gap-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl">
                <input type="checkbox" defaultChecked className="mt-1 w-5 h-5 text-green-600 border-slate-300 rounded" />
                <div className="w-20 h-24 bg-slate-200 rounded-lg flex-shrink-0 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=200&h=300&fit=crop" 
                    alt="Receipt"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-slate-900">Debit Card Payment</p>
                      <p className="text-sm text-slate-600">Home Depot • Jan 15, 2025</p>
                      <p className="text-xs text-slate-500 mt-1">Card ending ****5678</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-green-700">$2,500.00</p>
                      <span className="inline-block mt-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        95% Match
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span>Same merchant • Same date • Amount matches 50% of transaction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Transaction Amount:</span>
                <span className="font-semibold text-slate-900">$5,000.00</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Selected Receipts Total:</span>
                <span className="font-semibold text-slate-900">$2,500 + $2,500 = $5,000.00</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-300">
                <span className="font-semibold text-slate-900">Match Status:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-600">Perfect Match ✓</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Accept Match (2 Receipts)
              </button>
              <button className="px-6 py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg font-semibold transition-colors">
                Review Individually
              </button>
              <button className="px-6 py-3 border-2 border-red-200 hover:border-red-300 text-red-600 rounded-lg font-semibold transition-colors">
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Additional Match Suggestion - Partial Payments */}
        <div className="bg-white rounded-xl border-2 border-yellow-200 overflow-hidden mb-6">
          <div className="bg-yellow-50 p-6 border-b-2 border-yellow-200">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-yellow-900 mb-1">Partial Payment Series Detected</h3>
                <p className="text-yellow-700">
                  AI found 3 receipts over 2 months that may match this contractor payment. Review timeline.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Transaction Being Matched */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-blue-600 mb-2">MATCHING TO TRANSACTION:</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">Contractor Payment - ABC Renovations</p>
                  <p className="text-sm text-slate-600">Mar 5, 2025 • 123 Main St</p>
                </div>
                <p className="text-2xl font-bold text-blue-600">$10,000.00</p>
              </div>
            </div>

            {/* Timeline of Receipts */}
            <div className="space-y-3 mb-6">
              <p className="text-sm font-semibold text-slate-900">Suggested Receipt Timeline (3):</p>
              
              <div className="flex items-start gap-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-yellow-600 border-slate-300 rounded" />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Deposit Payment</p>
                    <p className="text-xs text-slate-600">Jan 15, 2025 • E-Transfer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-700">$3,000</p>
                    <span className="text-xs text-yellow-600">30%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-yellow-600 border-slate-300 rounded" />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Progress Payment</p>
                    <p className="text-xs text-slate-600">Feb 10, 2025 • Cheque #1234</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-700">$4,000</p>
                    <span className="text-xs text-yellow-600">40%</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-yellow-600 border-slate-300 rounded" />
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Final Payment</p>
                    <p className="text-xs text-slate-600">Mar 5, 2025 • E-Transfer</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-700">$3,000</p>
                    <span className="text-xs text-yellow-600">30%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Transaction Amount:</span>
                <span className="font-semibold text-slate-900">$10,000.00</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Selected Receipts Total:</span>
                <span className="font-semibold text-slate-900">$3,000 + $4,000 + $3,000 = $10,000.00</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600">Date Range:</span>
                <span className="font-semibold text-slate-900">Jan 15 - Mar 5 (50 days)</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-300">
                <span className="font-semibold text-slate-900">Match Status:</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-green-600">Perfect Match ✓</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Accept Match (3 Receipts)
              </button>
              <button className="px-6 py-3 border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg font-semibold transition-colors">
                Review Timeline
              </button>
              <button className="px-6 py-3 border-2 border-red-200 hover:border-red-300 text-red-600 rounded-lg font-semibold transition-colors">
                Reject
              </button>
            </div>
          </div>
        </div>

        {/* Receipts Grid */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Receipt Card 1 - Auto-Matched */}
          <div className="bg-white rounded-xl border-2 border-green-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative aspect-[3/4] bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=600&fit=crop" 
                alt="Receipt"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <div className="bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Matched
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-slate-900">Home Depot</p>
                  <p className="text-sm text-slate-600">Jan 15, 2025</p>
                </div>
                <p className="font-bold text-slate-900">$342.50</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                <Link2 className="w-4 h-4" />
                <span className="flex-1 truncate">Plumbing Supplies</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 text-sm font-semibold text-slate-600 hover:text-slate-900 py-2">
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Receipt Card 2 - Pending Match */}
          <div className="bg-white rounded-xl border-2 border-yellow-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative aspect-[3/4] bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=600&fit=crop" 
                alt="Receipt"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <div className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  92%
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-slate-900">Enbridge Gas</p>
                  <p className="text-sm text-slate-600">Jan 12, 2025</p>
                </div>
                <p className="font-bold text-slate-900">$156.78</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 px-3 py-2 rounded-lg mb-3">
                <Clock className="w-4 h-4" />
                <span className="flex-1 truncate">Suggested: Gas Bill</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                  Accept
                </button>
                <button className="px-3 border-2 border-slate-200 hover:border-slate-300 text-slate-600 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Receipt Card 3 - Unmatched */}
          <div className="bg-white rounded-xl border-2 border-orange-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative aspect-[3/4] bg-slate-100">
              <img 
                src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=600&fit=crop" 
                alt="Receipt"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <div className="bg-orange-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  Unmatched
                </div>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-slate-900">ABC Contractors</p>
                  <p className="text-sm text-slate-600">Jan 10, 2025</p>
                </div>
                <p className="font-bold text-slate-900">$2,450.00</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-orange-700 bg-orange-50 px-3 py-2 rounded-lg mb-3">
                <AlertCircle className="w-4 h-4" />
                <span className="flex-1">No match found</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                  Match Manually
                </button>
              </div>
            </div>
          </div>

          {/* Receipt Card 4 - Processing */}
          <div className="bg-white rounded-xl border-2 border-blue-200 overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative aspect-[3/4] bg-slate-100">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-sm font-semibold text-slate-700">Processing OCR...</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <div className="bg-blue-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Processing
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-slate-400">Extracting data...</p>
                  <p className="text-sm text-slate-400">Just now</p>
                </div>
                <p className="font-bold text-slate-400">--</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-3 py-2 rounded-lg">
                <Sparkles className="w-4 h-4" />
                <span className="flex-1">AI analyzing receipt...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Load More */}
        <div className="mt-8 text-center">
          <button className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Receipts
          </button>
        </div>
      </main>
    </div>
  );
}
