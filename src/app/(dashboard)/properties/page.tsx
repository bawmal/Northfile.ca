import { Plus, Building2, Edit2, Trash2, TrendingUp, Receipt, FileText, MapPin, Sparkles } from "lucide-react";

export default function PropertiesPage() {
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
              <a href="/properties" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Properties</a>
              <a href="/transactions" className="text-sm font-medium text-slate-600 hover:text-slate-900">Transactions</a>
              <a href="/receipts" className="text-sm font-medium text-slate-600 hover:text-slate-900">Receipts</a>
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
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Properties</h1>
            <p className="text-slate-500 text-lg">Manage your rental property portfolio</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Property
          </button>
        </div>

        {/* Portfolio Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Total Properties</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">5</p>
            <p className="text-sm text-green-600">All active</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Total Units</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">12</p>
            <p className="text-sm text-slate-500">Across portfolio</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">YTD Expenses</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">$42,350</p>
            <p className="text-sm text-green-600">+12% vs 2024</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Transactions</p>
            <p className="text-3xl font-bold text-slate-900 mb-1">247</p>
            <p className="text-sm text-slate-600">In 2025</p>
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Property Card 1 */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=400&fit=crop"
                alt="Property"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Active
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">123 Main Street</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>Toronto, ON M5V 2T6</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Property Type</p>
                  <p className="text-sm font-semibold text-slate-900">Duplex</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Units</p>
                  <p className="text-sm font-semibold text-slate-900">2 units</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Your Ownership</p>
                  <p className="text-sm font-semibold text-slate-900">100%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Purchase Year</p>
                  <p className="text-sm font-semibold text-slate-900">2020</p>
                </div>
              </div>

              {/* Rental Period */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-blue-900 font-semibold">Rental Period (2024)</p>
                  <span className="text-xs bg-blue-200 text-blue-900 px-2 py-0.5 rounded-full">Full Year</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-blue-700">Started</p>
                    <p className="font-semibold text-blue-900">Jan 1, 2024</p>
                  </div>
                  <div>
                    <p className="text-blue-700">Days Rented</p>
                    <p className="font-semibold text-blue-900">365 days (100%)</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 font-semibold mb-1">YTD Income</p>
                    <p className="text-xl font-bold text-green-700">$19,200</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-xs text-orange-600 font-semibold mb-1">YTD Expenses</p>
                    <p className="text-xl font-bold text-orange-700">$18,200</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-blue-600 font-semibold">Net Income</p>
                    <p className="text-lg font-bold text-blue-700">$1,000</p>
                  </div>
                </div>
                
                {/* Mortgage Information */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-slate-600 font-semibold">Mortgage</p>
                    <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">3.5% APR</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Monthly Payment</span>
                      <span className="font-semibold text-slate-900">$2,500</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2">
                      <span className="text-slate-600">• Interest (deductible)</span>
                      <span className="font-semibold text-green-700">$1,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">• Principal (not deductible)</span>
                      <span className="font-semibold text-slate-500">$1,000</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2">
                      <span className="text-slate-600">YTD Interest</span>
                      <span className="font-bold text-green-700">$18,000</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center text-xs">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                      <FileText className="w-3 h-3" />
                      <p className="font-bold">87</p>
                    </div>
                    <p className="text-slate-500">Transactions</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                      <Receipt className="w-3 h-3" />
                      <p className="font-bold">64</p>
                    </div>
                    <p className="text-slate-500">Receipts</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 border-2 border-slate-200 hover:border-slate-300 text-slate-700 py-2 rounded-lg font-semibold transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Property Card 2 */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-purple-500 to-purple-600">
              <img 
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=400&fit=crop"
                alt="Property"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Active
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">456 Oak Avenue</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>Ottawa, ON K1A 0B1</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Property Type</p>
                  <p className="text-sm font-semibold text-slate-900">Single Family</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Units</p>
                  <p className="text-sm font-semibold text-slate-900">1 unit</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Your Ownership</p>
                  <p className="text-sm font-semibold text-slate-900">50%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Purchase Year</p>
                  <p className="text-sm font-semibold text-slate-900">2019</p>
                </div>
              </div>

              {/* Co-Owner Information */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-purple-900 font-semibold">Co-Ownership</p>
                  <span className="text-xs bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full">50/50 Split</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-purple-700">You</span>
                    <span className="font-semibold text-purple-900">50%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Sarah Johnson (Common-law)</span>
                    <span className="font-semibold text-purple-900">50%</span>
                  </div>
                  <p className="text-purple-600 mt-2 italic">Filing separately - Each files own T776</p>
                </div>
              </div>

              {/* Rental Period - Partial Year */}
              <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-yellow-900 font-semibold">Rental Period (2024)</p>
                  <span className="text-xs bg-yellow-200 text-yellow-900 px-2 py-0.5 rounded-full">Partial Year</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-yellow-700">Started</p>
                    <p className="font-semibold text-yellow-900">Dec 1, 2024</p>
                  </div>
                  <div>
                    <p className="text-yellow-700">Days Rented</p>
                    <p className="font-semibold text-yellow-900">31 days (8.5%)</p>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-yellow-200">
                  <p className="text-xs text-yellow-700">Personal use: Jan 1 - Nov 30 (91.5%)</p>
                  <p className="text-xs text-yellow-700">Rental use: Dec 1 - Dec 31 (8.5%)</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 font-semibold mb-1">YTD Income</p>
                    <p className="text-xl font-bold text-green-700">$14,400</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-xs text-orange-600 font-semibold mb-1">YTD Expenses</p>
                    <p className="text-xl font-bold text-orange-700">$12,500</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-blue-600 font-semibold">Net Income</p>
                    <p className="text-lg font-bold text-blue-700">$1,900</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center text-xs">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                      <FileText className="w-3 h-3" />
                      <p className="font-bold">52</p>
                    </div>
                    <p className="text-slate-500">Transactions</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                      <Receipt className="w-3 h-3" />
                      <p className="font-bold">41</p>
                    </div>
                    <p className="text-slate-500">Receipts</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 border-2 border-slate-200 hover:border-slate-300 text-slate-700 py-2 rounded-lg font-semibold transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Property Card 3 - Basement Apartment */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 bg-gradient-to-br from-green-500 to-green-600">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=400&fit=crop"
                alt="Property"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute top-4 right-4">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Active
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">789 Maple Drive</h3>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>Mississauga, ON L5B 3Y4</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-1">Property Type</p>
                  <p className="text-sm font-semibold text-slate-900">Basement Apartment</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Units</p>
                  <p className="text-sm font-semibold text-slate-900">1 unit</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Ownership</p>
                  <p className="text-sm font-semibold text-slate-900">100%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Purchase Year</p>
                  <p className="text-sm font-semibold text-slate-900">2022</p>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 font-semibold mb-1">YTD Income</p>
                    <p className="text-xl font-bold text-green-700">$9,600</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3">
                    <p className="text-xs text-orange-600 font-semibold mb-1">YTD Expenses</p>
                    <p className="text-xl font-bold text-orange-700">$5,800</p>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-blue-600 font-semibold">Net Income</p>
                    <p className="text-lg font-bold text-blue-700">$3,800</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center text-xs">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                      <FileText className="w-3 h-3" />
                      <p className="font-bold">34</p>
                    </div>
                    <p className="text-slate-500">Transactions</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-slate-600 mb-1">
                      <Receipt className="w-3 h-3" />
                      <p className="font-bold">28</p>
                    </div>
                    <p className="text-slate-500">Receipts</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 border-2 border-slate-200 hover:border-slate-300 text-slate-700 py-2 rounded-lg font-semibold transition-colors">
                View Details
              </button>
            </div>
          </div>

          {/* Add Property Card - AI-Guided Onboarding */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 transition-colors cursor-pointer flex items-center justify-center min-h-[400px]">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Add New Property</h3>
              <p className="text-slate-600 mb-4">I'll guide you through a few quick questions to set up your T776 correctly</p>
              
              {/* Quick Preview of What We'll Ask */}
              <div className="bg-white rounded-lg p-4 mb-4 text-left">
                <p className="text-xs font-semibold text-slate-700 mb-2">What I'll ask you:</p>
                <div className="space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Property address & type</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>When you started renting it</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Your ownership percentage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span>
                    <span>Any co-owners (optional)</span>
                  </div>
                </div>
              </div>
              
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto">
                <Sparkles className="w-4 h-4" />
                Start Setup (2 min)
              </button>
              <p className="text-xs text-slate-500 mt-2">Takes about 2 minutes</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
