import { Building2, FileText, Receipt, TrendingUp, AlertCircle, CheckCircle, Clock, Sparkles } from "lucide-react";

export default function DashboardPage() {
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
              <a href="/dashboard" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">
                Dashboard
              </a>
              <a href="/properties" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Properties
              </a>
              <a href="/transactions" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Transactions
              </a>
              <a href="/receipts" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Receipts
              </a>
              <a href="/reports" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Reports
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900">John Landlord</p>
                <p className="text-xs text-slate-500">5 Properties</p>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                JL
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section - Minimalist */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-2">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome back, John 👋</h1>
              <p className="text-slate-500 text-lg">Here's your portfolio overview for 2025</p>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Tax Year</p>
                <p className="text-2xl font-bold text-slate-900">2025</p>
              </div>
              <div className="w-px h-12 bg-slate-200"></div>
              <div className="text-right">
                <p className="text-xs text-slate-500 mb-1">Days to Deadline</p>
                <p className="text-2xl font-bold text-slate-900">89</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {/* Total Properties */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                Active
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">5</p>
            <p className="text-sm text-slate-500">Properties</p>
          </div>

          {/* YTD Income */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                +12%
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">$48,000</p>
            <p className="text-sm text-slate-500">Total Income</p>
          </div>

          {/* YTD Expenses */}
          <div className="group bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full">
                +8%
              </span>
            </div>
            <p className="text-3xl font-bold text-slate-900 mb-1">$42,350</p>
            <p className="text-sm text-slate-500">Total Expenses</p>
          </div>

          {/* Net Income */}
          <div className="group bg-blue-600 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-medium text-white bg-white/20 px-2.5 py-1 rounded-full">
                Before CCA
              </span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">$5,650</p>
            <p className="text-sm text-blue-100">Net Income</p>
          </div>
        </div>

        {/* Income vs Expenses Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-12">
          <div className="p-8 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Financial Summary</h2>
            <p className="text-slate-500">2025 year-to-date breakdown</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Income Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Income</h3>
                <span className="text-3xl font-bold text-green-600">$48,000</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">Gross Rents</p>
                    <p className="text-xs text-slate-600">Monthly rent payments</p>
                  </div>
                  <span className="font-bold text-green-700">$46,800</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">Other Income</p>
                    <p className="text-xs text-slate-600">Parking, laundry, late fees</p>
                  </div>
                  <span className="font-bold text-green-700">$1,200</span>
                </div>
              </div>
            </div>
            
            {/* Expenses Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Expenses</h3>
                <span className="text-3xl font-bold text-orange-600">$42,350</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">Mortgage Interest</p>
                    <p className="text-xs text-slate-600">Deductible portion only</p>
                  </div>
                  <span className="font-bold text-orange-700">$18,000</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">Other Operating Expenses</p>
                    <p className="text-xs text-slate-600">Repairs, utilities, taxes, etc.</p>
                  </div>
                  <span className="font-bold text-orange-700">$22,150</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-900">Capital Additions</p>
                    <p className="text-xs text-slate-600">Added to CCA schedule</p>
                  </div>
                  <span className="font-bold text-purple-700">$2,200</span>
                </div>
                
                <div className="mt-3 p-3 bg-slate-100 border border-slate-200 rounded-lg">
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold">💡 Note:</span> Principal payments ($12,000 YTD) not shown - not tax deductible
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Net Income Calculation */}
          <div className="border-t border-slate-100 p-8 bg-slate-50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">Net Income Before CCA</span>
                <span className="text-2xl font-bold text-blue-600">$5,650</span>
              </div>
              
              {/* CCA Section - Optional */}
              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-semibold text-purple-900">CCA Available (Optional)</p>
                    <p className="text-xs text-purple-600">4% of $60,000 building value • Not claimed</p>
                  </div>
                  <span className="text-lg font-bold text-purple-900">$2,400</span>
                </div>
                <label className="flex items-center gap-2 text-sm text-purple-700 cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Claim CCA this year to reduce taxable income?</span>
                </label>
                <p className="text-xs text-purple-600 mt-2">
                  ⚠️ Optional deduction - Reduces taxes now but increases capital gains when you sell
                </p>
              </div>
              
              {/* Final Net Income - Without CCA by Default */}
              <div className="pt-4 border-t-2 border-slate-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-slate-900">Net Rental Income (Taxable)</span>
                  <span className="text-3xl font-bold text-green-600">$5,650</span>
                </div>
                <p className="text-xs text-slate-500">CCA not claimed • Check box above to reduce by $2,400</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items & Recent Activity */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Action Items */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Action Items</h2>
              <p className="text-sm text-slate-600">Tasks that need your attention</p>
            </div>
            <div className="divide-y divide-slate-200">
              {/* AI Classification Review */}
              <div className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">Review AI Classifications</h3>
                      <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                        AI
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      12 transactions auto-categorized and ready for your review
                    </p>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                      Review Now →
                    </button>
                  </div>
                </div>
              </div>

              {/* Receipt Matching */}
              <div className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">Match Receipts</h3>
                      <span className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full">
                        8 Pending
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      8 receipts uploaded but not yet matched to transactions
                    </p>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                      Match Receipts →
                    </button>
                  </div>
                </div>
              </div>

              {/* Missing Receipts */}
              <div className="p-6 hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Receipt className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-slate-900">Missing Receipts</h3>
                      <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                        5 Items
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      5 transactions over $100 need receipt attachments
                    </p>
                    <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                      Upload Receipts →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">Recent Activity</h2>
              <p className="text-sm text-slate-600">Latest updates across your portfolio</p>
            </div>
            <div className="divide-y divide-slate-200">
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">
                      <span className="font-semibold">15 transactions</span> auto-categorized by AI
                    </p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">
                      <span className="font-semibold">12 receipts</span> uploaded and matched
                    </p>
                    <p className="text-xs text-slate-500">5 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">
                      CSV imported: <span className="font-semibold">January 2025 Bank Statement</span>
                    </p>
                    <p className="text-xs text-slate-500">Yesterday at 3:24 PM</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900 mb-1">
                      Property added: <span className="font-semibold">123 Main St, Unit 2B</span>
                    </p>
                    <p className="text-xs text-slate-500">2 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-2">Ready for tax season?</h2>
          <p className="text-blue-100 mb-6">Generate your draft T776 forms and export packs</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Generate T776
            </button>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors">
              Create Export Pack
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Invite Accountant
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
