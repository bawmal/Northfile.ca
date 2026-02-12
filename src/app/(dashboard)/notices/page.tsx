"use client";

import { FileText, Download, Eye, AlertCircle, CheckCircle, Calendar, Home, User, DollarSign, Sparkles, Clock, FileCheck, History, Calculator, Info } from "lucide-react";
import { useState } from "react";

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState<'n1' | 'n4'>('n1');
  const [showPreview, setShowPreview] = useState(false);
  const [n4Data, setN4Data] = useState({
    tenantName: '',
    propertyAddress: '',
    unitNumber: '',
    monthlyRent: '',
    arrearsAmount: '',
    noticeDate: '',
    terminationDate: ''
  });

  const calculateArrears = (rent: string, daysLate: number) => {
    const monthlyRent = parseFloat(rent.replace(/[^0-9.]/g, '')) || 0;
    const dailyRate = monthlyRent / 30.42; // Average days in month
    return (dailyRate * daysLate).toFixed(2);
  };

  const calculateTerminationDate = (noticeDate: string) => {
    const date = new Date(noticeDate);
    date.setDate(date.getDate() + 14); // 14 days for N4
    return date.toISOString().split('T')[0];
  };

  const generateN4Notice = () => {
    // Generate N4 notice logic
    setShowPreview(true);
  };
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
                <button 
                  onClick={() => setActiveTab('n4')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Generate N4 Notice
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden mb-8">
          <div className="border-b-2 border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('n1')}
                className={`px-6 py-4 font-semibold text-sm transition-colors ${
                  activeTab === 'n1'
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Form N1 - Rent Increase
                </div>
              </button>
              <button
                onClick={() => setActiveTab('n4')}
                className={`px-6 py-4 font-semibold text-sm transition-colors ${
                  activeTab === 'n4'
                    ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Form N4 - Non-Payment
                </div>
              </button>
            </div>
          </div>

          {/* N1 Form Content */}
          {activeTab === 'n1' && (
            <div>
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
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Increase Amount</label>
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
                          <p>
                            For a $2,000/month rent, the maximum guideline increase is <span className="font-bold">$50/month</span>. Your proposed increase of $50 (2.5%) is{' '}
                            <span className="font-bold text-green-700">within the guideline</span>.
                          </p>
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
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Rent Increase Effective Date</label>
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
          )}

          {/* N4 Form Content */}
          {activeTab === 'n4' && (
            <div>
              <div className="bg-orange-50 border-b-2 border-orange-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Form N4: Notice to End Tenancy for Non-Payment</h3>
                      <p className="text-sm text-slate-600">Complete the form below to generate your notice</p>
                    </div>
                  </div>
                  <span className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-semibold">Step 1 of 2</span>
                </div>
              </div>

              <div className="p-8">
                <div className="space-y-6">
                  {/* Property Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Select Property <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none">
                      <option>456 Oak Avenue, Ottawa, ON K1A 0B1</option>
                      <option>123 Main Street, Toronto, ON M5V 1A1</option>
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
                          placeholder="Sarah Johnson"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                          defaultValue="Sarah Johnson"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Unit Number <span className="text-slate-400 font-normal">(if applicable)</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Unit 305"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                          defaultValue="Unit 305"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rent & Arrears Details */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Calculator className="w-5 h-5" />
                      Rent & Arrears Details
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Monthly Rent <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                          <input
                            type="text"
                            placeholder="2,000"
                            className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                            defaultValue="2,000"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Days Late</label>
                        <input
                          type="number"
                          placeholder="60"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                          defaultValue="60"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Total Arrears</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                          <input
                            type="text"
                            className="w-full pl-8 pr-4 py-3 border-2 border-orange-200 rounded-lg bg-orange-50 font-bold text-orange-700"
                            value="3,944.00"
                            disabled
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Calculator className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-orange-900">
                          <p className="font-semibold mb-1">Arrears Calculation</p>
                          <p>
                            Monthly rent: $2,000 ÷ 30.42 days = $65.78/day × 60 days late = <span className="font-bold">$3,944.00</span> total arrears.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notice Dates */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Notice Dates
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Date of Notice <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                          defaultValue="2025-02-04"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Termination Date</label>
                        <input
                          type="date"
                          className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg bg-orange-50 font-bold text-orange-700"
                          value="2025-02-18"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="mt-4 bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-orange-900">
                          <p className="font-semibold mb-1">⚠ 14-Day Notice Period</p>
                          <p>Notice given on Feb 4, 2025. Termination date is Feb 18, 2025 (14 days later). This meets the RTA requirement for N4 notices.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Instructions */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Payment Instructions
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Payment Method</label>
                        <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none">
                          <option>E-transfer to landlord@email.com</option>
                          <option>Cheque to landlord address</option>
                          <option>Bank deposit (details provided)</option>
                          <option>Cash (in person only)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Landlord Contact</label>
                        <input
                          type="tel"
                          placeholder="(416) 555-1234"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:outline-none"
                          defaultValue="(416) 555-1234"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex gap-4">
                  <button
                    onClick={() => setShowPreview(true)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
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
          )}
        </div>

        {/* Notice History & Service Logs */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Notice History & Service Logs</h2>
          
          <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden">
            <div className="p-6 border-b-2 border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <History className="w-5 h-5" />
                  All Generated Notices
                </h3>
                <div className="flex items-center gap-2">
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors">
                    Export CSV
                  </button>
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-colors">
                    Filter
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">Total Notices</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">12</div>
                  <div className="text-xs text-blue-700">Last 30 days</div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-900">Served</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">8</div>
                  <div className="text-xs text-green-700">Proof of service</div>
                </div>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="font-semibold text-orange-900">Pending</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-xs text-orange-700">Awaiting service</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-4 h-4 text-slate-600" />
                    <span className="font-semibold text-slate-900">Expired</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-600">1</div>
                  <div className="text-xs text-slate-700">Past effective date</div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b-2 border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Notice</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Property/Tenant</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Effective</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {/* Notice 1 */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">N1-2025-001</div>
                          <div className="text-xs text-slate-500">Version 1.0</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">123 Main Street, Unit 201</div>
                        <div className="text-sm text-slate-600">John Smith</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">N1</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">Feb 4, 2025</td>
                    <td className="px-6 py-4 text-sm text-slate-600">May 5, 2025</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-700">Served</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <Download className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <History className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Notice 2 */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">N4-2025-003</div>
                          <div className="text-xs text-slate-500">Version 2.1</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">456 Oak Avenue</div>
                        <div className="text-sm text-slate-600">Sarah Johnson</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">N4</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">Jan 15, 2025</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Jan 29, 2025</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm font-medium text-orange-700">Pending</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <Download className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <History className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Notice 3 */}
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">N1-2024-012</div>
                          <div className="text-xs text-slate-500">Version 1.0</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">789 Maple Drive, Unit 102</div>
                        <div className="text-sm text-slate-600">Mike Chen</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">N1</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">Dec 1, 2024</td>
                    <td className="px-6 py-4 text-sm text-slate-600">Mar 1, 2025</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        <span className="text-sm font-medium text-slate-700">Expired</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <Download className="w-4 h-4 text-slate-600" />
                        </button>
                        <button className="p-1 border-2 border-slate-200 hover:border-slate-300 rounded transition-colors">
                          <History className="w-4 h-4 text-slate-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
