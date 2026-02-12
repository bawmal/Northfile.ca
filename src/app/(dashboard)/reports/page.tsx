'use client';

import { useState } from "react";
import { Download, FileText, Package, Users, Calendar, Building2, CheckCircle, AlertCircle, Sparkles, X } from "lucide-react";

export default function ReportsPage() {
  const [showT776Preview, setShowT776Preview] = useState(false);
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
              <a href="/mortgages" className="text-sm font-medium text-slate-600 hover:text-slate-900">Mortgages</a>
              <a href="/reports" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Reports</a>
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
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Reports & Exports</h1>
          <p className="text-slate-500 text-lg">Generate T776 forms and export packs for your accountant</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* T776 Generation */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Draft T776 Forms</h3>
            <p className="text-slate-500 mb-6">Generate CRA-compliant draft forms for all properties</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full">
              Generate Forms
            </button>
          </div>

          {/* Export Pack */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Accountant Export</h3>
            <p className="text-slate-500 mb-6">Complete package with ledgers, receipts, and forms</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full">
              Create Export Pack
            </button>
          </div>

          {/* Share with Accountant */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Invite Accountant</h3>
            <p className="text-slate-500 mb-6">Give your accountant read-only access to your data</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full">
              Send Invite
            </button>
          </div>
        </div>

        {/* T776 Form Generator */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-12">
          <div className="border-b border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">Generate T776 Forms</h2>
            <p className="text-slate-500">Select properties and tax year to generate draft forms</p>
          </div>

          <div className="p-6">
            {/* Form Configuration */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Tax Year</label>
                <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>2025</option>
                  <option>2024</option>
                  <option>2023</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Properties</label>
                <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none">
                  <option>All Properties (5)</option>
                  <option>123 Main Street</option>
                  <option>456 Oak Avenue</option>
                  <option>789 Maple Drive</option>
                </select>
              </div>
            </div>

            {/* Property Selection */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-900 mb-3">Select Properties:</p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-slate-200 bg-white rounded-xl hover:shadow-md cursor-pointer transition-all">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-slate-300 rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">123 Main Street</p>
                    <p className="text-sm text-slate-500">Duplex • 87 transactions • $18,200 expenses</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Ready</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-slate-200 bg-white rounded-xl hover:shadow-md cursor-pointer transition-all">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-slate-300 rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">456 Oak Avenue</p>
                    <p className="text-sm text-slate-500">Single Family • 52 transactions • $12,500 expenses</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Ready</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 border border-yellow-200 bg-white rounded-xl hover:shadow-md cursor-pointer transition-all">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-slate-300 rounded" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">789 Maple Drive</p>
                    <p className="text-sm text-slate-500">Basement Apartment • 34 transactions • $5,800 expenses</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="text-xs font-medium text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full">3 Missing Receipts</span>
                  </div>
                </label>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-slate-900 mb-2">AI-Powered T776 Form Generation</h4>
                  <p className="text-sm text-slate-500 mb-6">
                    Complete income and expense categorization ready for CRA T776 forms. All transactions automatically classified with 95% confidence.
                  </p>
                  
                  {/* Income & Expense Summary */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-500 font-medium mb-3">PART 1: INCOME</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Gross Rents</span>
                          <span className="font-semibold text-slate-900">$46,800</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Other Income</span>
                          <span className="font-semibold text-slate-900">$1,200</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-200">
                          <span className="font-semibold text-slate-900">Total Income</span>
                          <span className="font-bold text-green-600">$48,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                      <p className="text-xs text-slate-500 font-medium mb-3">PART 2: EXPENSES</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Current Expenses</span>
                          <span className="font-semibold text-slate-900">$40,150</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Capital Additions</span>
                          <span className="font-semibold text-slate-900">$2,200</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-slate-200">
                          <span className="font-semibold text-slate-900">Total Expenses</span>
                          <span className="font-bold text-orange-600">$42,350</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Net Income Calculation */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Net Before CCA</span>
                        <span className="font-semibold text-slate-900">$5,650</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">CCA (Optional)</span>
                        <span className="font-semibold text-slate-900">-$2,400</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-blue-200">
                        <span className="font-bold text-slate-900">Net Rental Income</span>
                        <span className="font-bold text-blue-600 text-lg">$3,250</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>247 transactions categorized • 95% AI confidence • Ready to generate</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <button 
                onClick={() => setShowT776Preview(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Generate T776 Forms (3 Properties)
              </button>
            </div>
          </div>
        </div>

        {/* Previous Reports */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-xl font-bold text-slate-900">Previous Reports</h2>
          </div>
          <div className="divide-y divide-slate-200">
            {/* Report Item 1 */}
            <div className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">T776 Forms - 2024 Tax Year</h3>
                    <p className="text-sm text-slate-600">Generated Jan 15, 2025 • 5 properties • 247 transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Complete</span>
                  <button className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Report Item 2 */}
            <div className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Accountant Export Pack - 2024</h3>
                    <p className="text-sm text-slate-600">Generated Jan 15, 2025 • Includes ledgers, receipts, and forms</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Complete</span>
                  <button className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download ZIP
                  </button>
                </div>
              </div>
            </div>

            {/* Report Item 3 */}
            <div className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">T776 Forms - 2023 Tax Year</h3>
                    <p className="text-sm text-slate-600">Generated Feb 10, 2024 • 4 properties • 198 transactions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">Complete</span>
                  <button className="border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* T776 Preview Modal */}
      {showT776Preview && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="border-b border-slate-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">T776 Form Preview</h2>
                <p className="text-sm text-slate-500 mt-1">Draft watermarked form - 123 Main Street</p>
              </div>
              <button 
                onClick={() => setShowT776Preview(false)}
                className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Modal Body - Scrollable T776 Form */}
            <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
              <div className="bg-white border-2 border-slate-300 rounded-lg p-8 max-w-3xl mx-auto shadow-lg relative">
                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                  <span className="text-8xl font-bold text-slate-900 rotate-[-45deg]">DRAFT</span>
                </div>

                {/* CRA Header */}
                <div className="border-b-2 border-slate-900 pb-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900">Statement of Real Estate Rentals</h1>
                      <p className="text-sm text-slate-600 mt-1">Protected B when completed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-slate-900">T776</p>
                      <p className="text-sm text-slate-600">2025</p>
                    </div>
                  </div>
                </div>

                {/* Identification */}
                <div className="mb-6 bg-slate-50 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-3">Identification</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Your name:</p>
                      <p className="font-semibold text-slate-900">John Landlord</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Social insurance number:</p>
                      <p className="font-semibold text-slate-900">XXX-XXX-XXX</p>
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                <div className="mb-6 border-2 border-slate-200 p-4 rounded-lg">
                  <h3 className="font-bold text-slate-900 mb-3">Property Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Address:</span>
                      <span className="font-semibold text-slate-900">456 Oak Avenue, Ottawa, ON K1A 0B1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Property type:</span>
                      <span className="font-semibold text-slate-900">Single Family</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Number of units:</span>
                      <span className="font-semibold text-slate-900">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Your percentage of ownership:</span>
                      <span className="font-semibold text-slate-900">50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Co-owner:</span>
                      <span className="font-semibold text-slate-900">Sarah Johnson (50%)</span>
                    </div>
                  </div>
                  
                  {/* Rental Period Notice */}
                  <div className="mt-3 pt-3 border-t border-slate-200 bg-yellow-50 -mx-4 -mb-4 p-4 rounded-b-lg">
                    <p className="text-xs font-semibold text-yellow-900 mb-1">⚠️ Partial Year Rental</p>
                    <div className="text-xs text-yellow-800 space-y-1">
                      <p>• Personal use: Jan 1 - Nov 30, 2024 (334 days / 91.5%)</p>
                      <p>• Rental use: Dec 1 - Dec 31, 2024 (31 days / 8.5%)</p>
                      <p className="font-semibold mt-2">All expenses prorated to rental period and ownership %</p>
                    </div>
                  </div>
                </div>

                {/* Part 1: Income */}
                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 bg-slate-100 p-3 rounded-t-lg">Part 1: Income</h3>
                  <div className="border-2 border-slate-200 border-t-0 rounded-b-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Gross rents</span>
                        <span className="font-semibold text-slate-900">$46,800.00</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-slate-200">
                        <span className="text-slate-600">Other rental income</span>
                        <span className="font-semibold text-slate-900">$1,200.00</span>
                      </div>
                      <div className="flex justify-between py-3 bg-green-50 px-3 rounded-lg mt-2">
                        <span className="font-bold text-slate-900">Total income</span>
                        <span className="font-bold text-green-700 text-lg">$48,000.00</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Part 2: Expenses */}
                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 bg-slate-100 p-3 rounded-t-lg">Part 2: Expenses</h3>
                  <div className="border-2 border-slate-200 border-t-0 rounded-b-lg p-4">
                    {/* Expense Table with Proration */}
                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 border-b-2 border-slate-300">
                            <th className="text-left p-2 font-semibold text-slate-900">Expense Category</th>
                            <th className="text-right p-2 font-semibold text-slate-900">Total Cost<br/>(Full Year)</th>
                            <th className="text-right p-2 font-semibold text-slate-900">Personal<br/>(91.5%)</th>
                            <th className="text-right p-2 font-semibold text-slate-900">Rental<br/>(8.5% × 50%)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="hover:bg-slate-50">
                            <td className="p-2 text-slate-700">Property taxes</td>
                            <td className="p-2 text-right text-slate-900">$6,000</td>
                            <td className="p-2 text-right text-slate-400">$5,490</td>
                            <td className="p-2 text-right text-slate-900 font-semibold">$255</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-2 text-slate-700">Insurance</td>
                            <td className="p-2 text-right text-slate-900">$2,400</td>
                            <td className="p-2 text-right text-slate-400">$2,196</td>
                            <td className="p-2 text-right text-slate-900 font-semibold">$102</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-2 text-slate-700">Utilities</td>
                            <td className="p-2 text-right text-slate-900">$3,600</td>
                            <td className="p-2 text-right text-slate-400">$3,294</td>
                            <td className="p-2 text-right text-slate-900 font-semibold">$153</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-2 text-slate-700">Repairs & maintenance</td>
                            <td className="p-2 text-right text-slate-900">$1,200</td>
                            <td className="p-2 text-right text-slate-400">$1,098</td>
                            <td className="p-2 text-right text-slate-900 font-semibold">$51</td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                            <td className="p-2 text-slate-700">Mortgage interest</td>
                            <td className="p-2 text-right text-slate-900">$18,000</td>
                            <td className="p-2 text-right text-slate-400">$16,470</td>
                            <td className="p-2 text-right text-slate-900 font-semibold">$765</td>
                          </tr>
                          <tr className="bg-slate-50 font-semibold border-t-2 border-slate-300">
                            <td className="p-2 text-slate-900">Total Expenses</td>
                            <td className="p-2 text-right text-slate-900">$31,200</td>
                            <td className="p-2 text-right text-slate-500">$28,548</td>
                            <td className="p-2 text-right text-orange-700 text-sm">$1,326</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Calculation Explanation */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs">
                      <p className="font-semibold text-blue-900 mb-2">📊 How expenses are calculated:</p>
                      <div className="space-y-1 text-blue-800">
                        <p><span className="font-semibold">Step 1:</span> Total annual expense (full year amount)</p>
                        <p><span className="font-semibold">Step 2:</span> Personal portion = Total × 91.5% (Jan-Nov personal use)</p>
                        <p><span className="font-semibold">Step 3:</span> Rental portion = Total × 8.5% (Dec rental) × 50% (your ownership)</p>
                        <p className="mt-2 pt-2 border-t border-blue-200 font-semibold">Example: Property taxes $6,000 × 8.5% × 50% = $255 deductible</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Net Income Calculation */}
                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 bg-slate-100 p-3 rounded-t-lg">Net Income (Loss)</h3>
                  <div className="border-2 border-slate-200 border-t-0 rounded-b-lg p-4">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-2">
                        <span className="text-slate-600">Rental income (Dec only, 50% ownership)</span>
                        <span className="font-semibold text-slate-900">$1,625.00</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-600">Total rental expenses (prorated)</span>
                        <span className="font-semibold text-slate-900">$1,326.00</span>
                      </div>
                      <div className="flex justify-between py-2 border-t border-slate-200 pt-2">
                        <span className="text-slate-600">Net income before CCA</span>
                        <span className="font-semibold text-slate-900">$299.00</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-slate-600">Capital cost allowance (CCA) - Optional</span>
                        <span className="font-semibold text-slate-900">$85.00</span>
                      </div>
                      <div className="flex justify-between py-3 bg-blue-50 px-3 rounded-lg mt-2 border-t-2 border-blue-300">
                        <span className="font-bold text-slate-900 text-base">Net rental income (Your 50%)</span>
                        <span className="font-bold text-blue-700 text-xl">$214.00</span>
                      </div>
                    </div>
                    
                    {/* Important Note */}
                    <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs">
                      <p className="font-semibold text-yellow-900 mb-1">⚠️ Important for Co-Owners:</p>
                      <p className="text-yellow-800">Sarah Johnson (your co-owner) will file a separate T776 with the same amounts. Each owner reports their 50% share on their own tax return.</p>
                    </div>
                  </div>
                </div>

                {/* Part 3: CCA Schedule */}
                <div className="mb-6">
                  <h3 className="font-bold text-slate-900 bg-slate-100 p-3 rounded-t-lg">Part 3: Capital Cost Allowance (CCA)</h3>
                  <div className="border-2 border-slate-200 border-t-0 rounded-b-lg p-4">
                    {/* Area A - CCA Calculation */}
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-slate-900 mb-3 bg-slate-50 p-2 rounded">Area A: CCA Calculation by Class</h4>
                      
                      {/* Half-Year Rule Notice */}
                      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-3 text-xs">
                        <p className="font-semibold text-yellow-900 mb-1">⚠️ Half-Year Rule Applies</p>
                        <p className="text-yellow-800">
                          Since this is the <span className="font-semibold">first year</span> you're claiming CCA on the refrigerator, 
                          only <span className="font-semibold">half the normal rate</span> applies (20% × 50% = 10% effective rate).
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-xs border-collapse">
                          <thead>
                            <tr className="bg-slate-100 border-b-2 border-slate-300">
                              <th className="text-left p-2 font-semibold text-slate-900">Class</th>
                              <th className="text-left p-2 font-semibold text-slate-900">Description</th>
                              <th className="text-right p-2 font-semibold text-slate-900">Rate</th>
                              <th className="text-right p-2 font-semibold text-slate-900">UCC Start</th>
                              <th className="text-right p-2 font-semibold text-slate-900">Additions</th>
                              <th className="text-right p-2 font-semibold text-slate-900">CCA</th>
                              <th className="text-right p-2 font-semibold text-slate-900">UCC End</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            <tr className="hover:bg-slate-50">
                              <td className="p-2 font-semibold text-slate-900">1</td>
                              <td className="p-2 text-slate-600">Building (post-1987)</td>
                              <td className="p-2 text-right text-slate-900">4%</td>
                              <td className="p-2 text-right text-slate-900">$48,000</td>
                              <td className="p-2 text-right text-slate-900">$0</td>
                              <td className="p-2 text-right text-slate-900">$1,920</td>
                              <td className="p-2 text-right text-slate-900">$46,080</td>
                            </tr>
                            <tr className="hover:bg-slate-50 bg-yellow-50">
                              <td className="p-2 font-semibold text-slate-900">8</td>
                              <td className="p-2 text-slate-600">
                                Appliances & furniture
                                <span className="ml-2 text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full">1st year</span>
                              </td>
                              <td className="p-2 text-right text-slate-900">
                                20%
                                <div className="text-xs text-yellow-700">× 50%</div>
                              </td>
                              <td className="p-2 text-right text-slate-900">$2,200</td>
                              <td className="p-2 text-right text-slate-900">$800</td>
                              <td className="p-2 text-right text-slate-900">$480</td>
                              <td className="p-2 text-right text-slate-900">$2,520</td>
                            </tr>
                            <tr className="bg-slate-50 font-semibold border-t-2 border-slate-300">
                              <td className="p-2" colSpan={5}>Total CCA Claimed</td>
                              <td className="p-2 text-right text-slate-900">$2,400</td>
                              <td className="p-2"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Area B - Equipment Additions */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-slate-900 mb-3 bg-slate-50 p-2 rounded">Area B: Equipment Additions in the Year</h4>
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-100 border-b border-slate-200">
                              <th className="text-left p-2 font-semibold text-slate-900">Class</th>
                              <th className="text-left p-2 font-semibold text-slate-900">Property Details</th>
                              <th className="text-right p-2 font-semibold text-slate-900">Total Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-slate-200">
                              <td className="p-2 font-semibold text-slate-900">8</td>
                              <td className="p-2 text-slate-600">Refrigerator - Unit 2</td>
                              <td className="p-2 text-right text-slate-900">$800.00</td>
                            </tr>
                            <tr className="bg-slate-50 font-semibold">
                              <td className="p-2" colSpan={2}>Total Equipment Additions</td>
                              <td className="p-2 text-right text-slate-900">$800.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Area C - Building Additions */}
                    <div className="mb-4">
                      <h4 className="text-sm font-bold text-slate-900 mb-3 bg-slate-50 p-2 rounded">Area C: Building Additions in the Year</h4>
                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-100 border-b border-slate-200">
                              <th className="text-left p-2 font-semibold text-slate-900">Class</th>
                              <th className="text-left p-2 font-semibold text-slate-900">Property Details</th>
                              <th className="text-right p-2 font-semibold text-slate-900">Total Cost</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="bg-slate-50 font-semibold">
                              <td className="p-2" colSpan={2}>Total Building Additions</td>
                              <td className="p-2 text-right text-slate-900">$0.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-slate-500 mt-2 italic">No building additions this year</p>
                    </div>

                    {/* CCA Warning - ACB Impact */}
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mt-4">
                      <div className="flex items-start gap-3">
                        <div className="text-2xl">⚠️</div>
                        <div className="flex-1">
                          <p className="font-bold text-red-900 mb-2">Important: CCA Reduces Your Adjusted Cost Base (ACB)</p>
                          <p className="text-sm text-red-800 mb-3">
                            CCA is <span className="font-semibold">optional</span>. While it reduces your taxes now, 
                            it also <span className="font-semibold">increases your capital gains</span> when you sell the property.
                          </p>
                          
                          <div className="bg-white rounded-lg p-3 mb-3">
                            <p className="text-xs font-semibold text-slate-900 mb-2">Example: Impact on Future Sale</p>
                            <div className="space-y-1 text-xs text-slate-700">
                              <div className="flex justify-between">
                                <span>Original building value:</span>
                                <span className="font-semibold">$400,000</span>
                              </div>
                              <div className="flex justify-between text-red-700">
                                <span>CCA claimed over 5 years:</span>
                                <span className="font-semibold">-$12,000</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-slate-200">
                                <span className="font-semibold">Adjusted cost base (ACB):</span>
                                <span className="font-semibold">$388,000</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-slate-200 text-red-900">
                                <span className="font-semibold">Extra capital gain:</span>
                                <span className="font-semibold">$12,000</span>
                              </div>
                              <div className="flex justify-between text-red-900">
                                <span>Additional tax owed (~25%):</span>
                                <span className="font-semibold">~$3,000</span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                            <p className="text-xs font-semibold text-blue-900 mb-1">💡 When to claim CCA:</p>
                            <ul className="text-xs text-blue-800 space-y-1 ml-4">
                              <li>• You need to reduce taxable income this year</li>
                              <li>• You plan to hold the property long-term (10+ years)</li>
                              <li>• Your current tax rate is higher than expected future rate</li>
                            </ul>
                          </div>

                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-xs font-semibold text-green-900 mb-1">💡 When NOT to claim CCA:</p>
                            <ul className="text-xs text-green-800 space-y-1 ml-4">
                              <li>• You're already in a low tax bracket</li>
                              <li>• You plan to sell the property soon</li>
                              <li>• You want to minimize future capital gains tax</li>
                            </ul>
                          </div>

                          <p className="text-xs text-red-700 mt-3 italic">
                            Consult with your accountant to determine if claiming CCA makes sense for your situation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Note */}
                <div className="mt-8 pt-4 border-t-2 border-slate-200 text-xs text-slate-500 text-center">
                  <p className="font-semibold text-slate-700 mb-1">DRAFT WATERMARKED FORM</p>
                  <p>This is a draft preview generated by Northfile. Review all values before submitting to CRA.</p>
                  <p className="mt-2">Generated on {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-slate-200 p-6 flex items-center justify-between bg-slate-50">
              <div className="text-sm text-slate-600">
                <p className="font-semibold text-slate-900">Next steps:</p>
                <p>Review all values, then download the complete PDF package</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowT776Preview(false)}
                  className="border-2 border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Close Preview
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Chat Assistant - Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110 flex items-center gap-2 group">
          <Sparkles className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap font-semibold">
            Ask AI about T776
          </span>
        </button>
        
        {/* Chat Preview Tooltip */}
        <div className="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl border-2 border-purple-200 p-4 w-80 hidden group-hover:block">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 mb-1">AI Assistant</p>
              <p className="text-xs text-slate-600">Ask me anything about your T776 form, proration, or co-ownership!</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            <button className="w-full text-left p-2 hover:bg-purple-50 rounded-lg text-slate-700">
              "Why is my property tax only $255?"
            </button>
            <button className="w-full text-left p-2 hover:bg-purple-50 rounded-lg text-slate-700">
              "How does co-ownership affect my T776?"
            </button>
            <button className="w-full text-left p-2 hover:bg-purple-50 rounded-lg text-slate-700">
              "What is proration and why do I need it?"
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
