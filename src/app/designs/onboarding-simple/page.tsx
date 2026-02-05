'use client';

import { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Check, X, Calendar, Home, Users, DollarSign, Building } from 'lucide-react';

export default function OnboardingWizardSimple() {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-slate-900"></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Progress Bar */}
        <div className="h-2 bg-slate-200">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Add New Property</h2>
                <p className="text-blue-100 text-sm">Step {step} of {totalSteps} • ~2 minutes</p>
              </div>
            </div>
            <button className="text-white/80 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-8">
          {/* Step 1: Property Basics */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Property Basics</h3>
                  <p className="text-slate-600">Basic information about your rental property</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Property Nickname <span className="text-slate-400 font-normal">(optional)</span></label>
                  <input 
                    type="text" 
                    placeholder="e.g., Oak Avenue Duplex"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Property Address <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="456 Oak Avenue"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                    defaultValue="456 Oak Avenue"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">City <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="Ottawa"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      defaultValue="Ottawa"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Postal Code <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      placeholder="K1A 0B1"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      defaultValue="K1A 0B1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Property Type <span className="text-red-500">*</span></label>
                    <select className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none">
                      <option>House</option>
                      <option>Condo</option>
                      <option>Duplex</option>
                      <option>Triplex</option>
                      <option>Townhouse</option>
                      <option>Basement Apartment</option>
                      <option>Apartment Building</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Units <span className="text-red-500">*</span></label>
                    <input 
                      type="number" 
                      placeholder="1"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                      defaultValue="1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Rental Period */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Rental Period</h3>
                  <p className="text-slate-600">Used for partial-year proration and personal vs rental split</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Rental Start Date <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    <select className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none">
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option selected>December</option>
                    </select>
                    <select className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none">
                      <option selected>1</option>
                      <option>2</option>
                      <option>15</option>
                    </select>
                    <select className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none">
                      <option>2023</option>
                      <option selected>2024</option>
                      <option>2025</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Rental End Date <span className="text-slate-400 font-normal">(optional - leave blank if still renting)</span></label>
                  <div className="grid grid-cols-3 gap-3">
                    <select className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none">
                      <option value="">Month</option>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                    <select className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none">
                      <option value="">Day</option>
                      <option>1</option>
                      <option>15</option>
                      <option>31</option>
                    </select>
                    <select className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:outline-none">
                      <option value="">Year</option>
                      <option>2024</option>
                      <option>2025</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-purple-900">
                    <p className="font-semibold mb-1">👉 Partial-year proration</p>
                    <p className="mb-2">If you started renting mid-year (e.g., Dec 1), I'll automatically prorate all expenses to match your rental period.</p>
                    <p className="font-semibold mb-1">👉 Personal vs rental split</p>
                    <p>Only the rental period expenses are deductible on your T776.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Ownership */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Ownership</h3>
                  <p className="text-slate-600">Used for separate T776 per owner and expense allocation</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Your Ownership % <span className="text-red-500">*</span></label>
                  <input 
                    type="number" 
                    placeholder="100"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-green-500 focus:outline-none font-bold text-lg"
                    defaultValue="50"
                    min="1"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Are there co-owners? <span className="text-red-500">*</span></label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-green-200">
                      <input type="radio" name="has-coowners" className="w-4 h-4 text-green-600" />
                      <span className="text-slate-900">No, I'm the sole owner</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border-2 border-green-200 bg-green-50 rounded-lg cursor-pointer">
                      <input type="radio" name="has-coowners" className="w-4 h-4 text-green-600" checked />
                      <span className="text-slate-900 font-medium">Yes, there are co-owners</span>
                    </label>
                  </div>
                </div>

                {/* Co-Owner Details */}
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 space-y-3">
                  <p className="font-semibold text-green-900">Co-Owner #1</p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        placeholder="Sarah Johnson"
                        className="w-full px-3 py-2 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none text-sm"
                        defaultValue="Sarah Johnson"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ownership %</label>
                      <input 
                        type="number" 
                        className="w-full px-3 py-2 border-2 border-green-200 rounded-lg focus:border-green-500 focus:outline-none font-bold text-sm"
                        defaultValue="50"
                      />
                    </div>
                  </div>

                  <button className="text-sm text-green-700 hover:text-green-800 font-medium">
                    + Add another co-owner
                  </button>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-green-900">
                    <p className="font-semibold mb-1">👉 Separate T776 per owner</p>
                    <p className="mb-2">Each co-owner files their own T776 form with their ownership percentage of income and expenses.</p>
                    <p className="font-semibold mb-1">👉 Expense allocation</p>
                    <p>All expenses are automatically split based on ownership %.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Mortgage Summary */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Mortgage Summary</h3>
                  <p className="text-slate-600">Used for deductible interest totals</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Lender Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="TD Bank"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                    defaultValue="TD Bank"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Payment <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                    <input 
                      type="text" 
                      placeholder="2,500"
                      className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                      defaultValue="2,500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Statement Upload <span className="text-slate-400 font-normal">(optional)</span></label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-emerald-400 cursor-pointer transition-colors">
                    <div className="text-slate-400 mb-2">
                      <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm text-slate-600">Drop your mortgage statement here or click to browse</p>
                    <p className="text-xs text-slate-400 mt-1">PDF, JPG, or PNG</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Paid YTD <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                    <input 
                      type="text" 
                      placeholder="18,000"
                      className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-emerald-500 focus:outline-none"
                      defaultValue="18,000"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Find this on your year-end mortgage statement or add up monthly interest from statements</p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-emerald-900">
                      <p className="font-semibold mb-1">👉 Deductible interest totals</p>
                      <p>Only mortgage <span className="font-semibold">interest</span> is deductible on your T776, not the principal portion of your payment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Purchase Info */}
          {step === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Purchase Info</h3>
                  <p className="text-slate-600">Used for optional CCA schedule (for CCA baseline)</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Purchase Date <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 gap-3">
                    <select className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none">
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                      <option>April</option>
                      <option>May</option>
                      <option selected>June</option>
                      <option>July</option>
                      <option>August</option>
                      <option>September</option>
                      <option>October</option>
                      <option>November</option>
                      <option>December</option>
                    </select>
                    <select className="px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none">
                      <option>2018</option>
                      <option selected>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Purchase Price <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                    <input 
                      type="text" 
                      placeholder="500,000"
                      className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                      defaultValue="500,000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Land Value <span className="text-slate-400 font-normal">(optional for MVP)</span></label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold">$</span>
                    <input 
                      type="text" 
                      placeholder="100,000"
                      className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-indigo-500 focus:outline-none"
                      defaultValue="100,000"
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Find this on your lawyer's statement of adjustments. Only the building portion is eligible for CCA.</p>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-indigo-900">
                      <p className="font-semibold mb-1">👉 Optional CCA schedule</p>
                      <p>This information helps calculate your Capital Cost Allowance (depreciation) deduction if you choose to claim it.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Footer */}
        <div className="border-t-2 border-slate-200 p-6 flex items-center justify-between">
          <button 
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div 
                key={s}
                className={`w-2 h-2 rounded-full transition-all ${
                  s === step ? 'bg-blue-600 w-8' : s < step ? 'bg-green-600' : 'bg-slate-300'
                }`}
              ></div>
            ))}
          </div>

          {step < 5 ? (
            <button 
              onClick={() => setStep(Math.min(totalSteps, step + 1))}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl">
              <Check className="w-4 h-4" />
              Complete Setup
            </button>
          )}
        </div>
      </div>

      {/* Step Indicator (Bottom Right) */}
      <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-xl p-4 border border-slate-200">
        <p className="text-xs text-slate-500 mb-1">Current Step</p>
        <p className="text-2xl font-bold text-slate-900">{step} / {totalSteps}</p>
        <p className="text-xs text-slate-600 mt-1">
          {step === 1 && "Property Basics"}
          {step === 2 && "Rental Period"}
          {step === 3 && "Ownership"}
          {step === 4 && "Mortgage"}
          {step === 5 && "Purchase Info"}
        </p>
      </div>
    </div>
  );
}
