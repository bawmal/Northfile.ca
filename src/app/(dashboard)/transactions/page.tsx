'use client';

import { useState } from 'react';
import { Plus, Upload, Search, Filter, Download, Eye, Edit2, Trash2, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, DollarSign, FileText, Calendar, Tag, X } from 'lucide-react';
import Link from 'next/link';

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  subcategory: string;
  property: string;
  confidence?: number;
  isRecurring: boolean;
  receipt?: string;
  notes?: string;
  aiSuggested?: boolean;
  manuallyCategorized?: boolean;
}

interface CRACategory {
  id: string;
  name: string;
  description: string;
  t776Line: string;
  deductible: boolean;
}

const craCategories: CRACategory[] = [
  { id: 'rent', name: 'Rental Income', description: 'Monthly rent payments from tenants', t776Line: '1605', deductible: false },
  { id: 'utilities', name: 'Utilities', description: 'Hydro, water, gas, internet', t776Line: '8960', deductible: true },
  { id: 'insurance', name: 'Insurance', description: 'Property insurance premiums', t776Line: '8960', deductible: true },
  { id: 'repairs', name: 'Repairs & Maintenance', description: 'Repairs and routine maintenance', t776Line: '8960', deductible: true },
  { id: 'property_tax', name: 'Property Tax', description: 'Annual property taxes', t776Line: '8960', deductible: true },
  { id: 'mortgage_interest', name: 'Mortgage Interest', description: 'Interest paid on mortgage', t776Line: '8960', deductible: true },
  { id: 'advertising', name: 'Advertising', description: 'Advertising for tenants', t776Line: '8960', deductible: true },
  { id: 'professional_fees', name: 'Professional Fees', description: 'Legal, accounting, bookkeeping fees', t776Line: '8960', deductible: true },
  { id: 'supplies', name: 'Supplies', description: 'Office supplies, cleaning supplies', t776Line: '8960', deductible: true },
  { id: 'travel', name: 'Travel', description: 'Travel for property management', t776Line: '8960', deductible: true },
  { id: 'other_expenses', name: 'Other Expenses', description: 'Other deductible expenses', t776Line: '8960', deductible: true },
  { id: 'personal', name: 'Personal Expenses', description: 'Non-deductible personal expenses', t776Line: 'N/A', deductible: false },
  { id: 'capital_cost', name: 'Capital Costs', description: 'Major improvements and additions', t776Line: 'CCA Schedule', deductible: false },
];

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: '2025-01-01',
      description: 'Monthly Rent - Unit A',
      amount: 1800,
      type: 'income',
      category: 'rent',
      subcategory: 'monthly_rent',
      property: '123 Main Street',
      confidence: 95,
      isRecurring: true,
      aiSuggested: true,
      manuallyCategorized: false
    },
    {
      id: '2',
      date: '2025-01-02',
      description: 'Toronto Hydro Bill',
      amount: -145.67,
      type: 'expense',
      category: 'utilities',
      subcategory: 'hydro',
      property: '123 Main Street',
      confidence: 92,
      isRecurring: true,
      receipt: 'hydro_jan2025.pdf',
      aiSuggested: true,
      manuallyCategorized: false
    },
    {
      id: '3',
      date: '2025-01-03',
      description: 'Property Insurance - State Farm',
      amount: -89.50,
      type: 'expense',
      category: 'insurance',
      subcategory: 'property_insurance',
      property: '123 Main Street',
      confidence: 88,
      isRecurring: true,
      receipt: 'insurance_jan2025.pdf',
      aiSuggested: true,
      manuallyCategorized: false
    },
    {
      id: '4',
      date: '2025-01-05',
      description: 'Plumbing Repair - Kitchen Sink',
      amount: -275.00,
      type: 'expense',
      category: 'repairs',
      subcategory: 'plumbing',
      property: '123 Main Street',
      confidence: 76,
      isRecurring: false,
      receipt: 'plumbing_receipt.jpg',
      aiSuggested: true,
      manuallyCategorized: false
    },
    {
      id: '5',
      date: '2025-01-07',
      description: 'Monthly Rent - Unit B',
      amount: 1600,
      type: 'income',
      category: 'rent',
      subcategory: 'monthly_rent',
      property: '123 Main Street',
      confidence: 95,
      isRecurring: true,
      aiSuggested: true,
      manuallyCategorized: false
    },
    {
      id: '6',
      date: '2025-01-08',
      description: 'Mortgage Payment - RBC',
      amount: -1850.00,
      type: 'expense',
      category: 'mortgage_interest',
      subcategory: 'mortgage_payment',
      property: '123 Main Street',
      confidence: 85,
      isRecurring: true,
      aiSuggested: true,
      manuallyCategorized: false,
      notes: 'Estimated interest portion: $1,200, Principal: $650'
    },
    {
      id: '7',
      date: '2025-01-10',
      description: 'Office Supplies - Staples',
      amount: -45.32,
      type: 'expense',
      category: 'supplies',
      subcategory: 'office_supplies',
      property: '123 Main Street',
      confidence: 68,
      isRecurring: false,
      receipt: 'staples_receipt.pdf',
      aiSuggested: true,
      manuallyCategorized: false
    },
    {
      id: '8',
      date: '2025-01-12',
      description: 'Property Tax - City of Toronto',
      amount: -425.00,
      type: 'expense',
      category: 'property_tax',
      subcategory: 'annual_tax',
      property: '123 Main Street',
      confidence: 94,
      isRecurring: false,
      receipt: 'property_tax_2024.pdf',
      aiSuggested: true,
      manuallyCategorized: false
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [activeTab, setActiveTab] = useState<'all' | 'income' | 'expense'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState<string | null>(null);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<string | null>(null);
  const [viewingTransaction, setViewingTransaction] = useState<string | null>(null);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || transaction.category === selectedCategory;
    const matchesProperty = selectedProperty === 'all' || transaction.property === selectedProperty;
    const matchesYear = selectedYear === 'all' || new Date(transaction.date).getFullYear().toString() === selectedYear;
    const matchesTab = activeTab === 'all' || transaction.type === activeTab;
    return matchesSearch && matchesCategory && matchesProperty && matchesYear && matchesTab;
  });

  const handleImportCSV = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Simulate CSV import processing
      console.log('Importing CSV:', file.name);
      setShowImportModal(false);
    }
  };

  const handleCategoryChange = (transactionId: string, newCategory: string) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, category: newCategory, manuallyCategorized: true, aiSuggested: false }
        : transaction
    ));
    setShowCategoryModal(null);
  };

  const handleBulkCategoryChange = (categoryId: string) => {
    setTransactions(prev => prev.map(transaction => 
      selectedTransactions.includes(transaction.id)
        ? { ...transaction, category: categoryId, manuallyCategorized: true, aiSuggested: false }
        : transaction
    ));
    setSelectedTransactions([]);
  };

  const toggleTransactionSelection = (transactionId: string) => {
    setSelectedTransactions(prev => 
      prev.includes(transactionId) 
        ? prev.filter(id => id !== transactionId)
        : [...prev, transactionId]
    );
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-slate-400';
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (confidence?: number) => {
    if (!confidence) return 'bg-slate-100';
    if (confidence >= 90) return 'bg-green-100';
    if (confidence >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const pendingAIClassification = transactions.filter(t => 
    t.aiSuggested && !t.manuallyCategorized && t.confidence && t.confidence < 70
  ).length;

  const missingReceipts = transactions.filter(t => 
    t.type === 'expense' && !t.receipt
  ).length;

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
              <a href="/transactions" className="text-sm font-semibold text-blue-600 border-b-2 border-blue-600 pb-1">Transactions</a>
              <a href="/receipts" className="text-sm font-medium text-slate-600 hover:text-slate-900">Receipts</a>
              <a href="/mortgages" className="text-sm font-medium text-slate-600 hover:text-slate-900">Mortgages</a>
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Transactions</h1>
            <p className="text-slate-500 text-lg">Manage and categorize your rental transactions</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border-none focus:outline-none text-sm font-medium text-slate-700"
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="all">All Years</option>
              </select>
            </div>
            <button
              onClick={() => setShowImportModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Import Bank Statement
            </button>
            <button className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-green-700">Total Income</p>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-800 mb-1">{formatCurrency(totalIncome)}</p>
            <p className="text-sm text-green-600">YTD {selectedYear}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-orange-700">Total Expenses</p>
              <TrendingDown className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-800 mb-1">{formatCurrency(totalExpenses)}</p>
            <p className="text-sm text-orange-600">YTD {selectedYear}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-blue-700">Net Cash Flow</p>
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-800 mb-1">{formatCurrency(totalIncome - totalExpenses)}</p>
            <p className="text-sm text-blue-600">YTD {selectedYear}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-purple-700">Pending AI</p>
                <AlertCircle className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-purple-800">{pendingAIClassification}</p>
              <p className="text-xs text-purple-600">Need review</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-red-700">Missing Receipts</p>
                <FileText className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-red-800">{missingReceipts}</p>
              <p className="text-xs text-red-600">Upload needed</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFilters ? 'bg-blue-100 border-blue-300 text-blue-700' : 'border border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Filter className="w-4 h-4" />
                Filters
                {showFilters && <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">ON</span>}
              </button>
            </div>
            {selectedTransactions.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">{selectedTransactions.length} selected</span>
                <select
                  onChange={(e) => handleBulkCategoryChange(e.target.value)}
                  className="px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-sm"
                >
                  <option value="">Bulk categorize...</option>
                  {craCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {showFilters && (
            <div className="grid md:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Categories</option>
                  {craCategories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Property</label>
                <select
                  value={selectedProperty}
                  onChange={(e) => setSelectedProperty(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Properties</option>
                  <option value="123 Main Street">123 Main Street</option>
                  <option value="456 Elm Avenue">456 Elm Avenue</option>
                  <option value="789 Oak Road">789 Oak Road</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors">
                  <option value="ytd">Year to Date</option>
                  <option value="q1">Q1 (Jan-Mar)</option>
                  <option value="q2">Q2 (Apr-Jun)</option>
                  <option value="q3">Q3 (Jul-Sep)</option>
                  <option value="q4">Q4 (Oct-Dec)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors">
                  <option value="all">All Status</option>
                  <option value="categorized">Categorized</option>
                  <option value="uncategorized">Uncategorized</option>
                  <option value="recurring">Reurring</option>
                  <option value="nonrecurring">Non-Recurring</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-slate-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'all' 
                    ? 'text-blue-600 border-blue-600 bg-blue-50' 
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                All Transactions ({filteredTransactions.length})
              </button>
              <button
                onClick={() => setActiveTab('income')}
                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'income' 
                    ? 'text-green-600 border-green-600 bg-green-50' 
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Income ({filteredTransactions.filter(t => t.type === 'income').length})
              </button>
              <button
                onClick={() => setActiveTab('expense')}
                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === 'expense' 
                    ? 'text-orange-600 border-orange-600 bg-orange-50' 
                    : 'text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Expenses ({filteredTransactions.filter(t => t.type === 'expense').length})
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedTransactions(filteredTransactions.map(t => t.id));
                        } else {
                          setSelectedTransactions([]);
                        }
                      }}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedTransactions.includes(transaction.id)}
                        onChange={() => toggleTransactionSelection(transaction.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="date"
                        value={transaction.date}
                        onChange={(e) => {
                          setTransactions(prev => prev.map(t => 
                            t.id === transaction.id ? { ...t, date: e.target.value } : t
                          ));
                        }}
                        className="text-sm text-slate-900 border border-slate-200 rounded px-2 py-1 focus:border-blue-500 focus:outline-none"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={transaction.description}
                          onChange={(e) => {
                            setTransactions(prev => prev.map(t => 
                              t.id === transaction.id ? { ...t, description: e.target.value } : t
                            ));
                          }}
                          className="text-sm text-slate-900 font-medium border border-slate-200 rounded px-2 py-1 focus:border-blue-500 focus:outline-none"
                        />
                        {transaction.receipt && (
                          <FileText className="w-4 h-4 text-blue-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{transaction.property}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setShowCategoryModal(transaction.id)}
                          className="flex items-center gap-2 text-sm px-2 py-1 rounded-lg border transition-colors hover:border-blue-300"
                          style={{
                            borderColor: transaction.manuallyCategorized ? '#3b82f6' : '#d1d5db',
                            backgroundColor: transaction.manuallyCategorized ? '#dbeafe' : 'transparent'
                          }}
                        >
                          <Tag className="w-3 h-3" />
                          {craCategories.find(c => c.id === transaction.category)?.name || transaction.category}
                          {transaction.aiSuggested && !transaction.manuallyCategorized && (
                            <span className={`text-xs px-1 py-0.5 rounded ${getConfidenceBg(transaction.confidence)} ${getConfidenceColor(transaction.confidence)}`}>
                              AI {transaction.confidence}%
                            </span>
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={Math.abs(transaction.amount)}
                        onChange={(e) => {
                          const newAmount = parseFloat(e.target.value) || 0;
                          setTransactions(prev => prev.map(t => 
                            t.id === transaction.id ? { ...t, amount: transaction.type === 'income' ? newAmount : -newAmount } : t
                          ));
                        }}
                        className={`text-sm font-semibold border border-slate-200 rounded px-2 py-1 focus:border-blue-500 focus:outline-none ${
                          transaction.type === 'income' ? 'text-green-700' : 'text-red-700'
                        }`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {transaction.isRecurring && (
                          <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            Recurring
                          </span>
                        )}
                        {transaction.aiSuggested && !transaction.manuallyCategorized && (
                          <span className="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3" />
                            AI Categorized
                          </span>
                        )}
                        {transaction.manuallyCategorized && (
                          <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewingTransaction(transaction.id)}
                          className="p-1 hover:bg-slate-100 rounded transition-colors"
                        >
                          <Eye className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => setEditingTransaction(transaction.id)}
                          className="p-1 hover:bg-slate-100 rounded transition-colors"
                        >
                          <Edit2 className="w-4 h-4 text-slate-600" />
                        </button>
                        <button
                          onClick={() => {
                            setTransactions(prev => prev.filter(t => t.id !== transaction.id));
                          }}
                          className="p-1 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Selection Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Select Category</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {craCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(showCategoryModal, category.id)}
                    className="text-left p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{category.name}</h4>
                        <p className="text-sm text-slate-600">{category.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            T776: {category.t776Line}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            category.deductible 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {category.deductible ? 'Deductible' : 'Non-Deductible'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowCategoryModal(null)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CSV Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md mx-4">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Import Bank Statement</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Select Bank Statement File</label>
                  <input
                    type="file"
                    accept=".csv,.pdf,.ofx,.qfx"
                    onChange={handleImportCSV}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
                <div className="text-sm text-slate-600">
                  <p className="font-medium mb-2">Supported Formats:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>CSV files (comma-separated values)</li>
                    <li>PDF bank statements</li>
                    <li>OFX files (Open Financial Exchange)</li>
                    <li>QFX files (Quicken Financial Exchange)</li>
                  </ul>
                  <p className="font-medium mt-3 mb-2">CSV Format Requirements:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Date (YYYY-MM-DD format)</li>
                    <li>Description</li>
                    <li>Amount (positive for income, negative for expenses)</li>
                    <li>Category (optional)</li>
                    <li>Property (optional)</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
