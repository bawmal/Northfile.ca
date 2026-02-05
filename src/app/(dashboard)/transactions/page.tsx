import { Upload, Filter, Download, Sparkles, CheckCircle, AlertCircle, Receipt, Eye, Edit2, Trash2 } from "lucide-react";

export default function TransactionsPage() {
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
              <a href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Dashboard
              </a>
              <a href="/properties" className="text-sm font-medium text-slate-600 hover:text-slate-900">
                Properties
              </a>
              <a href="/transactions" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">
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
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              JL
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Transactions</h1>
          <p className="text-slate-500 text-lg">Review and categorize your rental income and expenses</p>
        </div>

        {/* AI Smart Alert - Proration Explanation */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6 mb-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-bold text-blue-900">🤖 AI Notice: Partial Year Rental Detected</h3>
              <span className="text-xs font-semibold text-blue-700 bg-blue-200 px-2 py-1 rounded-full">456 Oak Avenue</span>
            </div>
            <p className="text-blue-800 mb-3">
              I noticed this property was only rented for <span className="font-bold">1 month in 2024</span> (Dec 1-31). 
              I'm automatically prorating all expenses to match your rental period and 50% ownership.
            </p>
            <div className="bg-white border border-blue-200 rounded-lg p-4 mb-3">
              <p className="text-sm font-semibold text-blue-900 mb-2">Example: Property Tax Payment</p>
              <div className="space-y-1 text-sm text-blue-800">
                <div className="flex justify-between">
                  <span>Annual property tax paid:</span>
                  <span className="font-semibold">$6,000</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>× Rental period (8.5% of year):</span>
                  <span className="font-semibold">$510</span>
                </div>
                <div className="flex justify-between text-blue-600">
                  <span>× Your ownership (50%):</span>
                  <span className="font-semibold">$255</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-blue-200 text-blue-900 font-bold">
                  <span>Your deductible amount:</span>
                  <span className="text-green-700">$255</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-sm font-semibold text-blue-700 hover:text-blue-800 underline">
                Learn more about proration
              </button>
              <button className="text-sm font-semibold text-blue-700 hover:text-blue-800">
                Dismiss
              </button>
            </div>
          </div>
        </div>

        {/* AI Review Alert */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
          <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-1">12 Transactions Auto-Categorized by AI</h3>
            <p className="text-slate-600 mb-4">
              Our AI has automatically categorized 12 new transactions. Review the suggestions below and accept or modify as needed.
            </p>
            <div className="flex gap-3">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                Accept All High Confidence
              </button>
              <button className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-5 py-2 rounded-lg font-medium transition-colors">
                Review One by One
              </button>
            </div>
          </div>
        </div>

        {/* Type Filter Tabs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <button className="px-5 py-2 bg-slate-900 text-white rounded-lg font-medium">
              All (247)
            </button>
            <button className="px-5 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Income (47)
            </button>
            <button className="px-5 py-2 bg-white text-slate-600 border border-slate-200 rounded-lg font-medium hover:bg-slate-50">
              Expenses (200)
            </button>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg font-medium transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors ml-auto">
                <Upload className="w-4 h-4" />
                Import Transactions
              </button>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none">
                <option>All Properties</option>
                <option>123 Main St</option>
                <option>456 Oak Ave</option>
              </select>
              <select className="px-4 py-2.5 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none">
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Table Header */}
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded" />
                <span className="text-sm font-semibold text-slate-900">247 Transactions</span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  12 AI Pending
                </span>
                <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  5 Missing Receipts
                </span>
              </div>
              <div className="text-sm text-slate-600">
                Showing 1-20 of 247
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="divide-y divide-slate-200">
            {/* Income Transaction Row 1 - Gross Rent */}
            <div className="px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded" />
                <div className="w-1 h-12 bg-green-600 rounded-full"></div>
                
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-slate-900">Jan 1, 2025</p>
                    <p className="text-xs text-slate-500">123 Main St</p>
                  </div>
                  
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-slate-900">Rent Payment - Unit 1A</p>
                    <p className="text-xs text-slate-500">E-Transfer from John Tenant</p>
                  </div>
                  
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-green-600">+$1,950</p>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 border-2 border-green-200 bg-white rounded-lg text-sm font-medium text-green-900 focus:border-green-500 focus:outline-none">
                        <option>Gross Rents</option>
                        <option>Other Income</option>
                      </select>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">Income • Verified</p>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="flex items-center gap-1 text-green-600">
                      <Receipt className="w-4 h-4" />
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Income Transaction Row 2 - Other Income */}
            <div className="px-6 py-4 bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded" />
                <div className="w-1 h-12 bg-green-600 rounded-full"></div>
                
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-slate-900">Jan 5, 2025</p>
                    <p className="text-xs text-slate-500">456 Oak Ave</p>
                  </div>
                  
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-slate-900">Parking Fee - January</p>
                    <p className="text-xs text-slate-500">Monthly parking rental</p>
                  </div>
                  
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-green-600">+$100</p>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 border-2 border-green-200 bg-green-50 rounded-lg text-sm font-medium text-green-900 focus:border-green-500 focus:outline-none">
                        <option>Other Income</option>
                        <option>Gross Rents</option>
                      </select>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-green-600" />
                        <span className="text-xs font-semibold text-green-600">92%</span>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">Income • AI suggested</p>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="flex items-center gap-1 text-slate-400">
                      <Receipt className="w-4 h-4" />
                      <AlertCircle className="w-3 h-3" />
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mortgage Payment Row - Split Transaction */}
            <div className="px-6 py-4 bg-blue-50 border-l-4 border-blue-500 hover:bg-blue-100 transition-colors">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded" />
                
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  {/* Date */}
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-slate-900">Jan 1, 2025</p>
                    <p className="text-xs text-slate-500">123 Main St</p>
                  </div>
                  
                  {/* Description */}
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-slate-900">TD Bank - Mortgage Payment</p>
                    <p className="text-xs text-slate-500">Pre-Authorized Payment</p>
                    <div className="mt-2 space-y-1 text-xs bg-white/60 rounded p-2 border border-blue-200">
                      <div className="flex justify-between">
                        <span className="text-green-700">• Interest (deductible)</span>
                        <span className="font-semibold text-green-700">$1,500.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">• Principal (not deductible)</span>
                        <span className="font-semibold text-slate-500">$1,000.00</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Amount */}
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-slate-900">$2,500.00</p>
                    <p className="text-xs text-blue-600 mt-1">Split</p>
                  </div>
                  
                  {/* Category */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 border-2 border-blue-200 bg-white rounded-lg text-sm font-medium text-blue-900 focus:border-blue-500 focus:outline-none">
                        <option>Interest & Bank Charges</option>
                        <option>Other</option>
                      </select>
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-xs text-blue-600 mt-1">Mortgage • Auto-split</p>
                  </div>
                  
                  {/* Receipt Status */}
                  <div className="col-span-1">
                    <div className="flex items-center gap-1 text-green-600">
                      <Receipt className="w-4 h-4" />
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="col-span-1 flex items-center gap-2">
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-white rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Row 1 - AI Suggested Expense */}
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded" />
                
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  {/* Date */}
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-slate-900">Jan 15, 2025</p>
                    <p className="text-xs text-slate-500">123 Main St</p>
                  </div>
                  
                  {/* Description */}
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-slate-900">Home Depot - Plumbing Supplies</p>
                    <p className="text-xs text-slate-500">Debit Card ****1234</p>
                  </div>
                  
                  {/* Amount */}
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-slate-900">$342.50</p>
                  </div>
                  
                  {/* Category - AI Suggested */}
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 border-2 border-purple-200 bg-purple-50 rounded-lg text-sm font-medium text-purple-900 focus:border-purple-500 focus:outline-none">
                        <option>Repairs & Maintenance</option>
                        <option>Office Expenses</option>
                        <option>Utilities</option>
                        <option>Property Taxes</option>
                      </select>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-semibold text-purple-600">95%</span>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 mt-1">AI suggested • Click to review</p>
                  </div>
                  
                  {/* Receipt Status */}
                  <div className="col-span-1">
                    <div className="flex items-center gap-1 text-green-600">
                      <Receipt className="w-4 h-4" />
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="col-span-1 flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Row 2 - Verified */}
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded" />
                
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-slate-900">Jan 12, 2025</p>
                    <p className="text-xs text-slate-500">456 Oak Ave</p>
                  </div>
                  
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-slate-900">Enbridge Gas - Monthly Bill</p>
                    <p className="text-xs text-slate-500">Pre-Authorized Payment</p>
                  </div>
                  
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-slate-900">$156.78</p>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none">
                        <option>Utilities</option>
                        <option>Repairs & Maintenance</option>
                        <option>Office Expenses</option>
                      </select>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">Verified by you</p>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="flex items-center gap-1 text-green-600">
                      <Receipt className="w-4 h-4" />
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Row 3 - Missing Receipt */}
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded" />
                
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-slate-900">Jan 10, 2025</p>
                    <p className="text-xs text-slate-500">123 Main St</p>
                  </div>
                  
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-slate-900">ABC Contractors - Roof Repair</p>
                    <p className="text-xs text-slate-500">E-Transfer</p>
                  </div>
                  
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-slate-900">$2,450.00</p>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-lg text-sm font-medium text-slate-900 focus:border-blue-500 focus:outline-none">
                        <option>Repairs & Maintenance</option>
                        <option>Capital Improvement</option>
                      </select>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-1">Verified by you</p>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="flex items-center gap-1 text-orange-600">
                      <Receipt className="w-4 h-4" />
                      <AlertCircle className="w-3 h-3" />
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Row 4 - Low Confidence AI */}
            <div className="px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-slate-300 rounded" />
                
                <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-slate-900">Jan 8, 2025</p>
                    <p className="text-xs text-slate-500">456 Oak Ave</p>
                  </div>
                  
                  <div className="col-span-4">
                    <p className="text-sm font-medium text-slate-900">Staples - Office Supplies</p>
                    <p className="text-xs text-slate-500">Credit Card ****5678</p>
                  </div>
                  
                  <div className="col-span-1">
                    <p className="text-sm font-semibold text-slate-900">$87.32</p>
                  </div>
                  
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <select className="flex-1 px-3 py-2 border-2 border-yellow-200 bg-yellow-50 rounded-lg text-sm font-medium text-yellow-900 focus:border-yellow-500 focus:outline-none">
                        <option>Office Expenses</option>
                        <option>Repairs & Maintenance</option>
                        <option>Other Expenses</option>
                      </select>
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs font-semibold text-yellow-600">68%</span>
                      </div>
                    </div>
                    <p className="text-xs text-yellow-600 mt-1">AI suggested • Low confidence</p>
                  </div>
                  
                  <div className="col-span-1">
                    <div className="flex items-center gap-1 text-green-600">
                      <Receipt className="w-4 h-4" />
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex items-center gap-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Footer */}
          <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
            <div className="flex items-center justify-between">
              <button className="px-4 py-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg text-sm font-semibold text-slate-700 transition-colors">
                Previous
              </button>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 bg-blue-600 text-white rounded-lg text-sm font-semibold">1</button>
                <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-sm font-semibold text-slate-700">2</button>
                <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-sm font-semibold text-slate-700">3</button>
                <span className="text-slate-500">...</span>
                <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-sm font-semibold text-slate-700">13</button>
              </div>
              <button className="px-4 py-2 border-2 border-slate-200 hover:border-slate-300 rounded-lg text-sm font-semibold text-slate-700 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
